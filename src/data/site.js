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
    title: '30 days support on every project',
    body: 'Included in the price, not sold back to you afterwards. Business software gets 60 days.',
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

/** The four groups shown on Home, expanded in full on Services. */
export const groups = [
  {
    id: 'build',
    name: 'Build',
    promise: 'Websites, stores and systems — built properly, handed over fully.',
    summary: 'Websites, online stores, booking systems and business software.',
    slot: 'services-build',
    services: [
      {
        name: 'Business website',
        answer: 'A fast, clean website that tells customers who you are, what you do, and how to reach you — and works perfectly on phones.',
        includes: ['Up to 6–8 pages', 'Mobile-responsive', 'Contact form and WhatsApp', 'Basic on-page SEO', 'Google Business Profile setup', 'Admin access and training', '30 days support'],
        excludes: ['Content writing beyond structure', 'Photography', 'Logo design'],
        timeline: '2–3 weeks',
        cta: { label: 'Get a quote for a website', href: '/contact?need=website' },
      },
      {
        name: 'Online store',
        answer: 'Sell online, take payments through eSewa, Khalti and Fonepay, and manage every order from your phone.',
        includes: ['Product catalogue', 'Cart and checkout', 'Local payments', 'Delivery zones', 'Order dashboard', 'Training', '30 days support'],
        excludes: ['Product photography', 'Product descriptions', 'Courier contracts'],
        timeline: '3–5 weeks',
        cta: { label: 'Get a quote for a store', href: '/contact?need=store' },
      },
      {
        name: 'Booking and management systems',
        answer: 'Appointments, reservations and enquiries in one system instead of a notebook and three phone numbers.',
        includes: ['Booking flows', 'Calendar', 'Staff logins', 'Notifications', 'Dashboard', 'Training', '30 days support'],
        excludes: [],
        timeline: '4–8 weeks',
        cta: { label: 'Book a free scoping call', href: '/contact?need=booking-system' },
      },
      {
        name: 'Business software',
        answer: 'Billing, inventory, records and reports — software that fits how your business actually runs, replacing the Excel files.',
        includes: ['Scoped modules in writing', 'User roles', 'Reports', 'One round of data migration', 'Training', '60 days support'],
        excludes: [],
        timeline: '6–12 weeks',
        cta: { label: 'Book a free scoping call', href: '/contact?need=business-software' },
      },
      {
        name: 'Portfolio and personal sites',
        answer: 'A sharp one-page site for your work — live in a week.',
        includes: [],
        excludes: [],
        timeline: '3–7 days',
        cta: { label: 'Get a quote for a one-page site', href: '/contact?need=portfolio' },
      },
      {
        name: 'Mobile apps',
        answer: 'Android and iOS apps when your business genuinely needs one. Often a progressive web app does the job faster and cheaper, and we will tell you honestly which you need.',
        includes: [],
        excludes: [],
        timeline: 'Scoped per project',
        cta: { label: 'Ask about an app', href: '/contact?need=mobile-app' },
      },
    ],
  },
  {
    id: 'grow',
    name: 'Grow',
    promise: 'A website nobody visits earns nothing. We bring customers to what we build, and we report in leads, not likes.',
    summary: 'Search visibility, social media, video production and paid ads.',
    slot: 'services-grow',
    services: [
      {
        name: 'Search visibility (SEO, AEO, GEO)',
        answer: 'Show up when customers search — on Google, and inside AI tools like ChatGPT where people now ask for recommendations.',
        includes: ['Technical fixes', 'On-page optimisation', 'Content plan', 'Google Business Profile management', 'Answer-engine structuring', 'Monthly report on rankings and enquiries'],
        excludes: [],
        note: 'Six-month minimum. Nobody can guarantee a Google ranking, and we do not.',
        timeline: 'Monthly, six-month minimum',
        cta: { label: 'Ask about search visibility', href: '/contact?need=seo' },
      },
      {
        name: 'Social media management',
        answer: 'Your Facebook, Instagram and TikTok handled — planned, posted and answered.',
        includes: ['Content plan', 'Posting', 'Comment and message replies', 'Monthly report'],
        excludes: ['Ad spend, which is always separate'],
        note: 'Exact post counts are written into every contract.',
        timeline: 'Monthly',
        cta: { label: 'Ask about social media', href: '/contact?need=social' },
      },
      {
        name: 'Content and video production',
        answer: 'We come to your business and shoot it properly — real camera, real crew — then cut it into reels and ads people actually watch.',
        includes: ['Shoot day with crew', '6–10 finished pieces per shoot day', 'Editing and captions'],
        excludes: [],
        note: 'Shoot days are capped in writing. Where a shoot is not possible we produce video with AI, faster and at lower cost: real place means real footage, AI for explainers, graphics and variations.',
        timeline: 'Shoot to delivery in 1–2 weeks',
        cta: { label: 'Ask about a shoot', href: '/contact?need=video' },
      },
      {
        name: 'Paid advertising',
        answer: 'Meta, Google and TikTok ads run properly and reported in cost per enquiry.',
        includes: ['Campaign setup', 'Creative direction', 'Weekly optimisation', 'Monthly report on cost per enquiry'],
        excludes: ['Ad spend, which is your money and is paid directly to the platform'],
        timeline: 'Monthly',
        cta: { label: 'Ask about ads', href: '/contact?need=ads' },
      },
    ],
  },
  {
    id: 'automate',
    name: 'Automate',
    promise: 'The work you repeat every day — we build systems that do it for you. This is what we do that almost nobody else in Nepal does.',
    summary: 'AI chat handling, workflow automation and custom AI agents.',
    slot: 'services-automate',
    services: [
      {
        name: 'AI chat and enquiry handling',
        answer: 'Every message on WhatsApp, Messenger and your website answered instantly, day and night, in English and Nepali, with real enquiries passed to your team.',
        includes: ['Setup on all three channels', 'English and Nepali replies', 'Handover rules to your staff', 'Monthly tuning'],
        excludes: [],
        timeline: '2–3 weeks to set up',
        cta: { label: 'Ask about AI chat', href: '/contact?need=ai-chat' },
      },
      {
        name: 'Workflow automation',
        answer: 'The copying, forwarding, reminding and reporting your staff do by hand — connected and automated.',
        includes: ['Enquiry to sheet to auto-reply to daily summary', 'Order to invoice to delivery note', 'Fee reminder cycles', '8pm daily sales report'],
        excludes: [],
        timeline: '2–4 weeks to set up',
        cta: { label: 'Ask about automation', href: '/contact?need=automation' },
      },
      {
        name: 'AI agents and internal tools',
        answer: 'Custom AI that does real work inside your business, built around your actual processes.',
        includes: [],
        excludes: [],
        note: 'It starts with a free process review: a 30 to 60 minute walkthrough of your daily work, after which you get a written scope and price.',
        timeline: 'Scoped after the process review',
        cta: { label: 'Book a free process review', href: '/contact?need=ai-agents' },
      },
    ],
  },
  {
    id: 'support',
    name: 'Support',
    promise: 'We do not disappear after launch.',
    summary: 'Domain, hosting, maintenance and monthly care plans.',
    slot: 'services-support',
    services: [
      {
        name: 'Domain and hosting',
        answer: 'Domain, hosting, email and SSL — set up, renewed on time, and in your name, not held in ours.',
        includes: ['Domain registration and renewal', 'Hosting', 'Business email', 'SSL certificate'],
        excludes: [],
        timeline: 'Set up in 1–2 days',
        cta: { label: 'Ask about hosting', href: '/contact?need=hosting' },
      },
      {
        name: 'Maintenance and updates',
        answer: 'Updates, security, backups and small fixes handled before they become problems.',
        includes: ['Software updates', 'Security patches', 'Backups', 'Small fixes'],
        excludes: [],
        timeline: 'Monthly',
        cta: { label: 'Ask about maintenance', href: '/contact?need=maintenance' },
      },
    ],
  },
];

