import { prisma } from './prisma';

export async function addTodo(data: { title: string }) {
  return prisma.todo.create({ data: { title: data.title } });
}

export async function getTodos() {
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getTodoById(id: string) {
  return prisma.todo.findUnique({ where: { id } });
}

export async function updateTodo(id: string, updates: { title?: string; completed?: boolean }) {
  return prisma.todo.update({ where: { id }, data: updates });
}

export async function deleteTodo(id: string) {
  return prisma.todo.delete({ where: { id } });
}
