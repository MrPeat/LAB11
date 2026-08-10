import { getTodoById, editTodo, removeTodo } from '@/lib/todoService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const todo = getTodoById(params.id);
  return Response.json({ todo });
});

export const PATCH = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const updates = await request.json();
  const updated = editTodo(params.id, updates);
  if (!updated) {
    return Response.json({ error: 'ไม่พบ Todo นี้' }, { status: 404 });
  }
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const deleted = removeTodo(params.id);
  if (!deleted) {
    return Response.json({ error: 'ไม่พบ Todo นี้' }, { status: 404 });
  }
  return Response.json({ ok: true });
});
