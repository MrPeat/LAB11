import { prisma } from '../lib/prisma';

async function main() {
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
