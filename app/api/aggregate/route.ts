// app/api/aggregate/route.ts
import { fetchExternal } from '../../../lib/external';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const source = url.searchParams.get('source') === 'news' ? 'news' : 'products';

  try {
    const external = await fetchExternal(source);
    return Response.json({ source, external });
  } catch {
    // จัดการกรณี API ภายนอกล่ม
    return Response.json(
      { source, external: [], error: 'External API unavailable' },
      { status: 200 }
    );
  }
}