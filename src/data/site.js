/**
 * Single source of truth for every published fact on the site.
 *
 * Page copy, JSON-LD, llms.txt and NAP.md all read from here, so the name,
 * address, phone, hours and service names stay character-for-character
 * identical everywhere — which is what AI search engines check when they
 * decide whether two mentions are the same business.
 *
 * Nothing in this file may be a registration number, PAN/VAT, bank detail,
 * personal contact detail or client name. See CLAUDE.md section 2.
 */

export const site = {
  name: 'Nine Technology',
  legalName: 'Nine Technology Pvt. Ltd.',
  nepaliName: 'नाईन टेक्नोलोजी प्रा.लि.',
  url: 'https://ninetechsystem.com',
  tagline: 'Your ambition, our engineering.',
  founded: '2026',

  // Canonical NAP strings. Change here, change everywhere.
  phoneDisplay: '+977 9843325804',
  phoneHref: 'tel:+9779843325804',
  whatsapp: 'https://wa.me/9779843325804?text=Hi%20Nine%20Technology',
  email: 'info@ninetechsystem.com',
  emailHref: 'mailto:info@ninetechsystem.com',
  address: {
    street: 'Lazimpat Road, Ward No. 2',
    city: 'Kathmandu',
    postalCode: '44600',
    country: 'Nepal',
    display: 'Lazimpat Road, Ward No. 2, Kathmandu 44600, Nepal',
  },
  geo: { lat: 27.724562, lng: 85.322562 },
  mapLink: 'https://www.google.com/maps/search/?api=1&query=27.724562,85.322562',
  hours: 'Sunday–Friday 10:00–17:00, Saturday closed',
  hoursShort: 'Sunday–Friday, 10am–5pm',
  opens: '10:00',
  closes: '17:00',
  // The one promise on the site that needs a person to keep it.
  replyTime: 'within minutes',
  replyPromise: 'We reply within minutes, Sunday–Friday, 10am–5pm.',
  areasServed: ['Kathmandu', 'Lalitpur', 'Bhaktapur'],

  social: [
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61594083495632' },
    { name: 'Instagram', url: 'https://www.instagram.com/ninetechsystem/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/143904402/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@ninetechnologies1' },
  ],
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const people = [
  {
    name: 'Anis Raut',
    title: 'Managing Director',
    slot: 'portrait-anis',
  },
  {
    name: 'Raju Thapa',
    title: 'Director',
    slot: 'portrait-raju',
  },
];

export const commitments = [
  {
    title: 'Scope and price in writing, before we start',
    body: 'You approve a written scope and a fixed price before any work begins. If the scope changes, we quote the change first.',
  },
  {
    title: 'You get admin access to everything',
    body: 'Domain, hosting, logins and files are registered in your name and handed over with training. Not held in ours.',
  },
  {
    title: 'Support included on every project',
    body: '30 days after launch on websites and stores, 60 on software and apps, 14 on a landing page. Included in the price, not sold back to you afterwards.',
  },
  {
    title: 'We stay after launch',
    body: 'One team builds it, markets it and maintains it. One invoice, one number to call.',
  },
];

export const industries = [
  'Restaurants and cafés',
  'Hotels and resorts',
  'Travel and trekking',
  'Schools and colleges',
  'Clinics',
  'Retail and e-commerce',
  'Distributors and wholesalers',
];

export const businessTypes = [
  'Restaurant or café',
  'Hotel or resort',
  'Travel or trekking agency',
  'School or college',
  'Clinic or hospital',
  'Shop or online store',
  'Distributor or wholesaler',
  'Something else',
];

/**
 * How we work: six steps, in the founder's words. One source for the Home
 * section, the /how-we-work page, About, the Services hub and llms.txt.
 * `short` is the one-line version; `get` and `bring` are both sides of each
 * step, so the client knows what they receive and what we need from them.
 */
export const promise = 'A written scope. A fixed price. Real dates. Signed before we start — and we stick to it. That’s the whole deal.';

export const process = [
  {
    icon: 'chat',
    title: 'We understand your problem',
    short: 'A conversation about your business: what’s slow, what’s manual, what you actually need. No pitch.',
    body: 'We start with a call or a meeting. There’s no charge for it. We ask about your business — what’s slow, what’s manual, what you actually need. No pitch, just questions. We’d rather build the right thing than the expensive thing.',
    get: 'A clear picture of the problem, and our honest view of what would fix it. Sometimes that’s less than you expected.',
    bring: 'How the business runs today and what you want to change. Examples help: the Excel file, the WhatsApp thread, a website you like.',
  },
  {
    icon: 'sheet',
    title: 'You get a written proposal and a fixed price',
    short: 'What we’ll build, what’s included and what isn’t, the dates, and one fixed price. In writing, before any work.',
    body: 'We send you a clear document: the problem, exactly what we’ll build, what’s included and what’s not, the timeline with dates, and a fixed price. In writing, before any work begins. You know the full cost upfront — no surprises later.',
    get: 'The proposal: scope, what is and isn’t included, dated milestones, and the price.',
    bring: 'Your questions. Read it properly, and ask about anything that isn’t clear before you agree to it.',
  },
  {
    icon: 'lock',
    title: 'We agree and sign',
    short: 'The price, the work and the dates are locked. Anything extra is quoted and approved by you first.',
    body: 'Once you’re happy with the plan, we both sign it. That signed scope is our promise — the price, the work, and the dates are locked. If you later want something extra, we quote it first and you approve it before we build it. Nothing is added to your bill without your say-so.',
    get: 'A signed scope. The price, the work and the dates can’t change without your written approval.',
    bring: 'Your signature, and the first payment set out in the proposal.',
  },
  {
    icon: 'website',
    title: 'We build — and you watch it happen',
    short: 'You see progress as it comes together, and approve each major stage before we move on.',
    body: 'Once we start, you see progress as it comes together. You approve each major stage before we move to the next. No disappearing for weeks and revealing at the end — you’re never left wondering.',
    get: 'Regular progress you can see and try, and a sign-off at each major stage.',
    bring: 'Content on time (text, photos, logins) and feedback at each sign-off. When projects run late, this is usually why, so we agree dates for it up front.',
  },
  {
    icon: 'launch',
    title: 'We launch and hand over',
    short: 'Tested and live, everything registered in your name, and your team trained to use it.',
    body: 'We put it live, test everything, and hand over everything in your name — domain, hosting, logins, files. Then we train your team to use it. It’s yours, fully.',
    get: 'The live website or system, every login and file in your name, and a training session for your team.',
    bring: 'A final check before it goes live, and the people who’ll use it at the training.',
  },
  {
    icon: 'maintenance',
    title: 'We stay',
    short: 'Support is included after launch, and when you need something, a person answers.',
    body: 'Every project includes support after launch. We don’t vanish once you’ve paid. When you need something, there’s a person who answers — not a ticket that disappears.',
    get: 'Support after launch: 14 days on a landing page, 30 on websites and stores, 60 on software and apps. After that, a care plan if you want one.',
    bring: 'Tell us when something’s wrong. Call, WhatsApp or email, and a person picks it up.',
  },
];

/** Trust badges shown with the process. */
export const trustBadges = [
  { icon: 'sheet', value: 'Fixed price, in writing', label: 'Before any work starts' },
  { icon: 'lock', value: 'Everything in your name', label: 'Domain, hosting, logins, files' },
  { icon: 'chat', value: 'We reply within minutes', label: 'Sunday–Friday, 10am–5pm' },
  { icon: 'maintenance', value: 'Support after every launch', label: 'Then a care plan if you want one' },
];
