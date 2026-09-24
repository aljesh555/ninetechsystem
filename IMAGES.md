# IMAGES.md — the image slots

**The site is complete without a single one of these.** Every slot renders a
quiet brand placeholder when its file is missing — never a broken image, never a
stock photo. Add them when you have them, one at a time, in any order.

## How to add one

1. Name the file exactly as the **Slot** column says (lower case, with the
   hyphen), with a `.jpg`, `.jpeg`, `.png` or `.webp` extension. Upper-case
   extensions from a phone (`.JPG`) are fine. iPhone `.HEIC` files are not
   supported: export them as JPEG first.
2. Drop it in `src/images/slots/`.
3. Run `npm run build`.

That is all. The build generates AVIF and WebP at 400/800/1200/1600 wide, writes
the `width` and `height` onto the tag so nothing jumps while the page loads, sets
lazy loading below the fold, and strips EXIF and GPS data from every variant.
The photo is cropped to the slot's shape (square for portraits, 3:2 for the
office, and so on), so keep the subject near the middle of the frame.

Supply the **largest** version you have. Downscaling is automatic; upscaling is
not possible. Do not resize or compress them first.

---

## The slots

The Home hero has no image slot. It is designed as type on navy and looks
finished without a photograph. If you later want a photo there, that is a design
change rather than a file drop.

| Slot | Appears on | What it should be | Supply at least |
|---|---|---|---|
| `work-01` `work-02` `work-03` | Home and Work | Screenshots or photographs of **real** projects. See the permission rules below. | 1200×800 |
| `portrait-anis` | About | Anis Raut. Plain background, head and shoulders, looking at the camera. | 800×800 |
| `portrait-raju` | About | Raju Thapa. Same treatment, taken the same day if possible so the two match. | 800×800 |
| `office-exterior` | About, and Contact (on Contact it only appears once supplied) | The building with the Nine Technology signboard visible. This is the photograph that proves the company is real and findable — it is worth more than all the others put together. | 1200×800 |
| `office-interior` | About | The workspace, in use. | 1200×800 |

Generated automatically, nothing to supply:

| File | What it is |
|---|---|
| `og.png` | The 1200×630 share card. Composed from `logo-wordmark-white.svg` and `logo-symbol-white.svg` by `scripts/build-og.py`, rasterised on every build. |
| Favicons and app icons | `favicon.svg`, `favicon-32.png`, `apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png`, built from `avatar-social-navy-bg.svg`. |
| `manifest.webmanifest` | Built alongside the icons. |
| `map-lazimpat.png` | The Contact page map. Already built and committed. |

## The logo files — where each piece goes

The supplied kit lives untouched in `assets/brand/source/`. Cleaned, cropped and
optimised copies are in `assets/brand/`, and those are what the site uses.

| Piece | Where it is used |
|---|---|
| `logo-full-navy.svg` | **The header**, on screens 900px and wider. Inlined, 3.7 KB. |
| `logo-wordmark-navy.svg` | **The header** below 900px, where the full lockup would not fit. |
| `logo-full-white.svg` | **The footer.** |
| `logo-symbol-navy.svg` | Source for the placeholder mark. |
| `logo-wordmark-white.svg` | The company name on the share card. |
| `logo-symbol-white.svg` | The mark on the share card. |
| `logo-symbol-mono.svg` | Generated. The mark in empty image slots, tinted by CSS. |
| `avatar-social-navy-bg.svg` | Every favicon and app icon. |
| `avatar-social-white-bg.svg` | Kept for a light-background avatar. Not used on the site. |
| `logo-wordmark-singlecolour.svg` | Kept for print. Not used on the site — see the warning below. |

**What is in the header, and why.** On screens 900px and wider, the supplied full
lockup — `logo-full-navy.svg`, the 9 and the wordmark together — at 186px wide in
a 96px bar. Below 900px, the wordmark alone.

