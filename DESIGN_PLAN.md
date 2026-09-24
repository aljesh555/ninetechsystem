# DESIGN_PLAN.md — Nine Technology

Pass 1 of the two-pass process. Written before any code. Reviewed against the brief §3
and the frontend-design skill's list of generic tells in §6 below; the revisions are stated.

---

## 1. Subject, audience, job

**Subject.** A five-month-old IT company in Lazimpat, Kathmandu that does four things
under one roof: builds the software, markets it, automates the repeat work behind it,
and keeps maintaining it.

**Audience.** A business owner in Kathmandu — restaurant, hotel, travel agency, school,
clinic, shop, distributor — who currently runs the business on a notebook, an Excel file
and a WhatsApp inbox. Reads on a mid-range Android, on mobile data, probably standing up.

**Primary job of the page.** In eight seconds: *what these people do, roughly what it
costs, and that they are real and reachable.* Then one tap: WhatsApp or the quote form.

Everything below is measured against that one job. The design is not trying to be
admired; it is trying to earn a tap from someone who has been let down by a web company
before.

---

## 2. Color

Six values. Navy, amber, grey and off-white are fixed by the brief; the other two are
derived from navy and declared here so nothing is invented later in the CSS.

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#123566` | Hero ground, all headings, **and body text**. The site's ink. |
| `--navy-deep` | `#0E2A52` | Footer only. Derived from navy; the page ends darker than it began. |
| `--amber` | `#FF9500` | Buttons, link hover, and the full stop (see §5). Never a large fill. |
| `--grey` | `#5A6B82` | Secondary text, captions, "not included" lists. |
| `--off-white` | `#F7F8FA` | Alternating section ground. Cool, not cream. |
| `--rule` | `#E3E7EE` | Borders and dividers. Derived from off-white. |

**Contrast decisions, checked before building, not after:**

- White on `--navy` → **9.6:1**. Hero and footer text is safe at any size.
- `--navy` on white → **9.6:1**. This is why navy is the body-text ink, not a neutral grey.
- `--grey` on white → **5.4:1**. Safe for body-size secondary text.
- `--amber` on white → **2.2:1**. **Never text, never a border you must see.** Amber only
  appears as a *ground* or a *shape*.
- **`--navy` on `--amber` → 5.9:1.** So every amber button carries navy text, not white.
  White on amber is 2.1:1 and fails; it is also the default everyone ships. Navy-on-amber
  is both accessible and more distinctive.

No gradients. No tinted near-black — `#0B0B0B`/`#111` never appear; the darkest value on
the site is a real navy.

---

## 3. Type

Two families, both fixed by the brief, both self-hosted. **Four `woff2` files, 33.7KB total.**

| Role | Face | Weight | Notes |
|---|---|---|---|
| Display (hero + page titles) | Poppins | 700 | The one place boldness is spent. |
| Headings | Poppins | 600 | Everything below the display line. |
| Body, UI, forms | Inter | 400 / 500 | 500 for labels, prices, buttons. |
| The two Nepali lines | Poppins Devanagari | 500 | Subset to *only* the characters used. |
| Wordmark | Poppins 700 | — | **Outlined to SVG paths.** Ships no font file. |

**Revised during the build.** This plan first called for a single Poppins weight, on the
reasoning that the four-file budget was already spent once Devanagari took a slot. That
was wrong: Google serves Inter's Latin slice as a *variable* font — the same file URL
answers for weight 400 and for weight 500 — so pinning the axis to 400–500 yields one
12.5KB file covering both. That freed a slot, and it went to Poppins 700 for the display
line, which is precisely where the brief says to spend boldness. Four files, 33.7KB.
Recorded in `DECISIONS.md`.

**Scale.** Major third (1.25), from a 17px body. Rounded to sensible px, `clamp()` on the
two display sizes only.

