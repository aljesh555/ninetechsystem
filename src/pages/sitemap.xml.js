import { site, nav } from '../data/site.js';

/** Five pages, one URL form, lastmod from the build. */
export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const priority = { '/': '1.0', '/services': '0.9', '/contact': '0.8', '/about': '0.7', '/work': '0.6' };

  const urls = nav
    .map(
      (page) => `  <url>
    <loc>${site.url}${page.href === '/' ? '' : page.href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority[page.href]}</priority>
  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
