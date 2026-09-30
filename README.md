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
src/data/services.js    Every service, price, feature and FAQ.
src/pages/              Five main pages, the /services/* detail pages, sitemap.xml, llms.txt.
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

1. **Authenticate ninetechsystem.com for sending email.** The contact form
   sends through Brevo and the key is already set, so enquiries arrive — but
   they go out from a gmail.com address until the domain is authenticated, which
   makes spam filing likely. Full steps: `DEPLOY.md` §1.2. *~10 minutes, DNS.*

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

### Changing a price, a feature or an FAQ

Everything on the Services pages lives in **`src/data/services.js`**: every
service name, price, feature list and FAQ. The hub, the six detail pages, the
contact form's Service list, the JSON-LD and `llms.txt` all read from it.

- **Change a price:** edit the number, e.g. `price: { from: 20000, to: 35000 }`.
  Write plain numbers; the site adds the Nepali commas (`1,20,000`) itself.
- **Monthly / yearly / per shoot / setup:** `per: 'month' | 'year' | 'shoot' | 'setup'`.
- **Take a price off:** `price: null` plus `priceNote: 'Quoted'`.
- Then `npm run build` and deploy. Nothing else needs touching.

### Worth knowing

- **Prices are published where the scope is standard** (websites, Grow, Automate
  set-up fees, Support). **Software, apps, booking systems and AI agents show no
  price** — they are quoted after a free call, at the founder's instruction. All prices exclude 13% VAT and are the
  founder's working figures as of September 2026.
- **Everything factual lives in one place:** `src/data/site.js`. Change a phone
  number or a timeline there and it updates the page, the structured data and
  `llms.txt` together.
- **Nothing on the site can be held against the company.** No guaranteed
  rankings, no 24/7 promise, no fixed delivery date without scope, no invented
  testimonial, no client named without permission. The reply promise — within
  minutes, Sunday to Friday, 10am to 5pm — is set once, in `site.replyPromise`
  and `site.replyTime`, and appears on every page that invites contact. It is the one
  commitment that needs a human to keep it.