The split is deliberate. The full lockup needs horizontal room: the 9 takes about
a third of its width, so squeezing it onto a phone would shrink "TECHNOLOGY"
below legibility. And below 900px the bar also has to carry the phone number, the
WhatsApp button and the menu. For a company founded in 2026 the *name* is worth
more on a small screen than a mark nobody recognises yet, so the phone number
keeps its space and the 9 steps aside.

**Both are the founder's own arrangements.** An earlier build placed the symbol
beside the wordmark manually; once the official `logo-full-*` files arrived that
was dropped, because the spacing between mark and name is a brand decision and
should not be guessed.

The symbol is never used alone in the header. On its own it tells a first-time
visitor nothing; it earns recognition through the favicon, the app icon and the
social avatar first.

> **One file needs fixing at source: `logo-full-white.svg`.** As delivered, the 9
> was still navy while the rest of the lockup had been recoloured white, so the
> symbol all but vanished on a navy background. `prepare-brand.mjs` recolours
> that one fill to white and says so when it runs, and it warns if the file ever
> arrives without a navy fill to correct. Worth fixing in the master file so the
> version you hand to a printer or a sign-maker is right too.

**A warning about the single-colour wordmark.** It has no amber square — the full
stop is dropped entirely, not recoloured. That is correct for one-colour printing
(a stamp, embroidery, a single-colour sign), but it loses the brand's signature
mark, so do not use it anywhere colour is available.

### Ready-to-upload files

`assets/brand/social/` holds the delivered PNGs, sized and ready:

| File | Use it for |
|---|---|
| `avatar-social-navy-bg-512.png` | Profile picture on Facebook, Instagram, LinkedIn and TikTok. Use this one — it stands out against those platforms' white interfaces. |
| `avatar-social-white-bg-512.png` | Alternative, for a context with a dark background. |
| `logo-wordmark-navy.png` | Documents, quotations, invoices, email signatures. |
| `logo-wordmark-white.png` | Anything on a dark background. |
| `logo-symbol-navy.png` | Where only the mark fits. |

Use the same avatar on all four social platforms. An account that looks different
on each one reads as a different business, to people and to search engines alike.

### If you ever replace a logo file

Drop the new one into `assets/brand/source/` under the same name, then run:

```bash
node scripts/prepare-brand.mjs   # clean, crop and optimise
python3 scripts/build-og.py      # rebuild the share card
npm run build                    # regenerate favicons and icons
```

`prepare-brand.mjs` warns if a file no longer matches what it expects — for
example if `logo-wordmark-white.svg` arrives without the navy backdrop it has
been removing. Never edit anything in `assets/brand/` by hand; it is all
generated.

---

## Before you photograph anything

**Take them on a phone in landscape, in daylight, with the lens wiped.** That
beats a rushed shoot with better equipment.

**Check the frame for things that must not be published.** This is the one that
gets companies into trouble:

- keys, or a key cabinet
- passwords, logins or Wi-Fi codes on a whiteboard or a sticky note
- documents, invoices or client files on a desk, even blurred
- screens showing client data, customer names or an inbox
- alarm panels, safes, CCTV positions, or anything that shows how the office is
  secured
- anyone who has not agreed to be photographed

**Copyright.** Every image must be one the company owns, or one taken by someone
who has given written permission. No images taken from the web, no competitor
screenshots, no stock photography presented as the office or the team.

## Before you publish a project to `work-01/02/03`

Projects go in `src/data/projects.js`, which is empty until real work exists. The
array is what the Work page renders; while it is empty the page shows the honest
empty state.

- **Written permission from the client** before their name appears anywhere. Not
  a verbal yes over the phone — a message you can point to.
- **Until you have it, anonymise:** "A travel agency in Lazimpat", "A restaurant
  in Thamel". That is a real reference and it breaks no confidence.
- **No customer data in a screenshot.** Blur nothing — retake it with test data
  instead. Blurring gets undone.
- **The outcome line must be something the client would repeat out loud.** Not
  "increased engagement by 300%". Something like "Enquiries get answered the same
  evening instead of the next morning."
