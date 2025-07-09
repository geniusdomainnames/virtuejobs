// next-sitemap.config.js

import { getAllBlogPostSlugs } from "./src/lib/getAllBlogPostSlugs"


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.DOMAIN_NAME}`, // your production domain
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // 👇 Manually add dynamic routes
  additionalPaths: async (config) => {
    // Replace this with actual data fetch from DB, API, or filesystem
    const posts = await getAllBlogPostSlugs()
    return posts.map((post) => ({
      loc: `/blog/post/${post.slug}`,
      lastmod: post?.updatedAt || new Date().toISOString(),
    }));
  }
};
