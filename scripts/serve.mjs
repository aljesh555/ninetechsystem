/**
 * Local stand-in for Cloudflare Pages, used for screenshots and Lighthouse.
 * Mimics the three behaviours that matter: clean URLs served from *.html,
 * a 308 from the trailing-slash form, and the rules in dist/_headers.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, sep } from 'node:path';

const DIST = 'dist';
const PORT = Number(process.argv[2] || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

// Parse dist/_headers into [pattern, {header: value}] pairs.
const raw = await readFile(join(DIST, '_headers'), 'utf8');
const rules = [];
for (const line of raw.split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  if (!line.startsWith(' ')) rules.push([line.trim(), {}]);
  else if (rules.length) {
    const i = line.indexOf(':');
    rules.at(-1)[1][line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
}
const headersFor = (path) => {
  const out = {};
  for (const [pattern, hs] of rules) {
    const re = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
    if (re.test(path)) Object.assign(out, hs);
  }
  return out;
};

const exists = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

// The contact Function, so the form can be tested end to end locally.
// SERVE_RESEND_KEY unset means the handler returns its "not configured" error,
// which is the right thing to see until the key is set in Cloudflare.
const { onRequestPost, onRequestGet } = await import('../functions/api/contact.js');

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let path;
  try { path = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }

  if (path === '/api/contact') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(`http://127.0.0.1:${PORT}${path}`, {
      method: req.method,
      headers: req.headers,
      body: chunks.length ? Buffer.concat(chunks) : undefined,
    });
    const env = { RESEND_API_KEY: process.env.SERVE_RESEND_KEY };
    // Pretend the mail provider accepted it, so the browser path can be tested.
    const realFetch = globalThis.fetch;
    globalThis.fetch = async (u, i) =>
      String(u).includes('api.resend.com')
        ? new Response('{"id":"local"}', { status: 200 })
        : realFetch(u, i);
    const out = req.method === 'POST'
      ? await onRequestPost({ request, env })
      : await onRequestGet({ request });
    globalThis.fetch = realFetch;
    res.writeHead(out.status, Object.fromEntries(out.headers));
    return res.end(Buffer.from(await out.arrayBuffer()));
  }

  if (path.length > 1 && path.endsWith('/')) {
    res.writeHead(308, { Location: path.slice(0, -1) + url.search });
    return res.end();
  }

  const candidates = path === '/'
    ? ['index.html']
    : [path.slice(1), path.slice(1) + '.html', join(path.slice(1), 'index.html')];

  const root = resolve(DIST) + sep;
  for (const c of candidates) {
    const file = join(DIST, c);
    if (!resolve(file).startsWith(root)) break; // no ../ out of dist/
    if (!(await exists(file))) continue;
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
      ...headersFor(path),
    });
    return res.end(body);
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!doctype html><title>Not found</title><h1>404</h1>');
}).listen(PORT, '127.0.0.1', () => console.log(`serving ${DIST} on http://127.0.0.1:${PORT}`));