```
display   clamp(2.5rem, 7vw, 4.5rem)   Poppins 700, tracking -0.035em, leading 1.02
h1-lead   clamp(1.2rem, 2.4vw, 1.6rem) Inter 400  — the hero's semantic h1
h2        clamp(1.9rem, 4vw, 2.6rem)   Poppins 600, tracking -0.02em, leading 1.1
h3        1.25rem                      Poppins 600
lead      1.2rem                       Inter 400, grey, leading 1.55
body      1.0625rem (17px)             Inter 400, leading 1.65, measure 34em (~64ch)
small     0.9375rem (15px)             Inter 400
meta      0.8125rem (13px)             Inter 500
```

Tight negative tracking at display sizes and none below 1.25rem. Poppins is a very
common typeface; what stops it reading as a template is the tracking, the size jumps
(1.6rem straight to 4.5rem in the hero), and using only two weights of it.

**Typographic prohibitions, self-imposed:** no ALL-CAPS labels anywhere, including
eyebrows above headings — there are no eyebrows. No single accented word inside a
headline. No monospace for data. No `→` appended to any link or button. No middle-dot
meta strings; where the brief's own source copy uses ` · ` the site uses sentences.

---

## 4. Layout

Container 1120px, 20px gutters at 390px. Everything **left-aligned** — every section
heading, every paragraph, every list. Nothing is centred except the two buttons inside
the contact strip on mobile. Left alignment is the whole reason the pages feel calm;
centred blocks are what make brochure sites feel like brochures.

Two section patterns only, alternating white / off-white.

**A. Full-width** — Home's sections. Heading, then content across the full measure.

**B. Statement / detail** — Services and About. A 4-column heading rail on the left
(sticky), 8 columns of content on the right. The asymmetry does the work that borders
and cards would otherwise do.

```
HOME — hero (navy, full bleed)
┌────────────────────────────────────────────────────────────┐
│ [logo]  Home Services Work About Contact    [Get a quote]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Your ambition,                                            │
│  our engineering▪            ← display. ▪ = amber square,  │
│                                  the full stop, 0.18em     │
│  Websites, software and AI automation for                  │
│  businesses in Kathmandu.     ← the <h1>, Inter 400        │
│                                                            │
│  [ Get a quote ]  [ Message us on WhatsApp ]               │
│                                                            │
│  We reply within 2 hours, Sunday–Friday, 10am–6pm.         │
│                                                            │
└────────────────────────────────────────────────────────────┘
   No illustration. No image required. No 3×3 graphic. See §6.
```

```
HOME — the bundle (off-white). The one amber moment on this screen.
┌────────────────────────────────────────────────────────────┐
│  Build it▪  Grow it▪  Automate it▪    ← three amber stops   │
│                                          as ONE gesture     │
│  Three parts, one team, one invoice.                       │
│                                                            │
│  ─────────────────  ─────────────────  ─────────────────   │
│  We build the       We bring the       We automate the     │
│  thing.             customers.         work behind it.     │
│  two lines          two lines          two lines           │
│                                                            │
│  See what's in each part →no arrow. plain link.            │
└────────────────────────────────────────────────────────────┘
```

```
SERVICES — pattern B, and the page reads as a price list
┌──────────────┬─────────────────────────────────────────────┐
│ Build        │ Business website      From NPR 30,000       │
│ (sticky)     │ A fast, clean website that tells customers  │
│              │ who you are … and works perfectly on phones.│
│ Websites,    │                                             │
│ stores and   │ You get            Not included    2–3 weeks│
│ systems —    │ up to 6–8 pages    content writing          │
│ built        │ mobile-responsive  photography              │
│ properly.    │ …                  logo design              │
│              │                                             │
│              │ [ Get a quote for a website ]               │
│              ├─────────────────────────────────────────────┤
│              │ Online store          From NPR 70,000       │
└──────────────┴─────────────────────────────────────────────┘
   Name left, price right, on one baseline. Price in Poppins 600 navy,
   "From" in 13px grey. 1px --rule between services. Border-radius 4px,
   NO shadow anywhere on the site.
```

**Why a price list.** The audience's first question is "how much". A restaurant menu and
a builder's quote are both left-name/right-price on a shared baseline, and that is the
vernacular this audience already reads prices in. Making price a first-class typographic
object — rather than a grey line at the bottom of a card — is the single most
audience-specific layout decision on the site.

