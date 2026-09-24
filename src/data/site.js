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

export const steps = [
  { title: 'We understand the business', body: 'A consultation, by call or at your office: what you sell, who buys it, and where the work piles up. It carries no cost and no obligation.' },
  { title: 'Scope and price in writing', body: 'What is included, what is not, what it costs and how long it takes. You approve it before anything starts.' },
  { title: 'We build it', body: 'You see progress as it happens, not at the end. Changes inside the agreed scope are part of the job.' },
  { title: 'We launch it', body: 'We hand over admin access and train your team on it. Everything is registered in your name.' },
  { title: 'We support it monthly', body: 'Support is included after launch, 30 days on most projects. After that, a care plan or call us when you need us.' },
];
