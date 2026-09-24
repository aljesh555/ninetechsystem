import { site, nav } from '../data/site.js';

/**
 * Five pages, one URL form. No <lastmod>: stamping every page with the build
 * date on every build teaches Google to ignore the field. <priority> and
 * <changefreq> are left out too; Google ignores both.
 */
export async function GET() {
  const urls = nav
    .map((page) => `  <url>\n    <loc>${site.url}${page.href === '/' ? '' : page.href}</loc>\n  </url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
