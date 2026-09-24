# NAP.md — the canonical strings

**NAP** = Name, Address, Phone. Search engines and AI answer engines decide
whether two mentions of a business are the *same* business by comparing these
strings. A "Rd." in one place and "Road" in another is enough to split one
business into two weaker entities.

**Copy and paste from this file. Do not retype, do not improve, do not
abbreviate.** If something here has to change, change it here first, then change
it everywhere on the list below on the same day.

These strings are generated from `src/data/site.js`, which is also what the
website, the JSON-LD and `llms.txt` read from. The website cannot drift; the
external profiles can, which is what this file is for.

---

## The strings

| Field | Exact value |
|---|---|
| **Business name** | `Nine Technology` |
| **Legal name** (only where a legal name is asked for) | `Nine Technology Pvt. Ltd.` |
| **Nepali name** | `नाईन टेक्नोलोजी प्रा.लि.` |
| **Address, one line** | `Lazimpat Road, Ward No. 2, Kathmandu 44600, Nepal` |
| **Street** | `Lazimpat Road, Ward No. 2` |
| **City** | `Kathmandu` |
| **Postal code** | `44600` |
| **Country** | `Nepal` |
| **Phone** | `+977 9843325804` |
| **WhatsApp** | same number, `+977 9843325804` |
| **Email** | `info@ninetechsystem.com` |
| **Website** | `https://ninetechsystem.com` |
| **Coordinates** | `27.724562, 85.322562` |
| **Hours** | `Sunday–Friday 10:00–17:00, Saturday closed` |
| **Founded** | `2026` |
| **Tagline** | `Your ambition, our engineering.` |

**Notes that matter more than they look:**

- The phone is written `+977 9843325804` — plus sign, country code, **one
  space**, then the number. Not `+977-9843325804`, not `977 9843325804`, not
  `9843325804`.
- The dash in the hours is an en dash (`–`), not a hyphen.
- The tagline keeps its capitalisation and its full stop. Always.
- `Ward No. 2` — capital W, capital N, full stop after No, then the numeral.

---

## One-line description

> Nine Technology builds websites, online stores, business software and AI
> automation for businesses in Kathmandu, then markets them and keeps them
> running.

## Short description (for profiles with a ~250 character limit)

> Nine Technology is an IT and software company on Lazimpat Road, Kathmandu. We
> build websites, online stores, booking systems and business software, bring
> customers to them with search and social, and automate the repeat work behind
> them. Scope and price in writing, 30 days support on every project.

## Service names — use these words, in this order

Use the same names everywhere. A service called "Web Design" on Facebook and
"Business website" on the site is two services to a machine.

**Build** — Business website · Online store · Booking and management systems ·
Business software · Portfolio and personal sites · Mobile apps

**Grow** — Search visibility (SEO, AEO, GEO) · Social media management ·
Content and video production · Paid advertising

**Automate** — AI chat and enquiry handling · Workflow automation ·
AI agents and internal tools

**Support** — Domain and hosting · Maintenance and updates · Monthly care plans

---

## Use the same profile picture everywhere

Upload `assets/brand/social/avatar-social-navy-bg-512.png` as the profile picture
on **all four** social accounts and on the Google Business Profile. Same image,
same crop, everywhere. A business that looks different on each platform reads as
several weak businesses rather than one, to people and to search engines alike.

---

## Where these strings must appear identically

Tick each one off. This is a single afternoon's work and it is the highest-value
SEO the company will do this year.

- [ ] **Google Business Profile** — the most important one. Name, address, phone,
      hours, website, service list, description. Once verified, paste the profile
      URL into the site footer (see `DEPLOY.md`).
- [ ] **Facebook** — https://www.facebook.com/profile.php?id=61594083495632
- [ ] **Instagram** — https://www.instagram.com/ninetechsystem/ (bio and contact
      fields)
- [ ] **LinkedIn** — https://www.linkedin.com/company/143904402/
- [ ] **TikTok** — https://www.tiktok.com/@ninetechnologies1
- [ ] Email signatures for both directors
- [ ] Invoices, quotations and contracts
- [ ] The office signboard, business cards and any printed material
- [ ] Any Nepali business directory the company gets listed in

## What must never go on any of them

Registration number, PAN, VAT number, share capital, shareholding, incorporation
documents, bank account numbers, eSewa or Khalti merchant IDs, payment QR codes,
the directors' personal mobile numbers or personal email addresses, staff names
beyond the two directors, team size, or client names without written permission.

The same rule applies to a directory listing, a Facebook "About" box and a
WhatsApp Business profile as applies to the website.
