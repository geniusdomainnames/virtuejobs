import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import generateSitemapToFile from '../src/lib/sitemap.js'

// Simple wrapper so the existing script keeps working but uses the shared generator
(async () => {
  try {
    const result = await generateSitemapToFile();
    if (result.success) {
      console.log(`✅ Sitemap generated at ${result.path} (${result.count} routes)`);
    } else {
      console.error('❌ Failed to generate sitemap:', result.error);
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('❌ Failed to generate sitemap:', err && err.message ? err.message : err);
    process.exitCode = 1;
  }
})();
