import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
  try {
    // Fetch resume IDs from the PostgreSQL database
    const { rows: ids } = await sql`SELECT id FROM resumes`;

    // Define static pages
    const staticPages = [
      { loc: 'https://resu-build.vercel.app/', priority: '1.0' },
      { loc: 'https://resu-build.vercel.app/my-resumes', priority: '0.8' },
    ];

    // Generate dynamic pages based on resume IDs
    const dynamicPages = ids.flatMap(({ id }) => [
      { loc: `https://resu-build.vercel.app/form/${id}`, priority: '0.6' },
      { loc: `https://resu-build.vercel.app/resume/${id}`, priority: '0.6' },
    ]);

    // Combine static and dynamic pages
    const urls = [...staticPages, ...dynamicPages];

    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>
    `;

    // Write the sitemap to the public directory
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap.trim());
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

export default generateSitemap;
