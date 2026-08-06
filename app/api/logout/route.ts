import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  
  // สั่งเคลียร์ Cookie โดยตั้งค่า Max-Age ให้เป็น 0 (หมดอายุทันที)
  res.cookies.set('session', '', { maxAge: 0, path: '/' });
  
  return res;
}