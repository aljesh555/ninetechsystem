/**
 * Contact form handler — Cloudflare Pages Function.
 *
 * Defences, in the order they run:
 *   1. Origin check (this site, its pages.dev previews, or local dev only)
 *   2. Honeypot field ("extra") — must be empty
 *   3. Timing check — a human does not submit in under 3 seconds
 *   4. Server-side validation of every field, with length caps
 *   5. Per-IP rate limit, 5 an hour, when a KV namespace is bound
 *
 * Nothing is stored. The message is delivered by email to the site's published
 * address and then forgotten. See DEPLOY.md for the environment variables.
 *
 * Every JSON error carries `message`, a sentence the page shows the visitor
 * as-is, so what they read always matches what actually went wrong.
 */
import { site, businessTypes } from '../../src/data/site.js';
import { needs } from '../../src/data/services.js';

const RECIPIENT = site.email;
const SENDER = `${site.name} website <website@ninetechsystem.com>`;

const PAGES_PROJECT = 'ninetechsystem.pages.dev';
const ALLOWED_HOSTS = ['ninetechsystem.com', 'www.ninetechsystem.com', PAGES_PROJECT, 'localhost', '127.0.0.1'];
const isAllowedHost = (host) => ALLOWED_HOSTS.includes(host) || host.endsWith(`.${PAGES_PROJECT}`);

// Shared with the page, so the browser and the server never disagree.
export const PHONE_CHARS = /^[+()\d\s-]+$/;
export const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const CALL_US = `Please call or WhatsApp us on ${site.phoneDisplay}.`;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

/** Non-JS submissions get a real page back, not raw JSON. */
const html = (status, title, message) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — ${site.name}</title></head><body style="font-family:system-ui,sans-serif;max-width:34em;margin:12vh auto;padding:0 20px;color:#123566;line-height:1.6"><h1 style="font-size:1.5rem">${title}</h1><p>${message}</p><p><a href="/contact" style="color:#123566">Back to the contact page</a></p></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  const fail = (status, title, message, extra = {}) =>
    wantsJson ? json(status, { ok: false, error: title, message, ...extra }) : html(status, title, message);

  // 1. Same-site only. No Origin at all (curl, some old clients) is let through
  //    to the checks below; a foreign one is not.
  const origin = request.headers.get('Origin');
  if (origin) {
    let host = '';
    try { host = new URL(origin).hostname; } catch { /* "null" and junk fall through as blocked */ }
    if (!isAllowedHost(host)) {
      return fail(403, 'Blocked', 'That request did not come from this website.');
    }
  }

  let data;
  const type = request.headers.get('Content-Type') || '';
  try {
    if (type.includes('application/json')) {
      data = await request.json();
    } else if (type.includes('form')) {
      data = Object.fromEntries(await request.formData());
    } else {
      return fail(415, 'Unsupported', 'Please send the form from the contact page.');
    }
  } catch {
    data = null;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return fail(400, 'Could not read that', 'Please try the form again.');
  }

  // 2. Honeypot.
  if (clean(data.extra, 200)) {
    // Look successful so the bot does not learn anything, but send nothing.
    return wantsJson ? json(200, { ok: true }) : html(200, 'Message sent', 'Thank you.');
  }

  // 3. Timing. Absent when JavaScript is off, in which case the honeypot stands alone.
  const ts = Number(data.ts);
  if (Number.isFinite(ts) && ts > 0) {
    const elapsed = Date.now() - ts;
    if (elapsed < MIN_FILL_MS) {
      return fail(400, 'Please try again', 'That was sent a little too quickly. Please press Send again.');
    }
    if (elapsed > MAX_AGE_MS) {
      return fail(400, 'Please reload the page', 'This page has been open for a long time. Please copy your message, reload the page and send it again.');
    }
  }

  // 4. Validation.
  const name = clean(data.name, 80);
  const phone = clean(data.phone, 24);
  const business = clean(data.business, 60);
  const message = clean(data.message, 2000);
  const need = needs.find((n) => n.value === (clean(data.need, 40) || 'not-sure'));
  const digits = phone.replace(/\D/g, '');

  const fields = [];
  if (name.length < 2) fields.push('name');
  if (digits.length < 7 || digits.length > 15 || !PHONE_CHARS.test(phone)) fields.push('phone');
  if (!businessTypes.includes(business)) fields.push('business');
  if (!need) fields.push('need');
  if (message.length < 10) fields.push('message');
  if (fields.length) {
    return fail(422, 'Some fields need fixing',
      'Please check the fields marked above, then send again.', { fields });
  }

  // 5. Rate limit by IP. Needs a KV namespace bound as RATE_LIMIT; without it,
  //    use the Cloudflare dashboard rate-limiting rule described in DEPLOY.md.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.RATE_LIMIT) {
    const key = `contact:${ip}`;
    const count = Number((await env.RATE_LIMIT.get(key)) || 0);
    if (count >= 5) {
      return fail(429, 'Too many messages',
        `You have sent several messages in the last hour. ${CALL_US}`);
    }
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 3600 });
  }

  if (!env.RESEND_API_KEY) {
    return fail(503, 'Email is not set up yet',
      `Our contact form is not switched on yet, so this message was not sent. ${CALL_US}`);
  }

  const text = [
    `Name:          ${name}`,
    `Phone:         ${phone}`,
    `Business type: ${business}`,
    `Service:       ${need?.label}`,
    '',
    'What they need:',
    message,
    '',
    '---',
    `Sent from the contact form at ${new URL(request.url).origin}/contact`,
    `Received: ${new Date().toISOString()}`,
    `Country: ${request.headers.get('CF-IPCountry') || 'unknown'}`,
  ].join('\n');

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        subject: `Website enquiry — ${name} (${business}) — ${need?.label}`,
        text,
      }),
    });
  } catch {
    res = null;
  }

  if (!res?.ok) {
    return fail(502, 'Could not send', `We could not send that just now. ${CALL_US}`);
  }

  return wantsJson
    ? json(200, { ok: true })
    : html(200, 'Message sent',
        `Thank you. We will call or WhatsApp you on the number you gave, usually ${site.replyTime}, ${site.hoursShort}.`);
}

/** A GET on the endpoint is someone poking at it; send them to the page. */
export const onRequestGet = ({ request }) =>
  Response.redirect(new URL('/contact', request.url).toString(), 303);
