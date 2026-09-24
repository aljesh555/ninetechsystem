/**
 * Exercises functions/api/contact.js without sending real email.
 * Run: node scripts/test-contact.mjs
 */
import { onRequestPost, onRequestGet } from '../functions/api/contact.js';

let sent = null;
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).includes('api.resend.com')) {
    sent = JSON.parse(init.body);
    return new Response('{"id":"test"}', { status: 200 });
  }
  return realFetch(url, init);
};

const env = { RESEND_API_KEY: 'test-key' };
const valid = {
  name: 'Sita Gurung',
  phone: '+977 9812345678',
  business: 'Restaurant or café',
  message: 'We need online ordering with eSewa for our restaurant in Thamel.',
  website: '',
  ts: String(Date.now() - 20000),
};

const post = (body, opts = {}) =>
  new Request('https://ninetechsystem.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: opts.origin ?? 'https://ninetechsystem.com',
      'CF-Connecting-IP': '1.2.3.4',
      ...opts.headers,
    },
    body: JSON.stringify({ ...valid, ...body }),
  });

let pass = 0, fail = 0;
const check = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  ok    ${name}`); }
  else { fail++; console.log(`  FAIL  ${name} ${extra}`); }
};

const run = async (name, body, opts, expectStatus, expectSent) => {
  sent = null;
  const res = await onRequestPost({ request: post(body, opts), env });
  const data = await res.json().catch(() => ({}));
  check(name, res.status === expectStatus && Boolean(sent) === expectSent,
    `(got ${res.status}, sent=${Boolean(sent)}, body=${JSON.stringify(data).slice(0, 90)})`);
};

console.log('\ncontact form handler\n');

await run('valid submission is delivered', {}, {}, 200, true);
check('  email goes to info@ninetechsystem.com', sent?.to?.[0] === 'info@ninetechsystem.com');
check('  subject names the sender', sent?.subject?.includes('Sita Gurung'));
check('  body carries the phone number', sent?.text?.includes('+977 9812345678'));

await run('honeypot filled is silently dropped', { website: 'http://spam.example' }, {}, 200, false);
await run('submitted too fast is rejected', { ts: String(Date.now() - 500) }, {}, 400, false);
await run('stale timestamp is rejected', { ts: String(Date.now() - 9e7) }, {}, 400, false);
await run('missing name is rejected', { name: '' }, {}, 422, false);
await run('short phone is rejected', { phone: '123' }, {}, 422, false);
await run('letters in phone are rejected', { phone: 'call me maybe' }, {}, 422, false);
await run('business type off the list is rejected', { business: 'Arms dealer' }, {}, 422, false);
await run('short message is rejected', { message: 'hi' }, {}, 422, false);
await run('foreign origin is blocked', {}, { origin: 'https://evil.example' }, 403, false);
await run('pages.dev preview origin is allowed', {}, { origin: 'https://abc.ninetechsystem.pages.dev' }, 200, true);
await run('no timestamp still works (JavaScript off)', { ts: '' }, {}, 200, true);

// Over-long input is truncated, not rejected outright.
sent = null;
await onRequestPost({ request: post({ message: 'x'.repeat(5000) }), env });
check('over-long message is truncated to 2000 chars', sent?.text?.includes('x'.repeat(2000)) && !sent?.text?.includes('x'.repeat(2001)));

// Missing API key must fail loudly rather than pretend to have sent.
sent = null;
const noKey = await onRequestPost({ request: post({}), env: {} });
check('missing RESEND_API_KEY returns 500, sends nothing', noKey.status === 500 && sent === null);

// Non-JSON submission (no JavaScript) gets an HTML page back.
sent = null;
const formBody = new URLSearchParams({ ...valid, ts: String(Date.now() - 20000) });
const htmlRes = await onRequestPost({
  request: new Request('https://ninetechsystem.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://ninetechsystem.com' },
    body: formBody,
  }),
  env,
});
check('no-JavaScript form post returns an HTML page', htmlRes.status === 200 && htmlRes.headers.get('Content-Type').includes('text/html') && sent !== null);

// Rate limiting, when a KV namespace is bound.
const store = new Map();
const kv = {
  get: async (k) => store.get(k) ?? null,
  put: async (k, v) => void store.set(k, v),
};
let limited = 0;
for (let i = 0; i < 7; i++) {
  const r = await onRequestPost({ request: post({}), env: { ...env, RATE_LIMIT: kv } });
  if (r.status === 429) limited++;
}
check('rate limit stops the 6th and 7th message from one IP', limited === 2, `(blocked ${limited})`);

const get = await onRequestGet({ request: new Request('https://ninetechsystem.com/api/contact') });
check('GET redirects to the contact page', get.status === 303 && get.headers.get('Location').endsWith('/contact'));

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
