import { getMessageById, editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

function getSessionUserId(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/session=([^;]+)/);
  return match ? match[1] : '';
}

export const GET = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const message = await getMessageById(params.id);
  return Response.json({ message });
});

export const PATCH = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const sessionUserId = getSessionUserId(request);
  const updates = await request.json();
  const updated = await editMessage(params.id, updates, sessionUserId);
  if (!updated) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const sessionUserId = getSessionUserId(request);
  const deleted = await removeMessage(params.id, sessionUserId);
  if (!deleted) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ ok: true });
});