**Cards.** Used in exactly one place: the service blocks, as 1px-ruled rows, radius 4px,
no shadow. Industries are a run of large type, not pills. Commitments are a 2×2 of
heading-plus-line separated by hairlines, not tiles. Bundle parts are three columns under
one top rule, not three cards.

---

## 5. Principles — what makes this site itself

**1. The amber square is a full stop, and a full stop means "finished".** It is the
company's own logo punctuation. It appears exactly three times: in the wordmark, at the
end of the hero tagline, and three times at once in "Build it. Grow it. Automate it." —
which is one gesture, not three decorations. It is never a bullet, never a divider,
never a badge. A company whose promise is *we finish the job and stay* gets a full stop
as its mark. That is the whole identity.

**2. Nine, where the content earns it.** A 3×3 field of nine small squares, the ninth
amber, sits beside the *nava* story on About and **nowhere else** — because that is the
only place where the page explains what nine means. A motif that appears where it is
explained is information; the same motif repeated as wallpaper is decoration.

**3. Price is typography.** See §4. Every price is a designed object.

**4. Answer first, then the detail.** Every service, every FAQ, every page opens with a
1–2 sentence direct answer. This is required for AI retrieval (§10 of the brief) but it
is also simply how you write for someone standing in their shop.

**5. Boldness is spent once — on the hero's type.** Everything after the hero is quiet:
one heading weight, one radius, one rule colour, no shadows, no gradients, no icons
except the two the header needs.

**6. Motion is one idea: things settling into place.** The hero's four elements settle in
once on load. Section headings and the four service groups settle in once on scroll.
Nothing else moves. Body copy, images, the footer and the form never animate.

---

## 6. Review against the brief and against the generic tells

I worked the brief through as if for any small B2B services company and listed what I'd
have produced by default. Three things came out generic. Each was changed.

**Changed 1 — the hero illustration is gone.** My first plan put a 3×3 field of nine
squares on the right of the hero, assembling on load. It was defensible (nine = the name)
but it was still *a decorative graphic occupying the right half of a hero*, which is the
default composition for every B2B site, and the motion brief already asks for the type
itself to settle into place. Two things doing the same job. Chanel's rule: removed the
accessory. The nine-square field moved to About, next to the sentence that explains it.
The hero is now type, two buttons, one line of fact, and one amber square — and it works
with no image at all, which the brief requires anyway.

**Changed 2 — no card grid for the four service groups.** Default: four identical rounded
cards, same soft shadow, an icon in each. That is tell #4 verbatim, and it also flattens
a real hierarchy — Build and Automate are the business; Support is a retainer. Replaced
with the statement/detail split and a price list, so the differences in the content are
visible in the layout.

**Changed 3 — body text is navy, not a neutral grey-black.** Default would have been
`#111` or `#1A1A1A` (tell #5). `#123566` at 9.6:1 is more accessible than most neutrals
and makes the whole page read as one brand temperature instead of "brand colour applied
to a grey site".

**Also deliberately avoided, per the tells list:** no cream/terracotta; no near-black +
acid accent; no hairline-rule broadsheet columns (rules appear only *between list items*,
never as a page frame); one border-radius, used once; no gradient washes; no ALL-CAPS
eyebrows; no middle-dot meta strings; no `→` on links; no `01/02/03` markers **except**
the five steps on About, which are a genuine sequence and are numbered for that reason;
no fade-up on every section (only headings and two specific groups); no stock photography
— every image slot degrades to a brand-coloured block, never a purchased smile.

**One risk I am accepting and will check in the browser:** the hairline leader between a
service name and its price could tip into twee menu pastiche. It gets screenshotted at
390px and 1280px and cut if it reads as costume rather than structure.

---

## 7. Quality floor (built in, not announced)

390px → 1280px with no horizontal scroll; every interactive element has a visible
3px focus ring — **navy on light grounds (9.6:1), amber on navy grounds (5.9:1)**;
the plan originally said amber against both, which was wrong, because amber on
white is 2.2:1; `prefers-reduced-motion`
renders everything at rest; 44px minimum tap targets; form labels permanent and visible;
one `h1` per page with headings in order; all colour pairs checked above.
