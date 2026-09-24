# DEPLOY.md

## Where it is now

**Live:** https://ninetechsystem.pages.dev

Cloudflare Pages project `ninetechsystem`, account **Aljesh Raut**
(`<your-account-id>`), production branch `main`. The static site
and the contact Function are both deployed and verified.

To ship a change:

```bash
npm run build
npx wrangler pages deploy --project-name ninetechsystem --branch main
```

`npm run build` regenerates the favicons, the OG card, `sitemap.xml`, `llms.txt`
and `_headers` (including a fresh Content-Security-Policy hash for every inline
script and style). Never hand-edit `dist/`.

Useful checks:

```bash
node scripts/test-contact.mjs     # 32 tests on the form handler
node scripts/security-check.mjs   # greps dist/ for anything that must not ship
```

---

## Do these in order

Steps 1 and 2 are the ones that matter most. Until step 1 is done the contact
form does not send. Until step 2 is done every AI-search decision in this build
is wasted.

---

### 1. Make the contact form actually send — **required**

Right now a visitor who submits the form gets an honest error telling them to
call or WhatsApp instead. It will keep doing that, correctly, until this is done.

The site sends through **Resend**. MailChannels stopped free sending for
Cloudflare on 31 August 2024, and Cloudflare's own documentation now points at
Resend. The free tier is 100 emails a day, 3,000 a month.

1. Create an account at **resend.com**.
2. **Domains → Add Domain →** `ninetechsystem.com`. Resend gives you DNS records
   (SPF, DKIM, and usually a return-path CNAME). Add them wherever
   ninetechsystem.com's DNS lives. Wait for Resend to show **Verified** — usually
   minutes, sometimes a few hours.
3. **API Keys → Create API Key**, permission *Sending access*. Copy it once; it
   is not shown again.
4. Store it as a Pages secret:

   ```bash
   npx wrangler pages secret put RESEND_API_KEY --project-name ninetechsystem
   ```

   Paste the key when prompted. It is encrypted at rest and never appears in the
   repo or the build.
5. Redeploy (`npx wrangler pages deploy --project-name ninetechsystem --branch main`),
   then send yourself a real message from https://ninetechsystem.com/contact and
   confirm it lands in **info@ninetechsystem.com**.

The sending address is `website@ninetechsystem.com` and the recipient is
`info@ninetechsystem.com`. Both are in `functions/api/contact.js` if they ever
need to change.

> **Alternative, once the domain is on Cloudflare:** Cloudflare Email Routing can
> deliver Worker-sent mail to a verified address with no third party at all. It
> needs a `send_email` binding and about five lines changed in
> `functions/api/contact.js`. Worth switching to later; Resend is the right
> choice for launch because it works before the domain moves.

---

### 2. Let AI search engines in — **required, and easy to miss**

**Cloudflare blocks AI crawlers by default on new domains as of 15 September
2026.** Crawlers classified as *Training* and *Agent* are blocked; only *Search*
is allowed through. This happens at the edge, before `robots.txt` is ever read,
so the `llms.txt`, the answer-first copy and the schema in this build are
invisible until it is changed.

Once ninetechsystem.com is on Cloudflare:

1. Cloudflare dashboard → select **ninetechsystem.com**
2. **Security → Settings** (or **AI Crawl Control**, depending on how your
   account is rolled out)
3. Find the three AI crawler categories and set each one:

| Category | Set to | Why |
|---|---|---|
| **Search** | **Allow** | This is AI search indexing. Blocking it removes you from AI search results entirely. |
| **Agent** | **Allow** | This is the fetch that happens when somebody asks ChatGPT "who builds websites in Kathmandu" and it goes and reads your page *right then*. This is the traffic the whole site is structured for. |
| **Training** | **Allow** | Recommended. There is nothing on a five-page marketing site worth withholding, and being in the training data makes the company more likely to be named later. Set it to Block if you prefer — it costs some long-term recall but nothing immediate. |

Do the same on any `*.pages.dev` zone if you are testing there.

`public/robots.txt` already names GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot,
anthropic-ai, Claude-User, PerplexityBot, Google-Extended, Googlebot, Bingbot,
Applebot and Applebot-Extended explicitly. That file is the polite request; the
Cloudflare setting is the lock on the door. Both have to agree.

---

### 3. Attach the real domain

Wrangler in this version has no `pages domain` command and the OAuth token is not
accepted by the REST API, so this is a dashboard job. It takes two minutes.

**If ninetechsystem.com is already on this Cloudflare account:**

1. Dashboard → **Workers & Pages → ninetechsystem → Custom domains**
2. **Set up a custom domain** → `ninetechsystem.com` → **Activate domain**.
   Cloudflare creates the CNAME itself.
3. Repeat for `www.ninetechsystem.com`.
4. **Redirect www to the apex** so there is only one canonical host. Dashboard →
   **Rules → Redirect Rules → Create rule**:
   - Name: `www to apex`
   - If: *Hostname* **equals** `www.ninetechsystem.com`
   - Then: **Dynamic redirect**, status **301**, expression:
     `concat("https://ninetechsystem.com", http.request.uri.path)`
   - Preserve query string: **on**