/** The three care plans, shown as a comparison table on Services. */
export const carePlans = {
  rows: ['Hosting, SSL and backups', 'Software updates', 'Small changes included', 'Response time', 'Monthly report'],
  plans: [
    { name: 'Essential', values: ['Yes', 'Yes', '2 a month', 'Within 48 hours', 'No'] },
    { name: 'Standard', values: ['Yes', 'Yes', '5 a month', 'Within 24 hours', 'Yes'] },
    { name: 'Complete', values: ['Yes', 'Yes', '10 a month', 'Same day', 'Yes, with priority'] },
  ],
};

/** Answer-first by design: sentence one answers the question outright. */
export const faqs = [
  {
    q: 'How much does a website cost in Nepal?',
    a: 'It depends on what the site has to do, and we quote every project individually after a free scoping call. What moves the price is the number of pages, whether you need payments or logins, whether the content already exists, and how much of the work is design rather than assembly. You get a fixed price in writing before anything starts, and it does not change unless you change the scope. Tell us what you need and we will scope it and come back with a written price.',
  },
  {
    q: 'How long does a website take?',
    a: 'A business website takes 2 to 3 weeks, and a one-page site takes 3 to 7 days. Online stores take 3 to 5 weeks, booking systems 4 to 8 weeks, and business software 6 to 12 weeks. The clock starts when we have your content and approval, not when you sign.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. Every project includes 30 days of support after launch at no extra cost, and business software includes 60 days. After that you can move to a monthly care plan, or simply call us when you need something. There is no obligation to keep paying us.',
  },
  {
    q: 'Will I be able to update the site myself?',
    a: 'Yes. You get admin access to everything we build, plus a training session and a short written guide. Text, photos, prices and products are yours to change. For structural changes, that is what the care plans and hourly work are for.',
  },
  {
    q: 'Do you build e-commerce with eSewa and Khalti?',
    a: 'Yes. We build online stores that take payments through eSewa, Khalti and Fonepay, and cash on delivery where you want it. You will need your own merchant account with each provider; we handle the integration and test it end to end before launch.',
  },
  {
    q: 'What is AI automation and does my business need it?',
    a: 'AI automation means software doing the repetitive work your staff currently do by hand — answering the same WhatsApp questions, copying orders into a sheet, sending fee reminders, typing the daily sales report. You need it if your team spends more than an hour a day on work that follows the same steps every time. We start with a free 30 to 60 minute process review and tell you honestly if the answer is no.',
  },
  {
    q: 'Do you guarantee Google rankings?',
    a: 'No, and neither can anyone else. Google does not sell or promise positions, so any company that guarantees a number one ranking is either guessing or misleading you. What we commit to is the work — technical fixes, on-page optimisation, content, Google Business Profile — and a monthly report showing rankings and, more importantly, how many enquiries came in.',
  },
  {
    q: 'Do you work outside Kathmandu?',
    a: 'Yes. We meet clients in person across Kathmandu, Lalitpur and Bhaktapur, and we work remotely with businesses anywhere in Nepal. Everything except a video shoot can be done remotely. For a shoot outside the valley, travel is quoted separately.',
  },
];

export const steps = [
  { title: 'We understand the business', body: 'A call or a visit. What you sell, who buys it, and where the work piles up. No charge, no obligation.' },
  { title: 'Scope and price in writing', body: 'What is included, what is not, what it costs and how long it takes. You approve it before anything starts.' },
  { title: 'We build it', body: 'You see progress as it happens, not at the end. Changes inside the agreed scope are part of the job.' },
  { title: 'We launch it', body: 'We hand over admin access and train your team on it. Everything is registered in your name.' },
  { title: 'We support it monthly', body: '30 days included on every project. After that, a care plan or call us when you need us.' },
];
