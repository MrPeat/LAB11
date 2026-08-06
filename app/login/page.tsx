'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // ส่งข้อมูลไปที่ API ที่เราสร้างไว้ใน Task 3.2
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // ถ้ารหัสผ่านถูก ให้เปลี่ยนหน้าไปที่ Dashboard
      router.push('/dashboard');
    } else {
      // ถ้าผิด ให้อ่านข้อความ Error จาก API มาแสดง
      const data = await res.json();
      setError(data.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  }

  return (
    <main className="p-8 flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">เข้าสู่ระบบ</h1>
        
        <div>
          <label className="block text-sm font-medium mb-1">อีเมล</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded text-black" 
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded text-black" 
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          เข้าสู่ระบบ
        </button>
      </form>
    </main>
  );
}