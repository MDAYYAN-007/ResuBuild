const fs = require('fs');
const path = require('path');

// Example function to fetch IDs (replace with actual data source)
async function fetchIds() {
    // Simulated IDs; replace with actual fetching logic
    return { formIds: [1, 2, 3], resumeIds: [1, 2, 3] };
}

async function generateSitemap() {
    const ids = await fetchIds();
    const staticPages = [
        { loc: 'https://resu-build.vercel.app/', priority: '1.0' },
        { loc: 'https://resu-build.vercel.app/my-resumes', priority: '0.8' },
    ];
    const dynamicPages = [
        ...ids.formIds.map(id => ({ loc: `https://resu-build.vercel.app/form/${id}`, priority: '0.6' })),
        ...ids.resumeIds.map(id => ({ loc: `https://resu-build.vercel.app/resume/${id}`, priority: '0.6' })),
    ];

    const urls = [...staticPages, ...dynamicPages];

    const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>
  `;

    fs.writeFileSync(path.join(__dirname, '../public', 'sitemap.xml'), sitemap.trim());
}

generateSitemap().catch(console.error);
