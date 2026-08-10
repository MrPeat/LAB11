import * as TodoModel from './todos';
import { NotFoundError, ValidationError } from './errors';

export function createTodo(data: { title?: string }) {
  if (!data.title || data.title.trim() === '') {
    throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
  }
  return TodoModel.addTodo({ title: data.title });
}

export function listTodos() {
  return TodoModel.getTodos();
}

export function getTodoById(id: string) {
  const todo = TodoModel.getTodos().find((t) => t.id === id) || null;
  if (!todo) {
    throw new NotFoundError('ไม่พบ Todo นี้');
  }
  return todo;
}

export function editTodo(id: string, updates: Partial<{ title: string; completed: boolean }>) {
  if (updates.title !== undefined && updates.title.trim() === '') {
    throw new ValidationError('หัวข้อ Todo ห้ามเป็นค่าว่าง');
  }
  return TodoModel.updateTodo(id, updates);
}

export function removeTodo(id: string) {
  return TodoModel.deleteTodo(id);
}
