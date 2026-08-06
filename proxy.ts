import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // ดึง Cookie ที่ชื่อ 'session' (ที่เราสร้างไว้ตอนล็อกอินผ่าน) ออกมาเช็ค
  const session = request.cookies.get('session');

  // ถ้าไม่มี session (ยังไม่ได้ล็อกอิน) และกำลังพยายามเข้าหน้าใน /dashboard
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    // ให้ Redirect เด้งกลับไปหน้า /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้าล็อกอินแล้ว หรือเข้าหน้าปกติ ก็ปล่อยผ่านให้ทำงานต่อ
  return NextResponse.next();
}

// ตั้งค่าให้ Middleware ตัวนี้ทำงานเฉพาะตอนที่เข้า path /dashboard หรือ path ย่อยของมัน
export const config = {
  matcher: ['/dashboard/:path*'],
};