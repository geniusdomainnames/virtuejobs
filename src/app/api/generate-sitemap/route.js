import { generateSitemapToFile, notifyGoogle } from '@/lib/sitemap';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Optional API key protection: set SITEMAP_API_KEY in env and pass via header 'x-sitemap-key'
    const providedKey = request.headers.get('x-sitemap-key');
    if (process.env.SITEMAP_API_KEY && providedKey !== process.env.SITEMAP_API_KEY) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const result = await generateSitemapToFile();
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    // Optionally notify Google asynchronously (non-blocking) for main sitemap
    // If an index exists, notify for the index; otherwise notify the single sitemap.
    const primaryPath = result.files && result.files.length > 0 ? result.files[0].path : '/sitemap.xml';
    notifyGoogle(process.env.SITE_DOMAIN || undefined, primaryPath).catch(() => {});

    return NextResponse.json({ success: true, files: result.files, count: result.count });
  } catch (err) {
    return NextResponse.json({ success: false, error: err && err.message ? err.message : String(err) }, { status: 500 });
  }
}

export async function GET(request) {
  // For safety, accept GET only when a valid key is provided
  const providedKey = request.headers.get('x-sitemap-key');
  if (process.env.SITEMAP_API_KEY && providedKey !== process.env.SITEMAP_API_KEY) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return POST(request);
}
