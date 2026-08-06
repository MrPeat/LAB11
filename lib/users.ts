export interface User { id: string; email: string; password: string; }

// จำลองฐานข้อมูลผู้ใช้ (Mock data)
const users: User[] = [
  { id: '1', email: 'admin@tsu.ac.th', password: '1234' }
];

export async function findUserByEmail(email: string) {
  return users.find((u) => u.email === email) || null;
}