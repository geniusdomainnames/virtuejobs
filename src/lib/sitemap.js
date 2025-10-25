import fs from 'fs';
import path from 'path';
import https from 'https';
import { DatabaseFunctions } from '@/database/databaseFunctions';

const DEFAULT_DOMAIN = process.env.SITE_DOMAIN || 'virtuejobs.com';

export function generateSitemapXml(domain, routes) {
  const urls = routes
    .map(({ loc, lastmod }) => `\n    <url>\n      <loc>https://${domain}${loc}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>0.8</priority>\n    </url>\n  `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>`;
}

export async function generateSitemapToFile(options = {}) {
  const domain = options.domain || DEFAULT_DOMAIN;
  try {
    const posts = await DatabaseFunctions.getAllBlogSlugs();

    const blogRoutes = (posts || []).map((post) => ({
      loc: `/blog/post/${post.slug}`,
      lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    }));

    const staticRoutes = [
      { loc: '/', lastmod: new Date().toISOString() },
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() },
    ];

    const allRoutes = [...staticRoutes, ...blogRoutes];
    const sitemapXml = generateSitemapXml(domain, allRoutes);

    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

    return { success: true, path: sitemapPath, count: allRoutes.length };
  } catch (err) {
    return { success: false, error: (err && err.message) || String(err) };
  }
}

export function notifyGoogle(domain = DEFAULT_DOMAIN) {
  const sitemapUrl = encodeURIComponent(`https://${domain}/sitemap.xml`);
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;

  return new Promise((resolve) => {
    https
      .get(pingUrl, (res) => {
        resolve({ statusCode: res.statusCode });
      })
      .on('error', (err) => {
        resolve({ error: err.message });
      });
  });
}

export default generateSitemapToFile;
