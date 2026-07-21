// app/posts/error.tsx
'use client'; // หน้า Error ต้องเป็น Client Component เสมอ

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className="p-12 min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <div className="p-10 bg-white rounded-3xl shadow-xl border border-red-100 max-w-md w-full">
        <p className="text-6xl mb-6">🔌</p>
        <h2 className="text-2xl font-bold text-red-600 mb-3">เกิดข้อผิดพลาด!</h2>
        <p className="text-gray-500 mb-8">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors w-full"
        >
          ลองโหลดใหม่อีกครั้ง
        </button>
      </div>
    </main>
  );
}