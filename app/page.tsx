// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

        {/* รูปภาพ (สามารถนำภาพตัวเองมาใส่ในโฟลเดอร์ public/profile.jpg ได้) */}
        <div className="md:w-1/3 bg-blue-100 flex items-center justify-center p-8">
          <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-md">
            {/* ใส่ tag <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" /> แทนที่ div นี้ได้เลยครับ */}
            <span className="text-gray-500 text-sm flex h-full items-center justify-center">
              <img src="/profile1.jpg" alt="Profile" className="w-full h-full object-center object-cover" />
            </span>
          </div>
        </div>

        {/* ข้อมูลส่วนตัว */}
        <div className="md:w-2/3 p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">นาย ภานุวัฒน์ ขันทกะพันธ์</h1>
          <p className="text-gray-600 mb-6 font-medium">รหัสนิสิต: 6720210048 | นิสิตวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ</p>

          <div className="space-y-3 text-gray-700">
            <p>🎯 <strong>เป้าหมายในชีวิต:</strong> มีเงินที่พอจะใช้ไปทั้งชีวิตและก็เลิกทำงานมาเดินขายหมูปิ้งหน้าโรงเรียนเหนื่อยก็หยุดพักขี้เกียจก็กลับบ้านเลยและไปเที่ยวต่อ</p>
            <p>💡 <strong>ความสนใจ:</strong> Full-stack Web Development และระบบวิเคราะห์เสียง/ใบหน้า</p>
            <p>🎮 <strong>งานอดิเรก:</strong> เล่ยเกม Minecraft นอนเปื่อยๆ และก็มีความสุขมากๆ</p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              ดูรายวิชาของฉัน
            </Link>
            <Link href="/blog-spa" className="px-6 py-3 bg-gray-100 text-blue-600 rounded-lg hover:bg-gray-200 transition-colors font-medium">
             อ่านBlog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}