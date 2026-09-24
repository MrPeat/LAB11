import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashed = await bcrypt.hash('1234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@tsu.ac.th' },
    update: {},
    create: { email: 'admin@tsu.ac.th', password: hashed },
  });

  await prisma.message.createMany({
    data: [
      { name: 'Alice', email: 'a@tsu.ac.th', message: 'สวัสดี' },
      { name: 'Bob', email: 'b@tsu.ac.th', message: 'Hello' },
    ],
    skipDuplicates: true,
  });

  await prisma.todo.createMany({
    data: [
      { title: 'Learn Prisma', completed: true },
      { title: 'Build API', completed: false },
    ],
  });

  console.log('Seed completed!');
}

main().catch(console.error);
