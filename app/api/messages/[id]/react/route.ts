import { reactToMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const POST = withErrorHandling(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const updated = await reactToMessage(params.id);
  if (!updated) {
    return Response.json({ error: 'ไม่พบข้อความนี้' }, { status: 404 });
  }
  return Response.json({ ok: true, item: updated });
});
