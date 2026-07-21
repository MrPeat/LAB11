// app/posts/loading.tsx
export default function Loading() {
  return (
    <main className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
      {/* กล่องหัวข้อกระพริบ */}
      <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-8" />
      
      {/* กล่องการ์ดจำลอง 6 กล่อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse h-64 flex flex-col">
            <div className="h-6 w-20 bg-gray-200 rounded mb-4" />
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-3" />
            <div className="space-y-2 flex-grow">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}