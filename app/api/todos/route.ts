import { createTodo, listTodos } from '@/lib/todoService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  
  const all = await listTodos();
  const filtered = search
    ? all.filter((t) => t.title.includes(search))
    : all;
    
  return Response.json({ todos: filtered });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const saved = await createTodo(body);
  return Response.json({ ok: true, item: saved }, { status: 201 });
});
