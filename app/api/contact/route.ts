import { messages } from '@/lib/messages'; // เช็คว่า import ถูกที่ไหม

export async function GET() {
  return Response.json({ messages });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    messages.push(data); // เอาข้อมูลใหม่ต่อท้ายเข้าไปใน Array
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}