import { site } from '../data/site.js';
import { getPosts } from '../lib/blog.js';

/** A feed of the guides, for readers and for crawlers that prefer one. */
export async function GET() {
  const posts = await getPosts();
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${site.url}/blog/${p.id}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.id}</guid>
      <description>${esc(p.data.description)}</description>
      <category>${esc(p.data.category)}</category>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — guides</title>
    <link>${site.url}/blog</link>
    <description>Practical answers to the questions businesses in Nepal ask before they commission software.</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
