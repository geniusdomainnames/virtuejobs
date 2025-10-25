import fs from 'fs';
import path from 'path';
import https from 'https';
import { DatabaseFunctions } from '../database/databaseFunctions.js';
import db from '../database/db.js';

const DEFAULT_DOMAIN =  'virtuejobs.com';
const MAX_URLS_PER_SITEMAP = 45000; // keep a buffer under 50k

function buildUrlEntry(domain, { loc, lastmod }) {
  return `  <url>\n    <loc>https://${domain}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}

function sitemapXml(domain, routes) {
  const urls = routes.map((r) => buildUrlEntry(domain, r)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

function sitemapIndexXml(domain, entries) {
  const items = entries
    .map((e) => `  <sitemap>\n    <loc>https://${domain}${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`) // e.loc should start with '/'
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}

export async function generateSitemapToFile(options = {}) {
  const domain = options.domain || DEFAULT_DOMAIN;
  const publicDir = path.join(process.cwd(), 'public');
  try {
    // ensure public dir exists
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    let posts = [];
    let jobs = [];
    try {
      posts = (await DatabaseFunctions.getAllBlogSlugs()) || [];
    } catch (err) {
      console.error('Warning: could not fetch blog slugs for sitemap:', err && err.message ? err.message : err);
      posts = [];
    }

    try {
   
        const table ="virtuejobs_jobs";
        const q = `SELECT job_slog, created_at, job_post_date FROM ${table} ORDER BY job_id DESC;`;
        const res = await db.query(q);
        jobs = res.rows || [];
      
    } catch (err) {
      console.error('Warning: could not fetch jobs for sitemap:', err && err.message ? err.message : err);
      jobs = [];
    }

    const blogRoutes = posts.map((post) => ({
      loc: `/blog/post/${post.slug}`,
      lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    }));

    const jobRoutes = jobs
      .map((job) => {
        const slug = job.job_slog || job.slug || job.slog || job.job_slug || job.post_slug;
        const lastmod = job.updated_at || job.job_post_date || job.post_date || job.updatedAt || null;
        return {
          loc: `/jobs/${slug}`,
          lastmod: lastmod ? new Date(lastmod).toISOString() : new Date().toISOString(),
        };
      })
      .filter((r) => r.loc && !r.loc.endsWith('/undefined'));

    const staticRoutes = [
      { loc: '/', lastmod: new Date().toISOString() },
      { loc: '/about', lastmod: new Date().toISOString() },
      { loc: '/contact', lastmod: new Date().toISOString() },
    ];

    const allRoutes = [...staticRoutes, ...blogRoutes, ...jobRoutes];

    // If small enough, write single sitemap.xml
    if (allRoutes.length <= MAX_URLS_PER_SITEMAP) {
      const xml = sitemapXml(domain, allRoutes);
      const sitemapPath = path.join(publicDir, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, xml, 'utf8');
      return { success: true, files: [{ path: '/sitemap.xml', count: allRoutes.length }], count: allRoutes.length };
    }

    // Otherwise split into multiple sitemap files and write an index
    const chunks = [];
    for (let i = 0; i < allRoutes.length; i += MAX_URLS_PER_SITEMAP) {
      chunks.push(allRoutes.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    const files = [];
    for (let i = 0; i < chunks.length; i++) {
      const name = `/sitemap-${i + 1}.xml`;
      const xml = sitemapXml(domain, chunks[i]);
      const filePath = path.join(publicDir, `sitemap-${i + 1}.xml`);
      fs.writeFileSync(filePath, xml, 'utf8');
      files.push({ path: name, count: chunks[i].length });
    }

    // write sitemap index
    const indexEntries = files.map((f) => ({ loc: f.path, lastmod: new Date().toISOString() }));
    const indexXml = sitemapIndexXml(domain, indexEntries);
    const indexPath = path.join(publicDir, 'sitemap-index.xml');
    fs.writeFileSync(indexPath, indexXml, 'utf8');

    return { success: true, files: files.concat([{ path: '/sitemap-index.xml' }]), count: allRoutes.length };
  } catch (err) {
    return { success: false, error: (err && err.message) || String(err) };
  }
}

export function notifyGoogle(domain = DEFAULT_DOMAIN, sitemapPath = '/sitemap.xml') {
  const sitemapUrl = encodeURIComponent(`https://${domain}${sitemapPath}`);
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
