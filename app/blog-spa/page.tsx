'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ExternalItem } from '../../lib/external';

export default function BlogSpaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. ดึงค่าจาก URL มาเป็นค่าเริ่มต้น (ตอบโจทย์ W.3)
  const initialSource = searchParams.get('source') === 'news' ? 'news' : 'products';
  const initialSearch = searchParams.get('q') || '';
  const initialSelectedId = searchParams.get('id') || null;

  // 2. สร้าง State สำหรับเก็บข้อมูลต่างๆ
  const [source, setSource] = useState<'products' | 'news'>(initialSource);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);
  
  const [items, setItems] = useState<ExternalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch ข้อมูลเมื่อ source เปลี่ยน (ตอบโจทย์ W.4)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => r.json())
      .then((data: { external: ExternalItem[], error?: string }) => {
        if (data.error) {
          setError(data.error);
          setItems([]);
        } else if (data.external && data.external.length > 0) {
          setItems(data.external);
        } else {
          setError('ไม่พบข้อมูลในหมวดหมู่นี้');
          setItems([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
        setIsLoading(false);
      });
  }, [source]);

  // 4. อัปเดต URL อัตโนมัติเมื่อ State เปลี่ยน (ตอบโจทย์ W.3)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('source', source);
    if (searchQuery) params.set('q', searchQuery);
    if (selectedId) params.set('id', selectedId);
    
    router.replace(`/blog-spa?${params.toString()}`);
  }, [source, searchQuery, selectedId, router]);

  // 5. กรองข้อมูลตามคำค้นหาแบบ Real-time (ตอบโจทย์ W.1)
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 6. หารายการที่ถูกคลิกเพื่อนำไปโชว์ใน Modal (ตอบโจทย์ W.2)
  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <main className="p-8 relative min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Blog Aggregator (SPA)</h1>
      
      {/* ส่วนปุ่มกด Tabs และ ช่องค้นหา */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="space-x-4 flex-shrink-0">
          <button 
            onClick={() => { setSource('products'); setSelectedId(null); }}
            className={`px-4 py-2 rounded font-semibold ${source === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Products
          </button>
          <button 
            onClick={() => { setSource('news'); setSelectedId(null); }}
            className={`px-4 py-2 rounded font-semibold ${source === 'news' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            News
          </button>
        </div>
        
        {/* ช่อง Search */}
        <input 
          type="text"
          placeholder="พิมพ์เพื่อค้นหา..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ส่วนแสดงผลหลัก */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse text-lg">กำลังโหลดข้อมูล...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
          ไม่พบข้อมูลที่ตรงกับ "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedId(item.id)}
              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
            >
              {item.image && (
                <div className="w-full h-32 flex items-center justify-center mb-4 bg-gray-50 rounded">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <h2 className="font-bold text-blue-800 line-clamp-2">{item.title}</h2>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal View (แสดงผลเมื่อมีการคลิกการ์ด) */}
      {selectedItem && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedItem.title}</h2>
            
            {selectedItem.image && (
              <div className="w-full h-48 flex items-center justify-center mb-4 bg-gray-50 rounded p-2">
                <img src={selectedItem.image} alt={selectedItem.title} className="max-w-full max-h-full object-contain" />
              </div>
            )}
            
            <p className="text-gray-700 mb-8">{selectedItem.subtitle}</p>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedId(null)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}