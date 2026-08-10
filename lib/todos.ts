export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const todos: Todo[] = [];

export function addTodo(data: Omit<Todo, 'id' | 'createdAt' | 'completed'>) {
  const item: Todo = {
    id: crypto.randomUUID(),
    title: data.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(item);
  return item;
}

export function getTodos() {
  return todos;
}

export function updateTodo(id: string, updates: Partial<Todo>) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
}

export function deleteTodo(id: string) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}
