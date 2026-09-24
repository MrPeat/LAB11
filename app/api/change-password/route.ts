import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { changePasswordSchema } from '@/lib/schemas';
import { ZodError } from 'zod';

function getSessionUserId(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/session=([^;]+)/);
  return match ? match[1] : '';
}

export async function POST(request: Request) {
  try {
    const sessionUserId = getSessionUserId(request);
    if (!sessionUserId) {
      return Response.json({ error: 'คุณยังไม่ได้เข้าสู่ระบบ' }, { status: 401 });
    }

    const body = await request.json();
    const { oldPassword, newPassword } = changePasswordSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
    if (!user) {
      return Response.json({ error: 'ไม่พบผู้ใช้งานในระบบ' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return Response.json({ error: 'รหัสผ่านเดิมไม่ถูกต้อง' }, { status: 403 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: sessionUserId },
      data: { password: hashedNewPassword },
    });

    return Response.json({ ok: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' });

  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json({ error: err.issues[0].message }, { status: 400 });
    }
    return Response.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
  }
}
