import fs from 'node:fs';

const routes = ['/', '/explore', '/model/sora', '/model/veo', '/category/art', '/category/marketing'];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>https://copyprompts.ai${r}</loc></url>`).join('\n')}
</urlset>`;

fs.mkdirSync('apps/web/public', { recursive: true });
fs.writeFileSync('apps/web/public/sitemap.xml', xml);