**If the domain is not on Cloudflare yet:**

1. Dashboard → **Add a site** → `ninetechsystem.com` → Free plan
2. Cloudflare gives you two nameservers. Change them at your current registrar.
3. Wait for the zone to go **Active** (usually under an hour), then do the steps
   above.

**Then confirm HSTS.** It is deliberately *not* set in `_headers` — Cloudflare
should own it, and two sources for one header is how they end up disagreeing.
Dashboard → **SSL/TLS → Edge Certificates**:
- **Always Use HTTPS**: on
- **HTTP Strict Transport Security (HSTS)**: enable, max-age 6 months, include
  subdomains, preload off for now

Turn HSTS on only once the domain is serving correctly over HTTPS. It is hard to
undo.

**Finally,** change the canonical host if it ever differs from
`https://ninetechsystem.com` — it is set once, in `astro.config.mjs` (`site`) and
`src/data/site.js` (`site.url`), and everything else derives from it.

---

### 4. Rate-limit the form — recommended

The handler enforces 5 messages per IP per hour **if** a KV namespace is bound.
Without it the honeypot, the timing check and validation still apply, but nothing
stops one person sending a hundred valid messages.

```bash
npx wrangler kv namespace create RATE_LIMIT
```

Then dashboard → **Workers & Pages → ninetechsystem → Settings → Bindings → Add
→ KV namespace**, variable name **`RATE_LIMIT`**, select the namespace you just
made. Add it to **Production**. Redeploy.

*Or*, instead of KV: **Security → WAF → Rate limiting rules → Create rule** —
path equals `/api/contact`, method `POST`, 5 requests per 1 hour per IP, action
Block. Same outcome, no binding needed.

---

### 5. Tell the search engines it exists

**Google Search Console** — https://search.google.com/search-console
1. **Add property → Domain** → `ninetechsystem.com`
2. Verify with the TXT record it gives you (add it in Cloudflare DNS)
3. **Sitemaps** → submit `sitemap.xml`
4. **URL Inspection** → paste `https://ninetechsystem.com/` → **Request indexing**.
   Repeat for `/services`, which is the page that will earn the most search
   traffic.

**Bing Webmaster Tools** — https://www.bing.com/webmasters
1. **Add site** → `https://ninetechsystem.com`
2. Easiest path is **Import from Google Search Console** once step 1 above is done
3. Otherwise verify by DNS, then **Sitemaps → Submit** `https://ninetechsystem.com/sitemap.xml`

Bing matters more than its market share suggests — it feeds ChatGPT's web search.

**Google Business Profile** — https://business.google.com
This is the highest-value item on this page for local enquiries.
1. Create the profile. Paste every field **from `NAP.md`**, character for
   character. Do not retype from memory.
2. Category: *Website designer*. Additional: *Software company*,
   *Internet marketing service*.
3. Service area: Kathmandu, Lalitpur, Bhaktapur.
4. Hours: Sunday–Friday 10:00–18:00, Saturday closed.
5. Request the postcard or phone verification and complete it.
6. **Once verified**, add the profile URL to the site footer: open
   `src/components/Footer.astro`, add it to the "Follow" list, and add the same
   URL to `site.social` in `src/data/site.js` so it also lands in the
   `sameAs` schema. Rebuild and deploy.

---

### 6. Check the structured data

The first deployment validated with **0 errors on all five pages**. Since then the
business has been merged into one node (`Organization` + `ProfessionalService`,
31 nodes in all), so **run https://validator.schema.org once on `/` and
`/services` after the next deploy** to confirm it is still clean.

Google's own test needs a browser, so run it once yourself after the domain is
attached:
https://search.google.com/test/rich-results → paste `https://ninetechsystem.com/services`.
You should see **FAQ** detected. FAQ rich results only display for a narrow set
of sites now, but the markup still feeds AI answer engines, which is the point.

---

## What was verified before handover

On the live deployment, https://ninetechsystem.pages.dev:

| Check | Result |
|---|---|
| Lighthouse mobile, all five pages | Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100** |
| LCP / CLS / TTFB | 1.1–1.4s / **0** / 40ms |
| All five pages, robots.txt, llms.txt, sitemap.xml, og.png, manifest, fonts | 200 |
| `/services/` → `/services` | 308, one canonical URL form |
| `GET /api/contact` | 303 to `/contact` |
| Form with valid data | correct "email is not configured" error until step 1 is done |
| Form with honeypot filled | accepted silently, nothing sent |
| Form from a foreign origin | 403 |
| Security headers | CSP with per-hash allowlist and no `unsafe-inline`, nosniff, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options |
| Caching | fonts and `/_astro/*` immutable for a year, HTML must-revalidate |
| Structured data | 0 errors, all five pages |

Not verified, because it cannot be until step 1: an email actually arriving in
the inbox. Send yourself one.
