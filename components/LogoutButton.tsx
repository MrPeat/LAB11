'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    // เรียกใช้ API เพื่อเคลียร์ Cookie
    await fetch('/api/logout', { method: 'POST' });
    // เด้งผู้ใช้กลับไปหน้า Login
    router.push('/login');
  }

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors"
    >
      ออกจากระบบ
    </button>
  );
}