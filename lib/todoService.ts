import * as TodoModel from './todos';
import { NotFoundError, ValidationError } from './errors';
import { Prisma } from '@prisma/client';

export async function createTodo(data: { title?: string }) {
  if (!data.title || data.title.trim() === '') {
    throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
  }
  return await TodoModel.addTodo({ title: data.title });
}

export async function listTodos() {
  return await TodoModel.getTodos();
}

export async function getTodoById(id: string) {
  const todo = await TodoModel.getTodoById(id);
  if (!todo) {
    throw new NotFoundError('ไม่พบ Todo นี้');
  }
  return todo;
}

export async function editTodo(id: string, updates: Partial<{ title: string; completed: boolean }>) {
  if (updates.title !== undefined && updates.title.trim() === '') {
    throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
  }
  try {
    return await TodoModel.updateTodo(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function removeTodo(id: string) {
  try {
    await TodoModel.deleteTodo(id);
    return true;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return false;
    }
    throw err;
  }
}
