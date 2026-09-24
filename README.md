# Nine Technology — ninetechsystem.com

The production website. Astro, static output, deployed to Cloudflare Pages.

**Live:** https://ninetechsystem.pages.dev

```bash
npm install
npm run dev              # local development
npm run build            # production build into dist/
npx wrangler pages deploy --project-name ninetechsystem --branch main
```

## The documents

| File | What it covers |
|---|---|
| `DEPLOY.md` | **Read this first.** Everything still to be done: the email key, the AI-crawler setting, the custom domain, Search Console, Google Business Profile. |
| `DECISIONS.md` | Every judgement call made during the build and why. |
| `DESIGN_PLAN.md` | The design system, and the revisions made against it. |
| `NAP.md` | The canonical name/address/phone strings. Paste from here into every external profile. |
| `IMAGES.md` | The image slots and how to fill them. |

## Checks

```bash
npm test                          # 32 tests on the contact form handler
npm run preview                   # serve dist/ the way Cloudflare Pages does, on :4321
node scripts/security-check.mjs   # greps dist/ for anything that must not be public
                                  # (also runs at the end of every `npm run build`,
                                  # and fails the build if it finds something)
```

The build prints page weights against the performance budget every time it runs.

## Layout

```
src/data/site.js        Every published fact. Change a phone number here and it
                        changes on every page, in the schema, and in llms.txt.
src/data/projects.js    Real projects. Empty until a client gives permission.
src/pages/              The five pages, plus sitemap.xml and llms.txt endpoints.
src/styles/global.css   The whole stylesheet. One file.
functions/api/contact.js  The form handler (Cloudflare Pages Function).
assets/brand/source/    The supplied logo files, exactly as delivered. Never edited.
assets/brand/           Production copies: metadata stripped, cropped, optimised.
assets/brand/social/    Ready-to-upload PNGs for social profiles and documents.
scripts/                Build and check tooling. build-fonts.py, prepare-brand.mjs,
                        build-og.py and build-map.mjs are run by hand when a source
                        asset changes, not on every build.
```

---

## What the founder needs to supply

Nothing here blocks the site from being live — it already is. These are in order
of how much difference they make.

### Now, or the site is not finished

1. **A Resend API key** so the contact form sends. Until this is set, the form
   tells visitors to call or WhatsApp instead. Full steps: `DEPLOY.md` §1.
   *~20 minutes, including DNS.*

2. **Turn the AI crawlers back on in Cloudflare.** Cloudflare blocks them by
   default on new domains as of 15 September 2026. Every answer-first paragraph
   and every piece of schema in this build is invisible to ChatGPT and Perplexity
   until this is changed. `DEPLOY.md` §2. *~5 minutes.*

3. **Point ninetechsystem.com at the site.** It is on a `.pages.dev` address
   today. `DEPLOY.md` §3.

### This week

4. **A photograph of the office exterior with the signboard visible.** This is
   the single most valuable image on the list — it is what proves to a stranger
   in Kathmandu that the company is real and findable. Slot `office-exterior`.

5. **Portraits of both directors.** Plain background, head and shoulders,
   ideally taken on the same day so the two match. Slots `portrait-anis` and
   `portrait-raju`.

6. **Set up the Google Business Profile** and paste the fields from `NAP.md`
   character for character. For local enquiries this will out-earn everything
   else on this page. `DEPLOY.md` §5.

### As real work happens

7. **The first three projects**, with written client permission. Add them to
   `src/data/projects.js` — the format and the rules are in that file and in
   `IMAGES.md`. Until then both Work sections say, honestly, that the company is
   new and offers to show the work directly. **Do not put invented case studies
   there.**

8. **Office interior and service photographs** if you want them. All optional;
   every slot renders a clean placeholder, and the services placeholders are
   hidden on phones so they cost nothing.

### Putting prices back, when they are settled

Everything is in `src/data/site.js`. For each service, add `price` (the display
string) and `priceValue` (the number, for schema) back alongside `timeline`, and
add `from` to each of the four groups. Then:

1. `src/pages/services.astro` — put the `offers` block back on the `Service`
   schema, and swap `<p class="fact">{s.timeline}</p>` for the price.
2. `src/pages/index.astro` — restore the third column in the overview rows.
3. `src/pages/llms.txt.js` — put the figures back in the service lines.
4. `carePlans.plans` — add `price` back and restore `.plan-price` in the table.
5. Rewrite the first FAQ answer and the Services page intro, and restore the
   "Prices exclude 13% VAT" line the brief asks for.
6. `src/pages/services.astro` — the `<title>` is "Services — Nine Technology,
   Kathmandu" while there are no prices. Change it back to "Services & Prices —
   Nine Technology, Kathmandu" once the figures are on the page.

The `.fact` CSS class is the slot that used to hold the price; it is styled for
exactly that job and is currently holding the timeline.

### Worth knowing

- **No prices are published anywhere**, at the founder's instruction, because
  pricing is not settled. The Services page says every project is quoted after a
  free scoping call, each service shows its **timeline** instead of a figure, and
  the JSON-LD carries no `Offer`. See "Putting prices back" below.
- **Everything factual lives in one place:** `src/data/site.js`. Change a phone
  number or a timeline there and it updates the page, the structured data and
  `llms.txt` together.
- **Nothing on the site can be held against the company.** No guaranteed
  rankings, no 24/7 promise, no fixed delivery date without scope, no invented
  testimonial, no client named without permission. The reply promise — within
  minutes, Sunday to Friday, 10am to 5pm — is set once, in `site.replyPromise`
  and `site.replyTime`, and appears on every page that invites contact. It is the one
  commitment that needs a human to keep it.
