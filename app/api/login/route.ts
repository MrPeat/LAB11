import { findUserByEmail } from '@/lib/users';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await findUserByEmail(email);
  
  // ตรวจสอบว่ามีผู้ใช้นี้ไหม และรหัสผ่านตรงหรือเปล่า
  if (!user || user.password !== password) {
    return Response.json({ error: 'อีเมล/รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }
  
  const res = Response.json({ ok: true });
  // สร้าง Session Cookie เพื่อยืนยันว่าผู้ใช้คนนี้ล็อกอินแล้ว
  res.headers.set('Set-Cookie', `session=${user.id}; Path=/; HttpOnly`);
  return res;
}