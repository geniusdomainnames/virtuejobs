import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { DatabaseFunctions } from '../src/database/databaseFunctions.js'

// Required because __dirname is not available in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const domainname = "virtuejobs.com"

function generateSitemapXml(routes) {
  const urls = routes
    .map(({ loc, lastmod }) => `
    <url>
      <loc>https://${domainname}${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
}



async function notifyGoogle() {
  const sitemapUrl = encodeURIComponent(`https://${domainname}/sitemap.xml`);
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;

  https
    .get(pingUrl, (res) => {
      console.log(`📣 Google ping response: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log('✅ Successfully notified Google.');
      } else {
        console.warn('⚠️ Google notification might have failed.');
      }
    })
    .on('error', (err) => {
      console.error('❌ Error notifying Google:', err.message);
    });
}

(async () => {
  try {
    const posts = await DatabaseFunctions.getAllBlogSlugs();

    const blogRoutes = posts.map((post) => ({
      loc: `/blog/post/${post.slug}`,
      lastmod: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    const staticRoutes = [
      { loc: '/', lastmod: new Date().toISOString() },
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() },
    ];

    const allRoutes = [...staticRoutes, ...blogRoutes];
    const sitemapXml = generateSitemapXml(allRoutes);

    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml);
    console.log('✅ Sitemap generated at public/sitemap.xml');

    //await notifyGoogle(); // uncomment if needed
  } catch (err) {
    console.error('❌ Failed to generate sitemap:', err.message);
  }
})();
