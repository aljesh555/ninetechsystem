/**
 * Contact form handler — Cloudflare Pages Function.
 *
 * Defences, in the order they run:
 *   1. Method and Origin check (same-site posts only)
 *   2. Honeypot field ("website") — must be empty
 *   3. Timing check — a human does not submit in under 3 seconds
 *   4. Server-side validation of every field, with length caps
 *   5. Per-IP rate limit, 5 an hour, when a KV namespace is bound
 *
 * Nothing is stored. The message is delivered by email to info@ninetechsystem.com
 * and then forgotten. See DEPLOY.md for the environment variables.
 */

const RECIPIENT = 'info@ninetechsystem.com';
const SENDER = 'Nine Technology website <website@ninetechsystem.com>';

const ALLOWED_HOSTS = ['ninetechsystem.com', 'www.ninetechsystem.com'];
const BUSINESS_TYPES = [
  'Restaurant or café', 'Hotel or resort', 'Travel or trekking agency',
  'School or college', 'Clinic or hospital', 'Shop or online store',
  'Distributor or wholesaler', 'Something else',
];

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

/** Non-JS submissions get a real page back, not raw JSON. */
const html = (status, title, message) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — Nine Technology</title></head><body style="font-family:system-ui,sans-serif;max-width:34em;margin:12vh auto;padding:0 20px;color:#123566;line-height:1.6"><h1 style="font-size:1.5rem">${title}</h1><p>${message}</p><p><a href="/contact" style="color:#123566">Back to the contact page</a></p></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  const fail = (status, error, title, message) =>
    wantsJson ? json(status, { ok: false, error }) : html(status, title, message);

  // 1. Same-site only.
  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      if (!ALLOWED_HOSTS.includes(host) && !host.endsWith('.pages.dev') && host !== 'localhost') {
        return fail(403, 'Blocked', 'Blocked', 'That request did not come from this website.');
      }
    } catch {
      return fail(403, 'Blocked', 'Blocked', 'That request did not come from this website.');
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
      return fail(415, 'Unsupported', 'Unsupported', 'Send the form from the contact page.');
    }
  } catch {
    return fail(400, 'Could not read that', 'Could not read that', 'Please try the form again.');
  }

  // 2. Honeypot.
  if (clean(data.website, 200)) {
    // Look successful so the bot does not learn anything, but send nothing.
    return wantsJson ? json(200, { ok: true }) : html(200, 'Message sent', 'Thank you.');
  }

  // 3. Timing. Absent when JavaScript is off, in which case the honeypot stands alone.
  const ts = Number(data.ts);
  if (Number.isFinite(ts) && ts > 0) {
    const elapsed = Date.now() - ts;
    if (elapsed < 3000 || elapsed > 6 * 60 * 60 * 1000) {
      return fail(400, 'Please try again', 'Please try again', 'The form expired. Please open the contact page again and resend.');
    }
  }

  // 4. Validation.
  const name = clean(data.name, 80);
  const phone = clean(data.phone, 24);
  const business = clean(data.business, 60);
  const message = clean(data.message, 2000);
  const digits = phone.replace(/\D/g, '');

  const errors = [];
  if (name.length < 2) errors.push('name');
  if (digits.length < 7 || digits.length > 15 || !/^[+()\d\s-]+$/.test(phone)) errors.push('phone');
  if (!BUSINESS_TYPES.includes(business)) errors.push('business');
  if (message.length < 10) errors.push('message');
  if (errors.length) {
    return fail(422, 'Some fields need fixing', 'Some fields need fixing',
      'Please check your name, phone number, business type and message, then send again.');
  }

  // 5. Rate limit by IP. Needs a KV namespace bound as RATE_LIMIT; without it,
  //    use the Cloudflare dashboard rate-limiting rule described in DEPLOY.md.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.RATE_LIMIT) {
    const key = `contact:${ip}`;
    const count = Number((await env.RATE_LIMIT.get(key)) || 0);
    if (count >= 5) {
      return fail(429, 'Too many messages', 'Too many messages',
        'You have sent several messages in the last hour. Please call or WhatsApp us on +977 9843325804.');
    }
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 3600 });
  }

  if (!env.RESEND_API_KEY) {
    return fail(500, 'Email is not configured', 'Something went wrong',
      'We could not send that just now. Please call or WhatsApp us on +977 9843325804.');
  }

  const text = [
    `Name:          ${name}`,
    `Phone:         ${phone}`,
    `Business type: ${business}`,
    '',
    'What they need:',
    message,
    '',
    '---',
    `Sent from the contact form at ${new URL(request.url).origin}/contact`,
    `Received: ${new Date().toISOString()}`,
    `Country: ${request.headers.get('CF-IPCountry') || 'unknown'}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      subject: `Website enquiry — ${name} (${business})`,
      text,
    }),
  });

  if (!res.ok) {
    return fail(502, 'Could not send', 'Something went wrong',
      'We could not send that just now. Please call or WhatsApp us on +977 9843325804.');
  }

  return wantsJson
    ? json(200, { ok: true })
    : html(200, 'Message sent',
        'Thank you. We will call or WhatsApp you on the number you gave, usually within 2 hours, Sunday to Friday, 10am to 6pm.');
}

/** A GET on the endpoint is someone poking at it; send them to the page. */
export const onRequestGet = ({ request }) =>
  Response.redirect(new URL('/contact', request.url).toString(), 303);
