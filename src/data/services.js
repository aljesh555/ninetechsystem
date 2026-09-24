/**
 * Every service, price, feature and FAQ on the site, in one place.
 *
 * The /services hub, the six detail pages, the contact form's "Service"
 * list, the JSON-LD and llms.txt all read from this file. To change a price,
 * change the number here and rebuild; nothing else needs touching.
 *
 * Prices are in NPR and exclude 13% VAT. A price is written as
 *   { from: 20000 }                    -> "From NPR 20,000"
 *   { from: 20000, to: 35000 }         -> "NPR 20,000 – 35,000"
 *   { from: 20000, per: 'month' }      -> "From NPR 20,000/mo"
 * with `per` one of 'month', 'year', 'shoot' or 'setup'. A service with no
 * published price has `price: null` and a `priceNote` instead.
 */

export const VAT_NOTE = 'Prices exclude 13% VAT.';

/** Nepali digit grouping: 20,000 · 1,20,000 · 2,00,000. */
export const npr = (n) => n.toLocaleString('en-IN');

const PER = { month: '/mo', year: '/yr', shoot: '/shoot', setup: ' setup' };

/** "From NPR 20,000/mo", "NPR 20,000 – 35,000", or the service's note. */
export function priceLabel(price, note = 'Quoted') {
  if (!price) return note;
  const per = PER[price.per] ?? '';
  if (price.to) return `NPR ${npr(price.from)} – ${npr(price.to)}${per}`;
  if (price.exact) return `NPR ${npr(price.from)}${per}`;
  return `From NPR ${npr(price.from)}${per}`;
}

/* --------------------------------------------------------------------------
   How we work, and what every project includes. Shown on the hub and on the
   software page.
   -------------------------------------------------------------------------- */

export const howWeWork = [
  { title: 'Consultation', body: 'We study how your business operates and what it needs.' },
  { title: 'Proposal in writing', body: 'Scope, fixed price and timeline, approved by you before work begins.' },
  { title: 'Delivery in stages', body: 'You review working progress at every stage, not only at the end.' },
  { title: 'Launch and handover', body: 'Everything registered in your name, with training for your team.' },
  { title: 'Support', body: 'Included after launch, then an optional monthly care plan.' },
];

/* --------------------------------------------------------------------------
   The thirteen services. `id` is also the contact form's ?need= value.
   -------------------------------------------------------------------------- */

export const services = {
  website: {
    name: 'Website',
    short: 'Landing pages, business sites and online stores. Custom design, fast on Nepali networks, found on Google and AI search.',
    price: { from: 20000 },
    href: '/services/website',
    icon: 'website',
  },
  software: {
    name: 'Software',
    short: 'Custom systems that replace the Excel files and paper registers — portals, dashboards, automation, integrations.',
    price: null,
    priceNote: 'By proposal',
    href: '/services/software',
    icon: 'software',
  },
  'mobile-app': {
    name: 'App',
    short: 'Android and iPhone apps for the phones your customers actually own — and honest advice when a web app is the better choice.',
    price: null,
    priceNote: 'By proposal',
    href: '/services/app',
    icon: 'app',
  },
  seo: {
    name: 'Search visibility',
    short: 'Found on Google and inside AI tools like ChatGPT. SEO, AEO and GEO on a six-month plan.',
    price: { from: 20000, per: 'month' },
    href: '/services/grow#seo',
    icon: 'search',
  },
  social: {
    name: 'Social media',
    short: 'Facebook, Instagram and TikTok planned, posted and answered. Exact post counts in writing.',
    price: { from: 18000, per: 'month' },
    href: '/services/grow#social',
    icon: 'social',
  },
  video: {
    name: 'Content & video',
    short: 'We come to your business, shoot it with a real crew, and cut reels and ads that get watched.',
    price: { from: 25000, per: 'shoot' },
    href: '/services/grow#video',
    icon: 'video',
  },
  ads: {
    name: 'Paid ads',
    short: 'Meta, Google and TikTok ads run properly and reported in cost per enquiry.',
    price: { from: 15000, per: 'month' },
    href: '/services/grow#ads',
    icon: 'ads',
  },
  'ai-chat': {
    name: 'AI chat & enquiries',
    short: 'WhatsApp, Messenger and website messages answered instantly, day and night, in English and Nepali.',
    price: { from: 40000, per: 'setup' },
    href: '/services/automate#ai-chat',
    icon: 'chat',
  },
  automation: {
    name: 'Workflow automation',
    short: 'Enquiries to sheets, orders to invoices, reminders and reports — connected and running by themselves.',
    price: { from: 25000, per: 'setup' },
    href: '/services/automate#automation',
    icon: 'workflow',
  },
  'ai-agents': {
    name: 'AI agents & tools',
    short: 'Custom AI that does real work inside your business, built around your actual process.',
    price: null,
    priceNote: 'Process assessment',
    href: '/services/automate#ai-agents',
    icon: 'agent',
  },
  hosting: {
    name: 'Domain & hosting',
    short: 'Set up, renewed on time, and in your name — not held in ours.',
    price: { from: 8000, per: 'year' },
    href: '/services/support#hosting',
    icon: 'hosting',
  },
  maintenance: {
    name: 'Maintenance',
    short: 'Updates, security, backups and small fixes before they become problems.',
    price: { from: 4000, per: 'month' },
    href: '/services/support#maintenance',
    icon: 'maintenance',
  },
  'care-plan': {
    name: 'Care plans',
    short: "Three levels of monthly cover, so you know what's handled and how fast we answer.",
    price: { from: 5000, per: 'month' },
    href: '/services/support#care-plans',
    icon: 'care',
  },
};

/** The four groups on the hub (and the Home overview). */
export const groups = [
  {
    id: 'build',
    name: 'Build',
    tagline: 'Websites, software and apps — built properly, handed over fully.',
    summary: 'Websites, online stores, custom software and mobile apps.',
    services: ['website', 'software', 'mobile-app'],
  },
  {
    id: 'grow',
    name: 'Grow',
    tagline: 'A website nobody visits earns nothing. We bring customers to it and report in enquiries, not likes.',
    summary: 'Search visibility, social media, video production and paid ads.',
    services: ['seo', 'social', 'video', 'ads'],
  },
  {
    id: 'automate',
    name: 'Automate',
    tagline: 'The work you repeat every day, done by software instead.',
    summary: 'AI chat handling, workflow automation and custom AI agents.',
    services: ['ai-chat', 'automation', 'ai-agents'],
  },
  {
    id: 'support',
    name: 'Support',
    tagline: 'We stay accountable after launch.',
    summary: 'Domain, hosting, maintenance and monthly care plans.',
    services: ['hosting', 'maintenance', 'care-plan'],
  },
];

/** Plain-list SEO block on the hub. */
export const popularRequests = [
  'Business website design and development',
  'E-commerce store with eSewa and Khalti',
  'Restaurant, hotel and travel agency websites',
  'School and college websites with admissions',
  'Booking systems for clinics, salons and hotels',
  'Billing, inventory and POS software',
  'WhatsApp chatbot for customer enquiries',
  'Social media management and reels',
  'SEO and showing up in ChatGPT search',
  'Website speed fixes and redesigns',
];

/** "How to choose" on the hub. */
export const howToChoose = [
  { q: 'Need customers?', a: 'Website + Search visibility', links: ['/services/website', '/services/grow#seo'] },
  { q: 'Need a system?', a: 'Software', links: ['/services/software'] },
  { q: 'More messages than your team can answer?', a: 'AI chat & Workflow automation', links: ['/services/automate'] },
  { q: 'A website that is slow or out of date?', a: 'Redesign and rebuild, without losing your search rankings', links: ['/contact?need=website'] },
];

/* --------------------------------------------------------------------------
   /services/website
   -------------------------------------------------------------------------- */

export const website = {
  offers: [
    {
      id: 'landing',
      highlights: ['Custom single-scroll design', 'Contact form and WhatsApp', 'Google Business Profile setup'],
      name: 'Landing / single page',
      short: 'Landing page',
      price: { from: 20000, to: 35000 },
      time: '3–7 days',
      intro: "A focused, single-scroll site to get you online fast. For a campaign, a launch, a professional's profile, or a business that wants to be online this week and grow later.",
      groups: [
        { name: 'Design', icon: 'website', items: ['Custom-designed page — built for your brand, not a template', 'Mobile-responsive, works on every phone', 'Social media links'] },
        { name: 'Performance and search', icon: 'gauge', items: ['Fast loading, built for Nepali networks', 'Search-ready — built for Google and AI search (SEO, AEO, GEO)', 'Google Business Profile setup'] },
        { name: 'Features', icon: 'chat', items: ['Contact form + WhatsApp button', 'Admin access to edit text and images'] },
        { name: 'Security, ownership and support', icon: 'lock', items: ['SSL secure (https)', 'Everything registered in your name', '14 days support'] },
      ],
      note: 'Content writing and photography can be arranged separately.',
      cta: { label: 'Request a proposal', need: 'landing' },
    },
    {
      id: 'business',
      highlights: ['5–8 custom-designed pages', 'CMS, blog and gallery', 'Full SEO, AEO and GEO'],
      name: 'Business website',
      short: 'Business website',
      price: { from: 50000, to: 120000 },
      time: '2–3 weeks',
      intro: 'A complete, custom-built website engineered to load fast, rank on Google and AI search, and turn visitors into enquiries.',
      groups: [
        { name: 'Design and content', icon: 'website', items: ['Custom design from scratch — built for your brand, never a template', '5–8 pages, expandable', 'Blog / news section', 'Photo gallery'] },
        { name: 'Performance and search', icon: 'search', items: ['Mobile-first, tested on real Nepali devices and networks', 'Fast loading — Core Web Vitals optimised', 'Full SEO + AEO + GEO — found on Google and in AI search (ChatGPT, Perplexity, Gemini)', 'Structured data / schema markup built in', 'Analytics + Search Console setup — see your visitors and search performance'] },
        { name: 'Features and integrations', icon: 'workflow', items: ['CMS — edit your own text, images, pages and content', 'Contact form + WhatsApp integration', 'Google Maps integration', 'Social media integration', 'Google Business Profile setup'] },
        { name: 'Security, ownership and support', icon: 'lock', items: ['SSL secure (https)', 'Speed & security hardening', 'Everything registered in your name', 'Admin training session', '30 days post-launch support'] },
      ],
      note: 'Content writing, professional photography and bilingual (English + Nepali) can be arranged separately.',
      cta: { label: 'Request a proposal', need: 'website' },
    },
    {
      id: 'ecommerce',
      highlights: ['eSewa, Khalti and Fonepay', 'Order dashboard on your phone', 'Stock and delivery zones'],
      name: 'E-commerce / online store',
      short: 'E-commerce',
      tableName: 'E-commerce store',
      price: { from: 90000, to: 250000 },
      time: '3–6 weeks',
      intro: 'A complete online store where customers browse, pay, and you manage every order from your phone.',
      lead: 'Everything in the business website, plus:',
      clusters: [
        {
          name: 'Store & products', icon: 'store',
          items: ['Custom store design', 'Product catalogue (categories, images, descriptions)', 'Product variants (size, colour, options)', 'Product search & filters', 'Related / featured products'],
        },
        {
          name: 'Buying & payment', icon: 'coins',
          items: ['Shopping cart & checkout', 'eSewa, Khalti & Fonepay integration', 'Cash-on-delivery', 'Discount codes & offers', 'Secure checkout (SSL)'],
        },
        {
          name: 'Orders & delivery', icon: 'workflow',
          items: ['Order management dashboard — manage every order from your phone', 'Delivery zones & charges by area', 'Automatic order confirmation by WhatsApp, SMS or email', 'Order status tracking for customers', 'Abandoned-cart recovery'],
        },
        {
          name: 'Customers & stock', icon: 'users',
          items: ['Customer accounts & order history', 'Stock / inventory management with low-stock alerts', 'Customer contact capture for future marketing'],
        },
        {
          name: 'Growth & management', icon: 'gauge',
          items: ['Full SEO + AEO + GEO for your products', 'Sales & analytics reports', 'CMS — add and edit products yourself', 'Admin training session', '30 days support'],
        },
      ],
      addons: ['Live courier integration (Pathao / Nepal Can Move)', 'Multi-vendor marketplace', 'Bank & international payments', 'Product photography & bulk data entry'],
      scope: [
        "Payment integration is included. You will need your own eSewa/Khalti/Fonepay merchant accounts — we guide you through setting them up. Their one-time setup fee (around NPR 20,000–30,000) and 1–2% per-transaction fees are paid by you directly to them, not to us.",
        'Order status tracking is included. Live courier tracking with Pathao or Nepal Can Move can be added — a merchant account with the courier is required.',
      ],
      cta: { label: 'Request a proposal', need: 'store' },
    },
    {
      id: 'booking',
      highlights: ['Booking and enquiry flows', 'Staff logins and calendar', 'Email and WhatsApp alerts'],
      name: 'Booking & web systems',
      short: 'Booking & web systems',
      tableName: 'Booking / web system',
      price: null,
      priceNote: 'By proposal',
      time: '4–8 weeks',
      intro: 'Appointments, reservations and enquiries in one system instead of a notebook and three phone numbers. For clinics, salons, hotels, trekking agencies, training centres.',
      groups: [
        { name: 'Included', icon: 'calendar', items: ['Booking / enquiry flows', 'Calendar & availability', 'Staff logins', 'Notifications (email/WhatsApp)', 'Dashboard', 'Training', '30 days support'] },
      ],
      cta: { label: 'Request a proposal', need: 'booking-system' },
    },
  ],
  facts: [
    { icon: 'coins', value: 'From NPR 20,000', label: 'Starting price' },
    { icon: 'calendar', value: '3 days – 6 weeks', label: 'Delivery, by format' },
    { icon: 'lock', value: 'In your name', label: 'Domain, hosting and logins' },
    { icon: 'maintenance', value: '14–30 days', label: 'Post-launch support' },
  ],
  standards: [
    { icon: 'website', name: 'Custom design', body: 'Designed for your brand and your customers. We do not resell templates.' },
    { icon: 'gauge', name: 'Performance on real networks', body: 'Built and tested for mid-range phones and Nepali mobile data, where most of your visitors are.' },
    { icon: 'search', name: 'Visible to search and AI', body: 'Structured for Google and for AI assistants such as ChatGPT, so customers can find you either way.' },
    { icon: 'lock', name: 'Secure by default', body: 'HTTPS on every site, hardened configuration and no unnecessary plugins.' },
    { icon: 'hosting', name: 'Ownership', body: 'Domain, hosting and every login registered in your name — never held by us.' },
    { icon: 'maintenance', name: 'Training and support', body: 'Your team is trained to manage the site, and support is included after launch.' },
  ],
  process: [
    { name: 'Consultation', body: 'We learn about the business, its customers and any site you have today.' },
    { name: 'Proposal', body: 'The recommended format, scope, fixed price and timeline, in writing.' },
    { name: 'Design', body: 'The design is presented and approved before development begins.' },
    { name: 'Development', body: 'Built, tested on real phones, and reviewed with you in stages.' },
    { name: 'Launch and handover', body: 'Live on your domain, in your name, with training for your team.' },
  ],
  priceFootnote: 'Prices exclude 13% VAT. At the consultation we confirm a fixed price within the range; once agreed, it changes only if the scope does.',
  faqs: [
    {
      q: 'How much does a website cost in Nepal?',
      a: 'With us, a landing page costs NPR 20,000 to 35,000, a business website NPR 50,000 to 1,20,000, and an online store NPR 90,000 to 2,50,000, all excluding 13% VAT. Where you land in the range depends on the number of pages, whether you need payments or logins, and how much of the content already exists. At the consultation we confirm one fixed price, in writing, and it does not change unless the scope does.',
    },
    {
      q: 'How long does a website take?',
      a: 'A landing page takes 3 to 7 days, a business website 2 to 3 weeks, and an online store 3 to 6 weeks. Booking and web systems take 4 to 8 weeks. The clock starts when we have your content and approval, not when you sign.',
    },
    {
      q: 'Will I own the website?',
      a: 'Yes. The domain, the hosting, the logins and the files are registered in your name, and you get admin access to all of it. If you ever leave us, you take everything with you.',
    },
    {
      q: 'Can I update it myself?',
      a: 'Yes. Business websites and stores come with a CMS and a training session, so you can change text, images, pages and products yourself. A landing page comes with admin access to edit its text and images.',
    },
    {
      q: 'Do you build online stores with eSewa and Khalti?',
      a: 'Yes. Every store we build takes eSewa, Khalti and Fonepay, plus cash on delivery. You need your own merchant account with each provider; we guide you through setting them up, then integrate and test the payments end to end before launch. The providers\' setup and per-transaction fees are paid by you directly to them.',
    },
    {
      q: 'Do you build websites in Nepali?',
      a: 'Yes. A bilingual English and Nepali site can be arranged on any business website or store. Because it is mostly content work, it is quoted separately from the build.',
    },
    {
      q: 'What happens after launch?',
      a: 'Support is included: 30 days on business websites and stores, 14 days on a landing page. After that you can move to a monthly care plan, or simply call us when you need something. There is no obligation to keep paying us.',
    },
    {
      q: 'Which development model do you use for websites?',
      a: 'It depends on the project. Most websites are delivered with an iterative waterfall model: requirements, design, development, testing and launch, with your approval at the end of each phase. Where requirements are still open we start with a prototype, and larger web systems can be delivered in agile sprints. The model is named in the written proposal.',
    },
    {
      q: 'What if I want changes after the scope is agreed?',
      a: 'Changes inside the agreed scope are part of the job. If you want something outside it, we quote the change in writing first, and nothing extra is built until you approve it.',
    },
  ],
};

/* --------------------------------------------------------------------------
   /services/software  — no published price: every system is quoted.
   -------------------------------------------------------------------------- */

export const software = {
  facts: [
    { icon: 'sheet', value: 'Scoped in writing', label: 'Fixed scope and price' },
    { icon: 'workflow', value: 'Delivered in stages', label: 'Working software at each stage' },
    { icon: 'maintenance', value: '60 days', label: 'Post-launch support' },
    { icon: 'lock', value: 'Yours', label: 'Code, data and accounts in your name' },
  ],
  commonUses: ['Billing', 'Inventory', 'POS', 'CRM', 'School management', 'Clinic management', 'HR', 'Cooperative systems', 'Booking'],
  systems: [
    { icon: 'website', name: 'Portals', body: 'Customer or partner portals with role-based access.' },
    { icon: 'software', name: 'Dashboards', body: 'Operational views for sales, support, inventory, or admissions.' },
    { icon: 'workflow', name: 'Workflow automation', body: 'Cron jobs, queues, notifications, and data sync.' },
    { icon: 'agent', name: 'Integrations', body: 'Payments, email, CRM, spreadsheets, and external APIs.' },
    { icon: 'search', name: 'Data systems', body: 'Search, filtering, exports, and clean admin UX.' },
    { icon: 'hosting', name: 'Reliability upgrades', body: 'Refactors, caching, indexing, and performance fixes.' },
  ],
  integrationsIntro: 'Business software is only as useful as what it connects to. We wire it to the providers you already use and test every connection end to end before launch.',
  integrations: [
    { icon: 'coins', name: 'Payments', body: 'eSewa, Khalti, Fonepay and bank transfers, with payment status updated automatically and a record of every transaction.' },
    { icon: 'chat', name: 'SMS, WhatsApp and email', body: 'Confirmations, reminders and alerts sent by the system, not typed out by your staff.' },
    { icon: 'sheet', name: 'Spreadsheets and existing tools', body: 'Import from and export to Excel and Google Sheets, so nothing your team relies on today is thrown away.' },
    { icon: 'workflow', name: 'APIs and webhooks', body: 'Connections to couriers, accounting and other services, with a log of what was sent and received.' },
  ],
  pillars: [
    { icon: 'lock', name: 'Security', body: 'Each person sees only what their role allows. Every connection is encrypted, and important changes are logged with who made them.' },
    { icon: 'gauge', name: 'Performance', body: 'Fast on ordinary office computers and phones, with the database organised for the reports you actually run.' },
    { icon: 'maintenance', name: 'Maintainability', body: 'Clean, documented code and written handover notes, so any capable developer can work on it later — not only us.' },
  ],
  operations: [
    'Hosting set up and registered in your name',
    'Automatic backups',
    'A separate test version, so changes are tried before your team sees them',
    'Updates and security patches',
    'Monitoring, so we hear about a problem before your staff do',
  ],
  delivery: [
    { name: 'Scope', body: 'We walk through how the business runs. You get the modules, the price and the timeline in writing.' },
    { name: 'Design', body: 'Screens and data structure agreed before building, so you can see how it will work.' },
    { name: 'Build', body: 'In stages. Each part is usable as it is finished, so you try it while it is built.' },
    { name: 'Harden and hand over', body: 'Tested with your real data, fixed, then handed over in your name with training.' },
  ],
  comparison: {
    head: ['', 'Off-the-shelf software', 'Custom software from Nine'],
    rows: [
      ['How it fits', 'Your team adapts to the product', 'The system is built around how your team works'],
      ['Ownership', 'A licence you keep paying for', 'Code, data and accounts registered in your name'],
      ['Features', 'Many you pay for and never use', 'Only what the business needs'],
      ['Change', 'Limited to the vendor’s roadmap', 'Extended as the business grows'],
      ['Local fit', 'Often built for other markets', 'eSewa, Khalti, Nepali SMS and your existing files'],
    ],
  },
  deliverables: [
    { name: 'The system', icon: 'software', items: ['Roles and permissions that actually hold — each person sees only what they should', 'A dashboard your team can run without calling us', 'Reports that answer the questions you will ask six months from now, not only today', 'A database designed for where the business is going, not only where it is today'] },
    { name: 'Integration and data', icon: 'workflow', items: ['Payments, SMS and other integrations wired to real providers and tested end to end', 'One round of migration from your existing Excel or files', 'Works on phone and computer'] },
    { name: 'Handover and support', icon: 'lock', items: ['Written documentation and training, so this is maintainable by anyone', '60 days support after launch', 'Everything in your name'] },
  ],
  quote: 'Every system is different, so each engagement is priced individually. After the consultation you receive a written proposal with the scope, a fixed price and the timeline. Once approved, the price changes only if the scope does.',
  priceMovers: ['Modules and features', 'Number of users', 'Integrations', 'Complexity of reports and workflows'],
  faqs: [
    {
      q: 'How much does custom software cost in Nepal?',
      a: 'It depends on what the system has to do, so each one is priced individually in a written proposal after a consultation. The price is set by the number of modules, the number of users, the integrations it needs and how complex the reports and workflows are. You get a fixed price in writing before anything starts.',
    },
    {
      q: 'How long does custom software take?',
      a: 'Most projects take 6 to 12 weeks, built in stages so you see and use each part as it is finished. The written scope gives the timeline for your project before anything starts.',
    },
    {
      q: 'Will I own the software?',
      a: 'Yes. The software, its data and the accounts it runs on are registered in your name. You are never locked in to us to keep using it.',
    },
    {
      q: 'Can it replace my Excel files?',
      a: 'Yes, that is the most common reason people come to us. One round of migration from your existing Excel files or records is included, so you start with your real data rather than an empty system.',
    },
    {
      q: 'Can it connect to eSewa, Khalti and the tools we already use?',
      a: 'Yes. We connect it to eSewa, Khalti, Fonepay, SMS, WhatsApp, email, Excel and Google Sheets, and to other services through their APIs. Every connection is tested end to end before launch.',
    },
    {
      q: 'Can you fix or take over an existing system?',
      a: 'Often, yes. We review the code and the data first, then tell you honestly whether it is worth fixing or cheaper to rebuild, with a written price for either.',
    },
    {
      q: 'Is our data safe?',
      a: 'Each person sees only what their role allows, every connection is encrypted, backups run automatically, and the data is stored on hosting registered in your name.',
    },
    {
      q: 'Which software development model do you use?',
      a: 'We do not force every project into one model. Business software is usually delivered incrementally, so you use the first module while the next is built. Evolving products use agile sprints, and systems where accuracy is critical, such as billing and payments, follow the V-model with testing planned for every phase. The proposal names the model and explains why.',
    },
    {
      q: 'Do you support it after launch?',
      a: 'Yes. 60 days of support are included after launch. After that you can move to a monthly care plan, or call us when you need something.',
    },
  ],
};

/* --------------------------------------------------------------------------
   /services/app  — no published price: every app is quoted.
   -------------------------------------------------------------------------- */

export const app = {
  time: '8–16 weeks',
  facts: [
    { icon: 'app', value: 'Android and iOS', label: 'One app, both stores' },
    { icon: 'gauge', value: 'Mid-range tested', label: 'Real devices, weak networks' },
    { icon: 'launch', value: 'Store-ready', label: 'Submission and approval handled' },
    { icon: 'maintenance', value: '60 days', label: 'Post-launch support' },
  ],
  comparison: {
    head: ['', 'Progressive web app', 'Native app'],
    rows: [
      ['Installed from', 'The browser, on any phone', 'The App Store and Play Store'],
      ['Typical timeline', 'A few weeks', '8–16 weeks'],
      ['Relative cost', 'Lower', 'Higher'],
      ['Store approval', 'Not required', 'Required for every release'],
      ['Offline use and notifications', 'Basic', 'Full'],
      ['Best suited to', 'Most businesses', 'Products customers use every day'],
    ],
  },
  risks: [
    { icon: 'launch', name: 'Store rejection', body: 'Privacy details, permissions and store policies are prepared before submission, not after a rejection.' },
    { icon: 'coins', name: 'Payments against store rules', body: 'The correct billing method is chosen at design stage, so payments are not blocked at review.' },
    { icon: 'gauge', name: 'Slow on weak networks', body: 'Screens show stored content first and update when the connection allows.' },
    { icon: 'users', name: 'A first screen that asks too much', body: 'Onboarding shows value before it asks the customer for details.' },
  ],
  deliverables: [
    { name: 'The product', icon: 'app', items: ['One app, both stores — Android and iPhone', 'Push notifications set up and ready', 'In-app payments if you need them'] },
    { name: 'Quality', icon: 'gauge', items: ['Tested on the phones your customers actually own, not just a flagship', 'Works on a weak connection, and degrades gracefully without one', 'Crash tracking after launch, so we find problems before your users tell you'] },
    { name: 'Launch and support', icon: 'launch', items: ['Store listings, screenshots and the approval process handled', '60 days support'] },
  ],
  whatWeBuild: [
    { icon: 'store', name: 'Customer apps', body: 'Ordering, booking, loyalty and customer accounts.' },
    { icon: 'users', name: 'Staff and field apps', body: 'Orders, deliveries, attendance and stock checks on the move.' },
    { icon: 'coins', name: 'Apps that take payment', body: 'eSewa, Khalti and Fonepay, and store billing for subscriptions.' },
    { icon: 'lock', name: 'Logins and accounts', body: 'Phone-number sign-in with a one-time code, profiles and roles.' },
    { icon: 'workflow', name: 'Apps on your existing system', body: 'Connected to the software or website you already run.' },
    { icon: 'software', name: 'An admin dashboard', body: 'Manage content, users and orders without a developer.' },
  ],
  whenReal: ['Your customers use it daily', 'You need push notifications', 'It must work offline', 'You need in-app payments', 'The app is the product, not a brochure'],
  failPoints: [
    'Rejected by the App Store or Play Store over missing privacy details or store rules',
    'Payments and subscriptions set up against the store rules, then blocked',
    'Slow on a weak connection because every screen waits for the server',
    'A first screen that asks for too much before showing anything useful',
  ],
  payments: 'Physical goods and services — food, bookings, deliveries — can be paid with eSewa, Khalti or Fonepay inside the app. Digital content and subscriptions usually have to use Apple\'s and Google\'s own billing. We set up whichever the store rules require for your app, so it is not rejected at review.',
  builtForNepal: [
    'Tested on mid-range Android phones, not only flagships',
    'Loads what it can while the connection catches up',
    'Keeps working offline where your app needs it',
    'Clear type and large tap targets',
    'Nepali and English interface where you need it',
  ],
  release: [
    { name: 'Plan', body: 'Screens, features and store requirements agreed in writing.' },
    { name: 'Build', body: 'In stages, with test versions on your own phone as it takes shape.' },
    { name: 'Test', body: 'On real mid-range phones and weak connections, not only a simulator.' },
    { name: 'Ship', body: 'Store listings, screenshots and approval handled; crash tracking on from day one.' },
  ],
  addons: ['Admin dashboard', 'Push notification campaigns', 'Content management', 'Sales and usage reports', 'AI chat inside the app', 'Payment integrations', 'Delivery and order tracking', 'Analytics'],
  quote: 'Two apps that sound alike can require very different work behind them, so every app is priced individually. After the consultation you receive a written proposal with the scope, a fixed price and the timeline. Where a progressive web app meets the need, we propose that instead — at far lower cost.',
  priceMovers: ['Number of screens and features', 'Android, iPhone or both', 'Whether it needs its own backend and admin dashboard', 'Payments, logins and other integrations'],
  faqs: [
    {
      q: 'Do I need an app or a website?',
      a: 'Most businesses need a website, not an app. A well-built mobile website or a progressive web app works on every phone, costs far less and needs no app-store approval. A native app makes sense when customers use it daily, or you need push notifications, offline use or in-app payments. We tell you which you need before you spend anything.',
    },
    {
      q: 'How much does an app cost in Nepal?',
      a: 'It depends on the number of screens and features, whether it is for Android, iPhone or both, and whether it needs its own backend and admin dashboard. Each app is priced individually in a written proposal after a consultation. A progressive web app costs far less, and for many businesses it does the same job.',
    },
    {
      q: 'How long does an app take?',
      a: 'A native app usually takes 8 to 16 weeks, depending on the features. A progressive web app usually ships in a few weeks.',
    },
    {
      q: 'Will it work on cheap phones?',
      a: 'Yes. We test on the mid-range Android phones your customers actually own, not just a flagship, and build it to keep working on a weak connection.',
    },
    {
      q: 'Can the app take eSewa and Khalti payments?',
      a: 'Yes, for physical goods and services such as food, bookings and deliveries. Digital content and subscriptions usually have to go through Apple\'s and Google\'s own billing; we set up whichever the store rules require.',
    },
    {
      q: 'Can the app be in Nepali?',
      a: 'Yes. The app can have a Nepali interface, an English one, or both with a switch. Tell us on the first call so it is part of the scope.',
    },
    {
      q: 'Which development model do you use for apps?',
      a: 'Most apps start with a clickable prototype, so you and your users can test the flow before development begins. The app is then built in agile two-week sprints, with a working demonstration at the end of each one. Where the scope is fully defined, an iterative waterfall model can be used instead. The proposal names the model.',
    },
    {
      q: 'Do you handle the Play Store and App Store?',
      a: 'Yes. We prepare the store listings and screenshots and take the app through the approval process. The developer accounts are registered in your name, and their fees are paid by you directly to Google and Apple.',
    },
  ],
};

/* --------------------------------------------------------------------------
   Delivery models. Shown on the three Build pages. We do not force a project
   into one model: the proposal names the model that fits the requirements.
   -------------------------------------------------------------------------- */

export const modelsIntro = 'We do not fit every project into one model. How a project is delivered depends on how settled the requirements are, how much certainty you need on cost, and how the product is expected to grow. After the consultation we recommend a model — or a combination, such as a prototype followed by incremental delivery — and name it in the written proposal.';

export const modelFactors = [
  { icon: 'sheet', name: 'Clarity of requirements', body: 'Fully defined, partly known, or still to be discovered with you.' },
  { icon: 'coins', name: 'Certainty of cost', body: 'One fixed price for the whole scope, or a fixed price per stage.' },
  { icon: 'gauge', name: 'Pace of change', body: 'Whether the product is finished at launch or keeps evolving.' },
];

export const deliveryModels = {
  waterfall: {
    name: 'Waterfall',
    short: 'Sequential phases, one fixed scope and price.',
    phases: ['Requirements', 'Design', 'Development', 'Testing', 'Launch'],
    how: 'Each phase is completed and approved before the next begins. The full scope is agreed at the start, so cost and timeline are known in advance.',
    bestFor: 'Projects with clear, stable requirements: most business websites, landing pages and well-defined systems.',
    pricing: 'One fixed price for the whole scope, approved in the proposal.',
  },
  'iterative-waterfall': {
    name: 'Iterative Waterfall',
    short: 'Waterfall with a review and correction point at every phase.',
    phases: ['Requirements', 'Design', 'Development', 'Testing', 'Launch'],
    how: 'The same sequence as waterfall, but each phase ends with a formal review. Anything the review finds is corrected in that phase, or fed back to the previous one, before work moves on.',
    bestFor: 'Defined projects where early approval matters — for example, a website whose design is signed off before development starts.',
    pricing: 'One fixed price. Corrections found at a review within the agreed scope are included.',
  },
  incremental: {
    name: 'Incremental',
    short: 'Delivered in usable parts, the most important first.',
    phases: ['Core release', 'Increment 2', 'Increment 3', 'Further increments'],
    how: 'The system is divided into increments. Each is designed, built, tested and handed over as working software, so your team uses the first part while the next is built.',
    bestFor: 'Business software replacing several manual processes — for example, billing first, then inventory, then reporting.',
    pricing: 'A fixed price for each increment, agreed before that increment starts.',
  },
  agile: {
    name: 'Agile (Scrum)',
    short: 'Short sprints, with priorities reviewed with you every two weeks.',
    phases: ['Backlog', 'Sprint planning', 'Two-week sprint', 'Review and demo', 'Next sprint'],
    how: 'Work is organised into a prioritised backlog and delivered in two-week sprints. Each sprint ends with a demonstration of working software and a review of what comes next, so the plan adapts as you learn.',
    bestFor: 'Products whose requirements will evolve: mobile apps, customer platforms and systems that grow after launch.',
    pricing: 'Priced per sprint or per phase, agreed in writing, with priorities set by you.',
  },
  prototype: {
    name: 'Prototyping',
    short: 'See and test a working prototype before development begins.',
    phases: ['Requirements', 'Prototype', 'Your feedback', 'Refinement', 'Development'],
    how: 'A clickable prototype of the key screens is built first. You and your users test it, and it is refined until it is right. Only then does full development begin.',
    bestFor: 'New products and unclear requirements — especially apps and customer-facing systems, where seeing the flow changes the brief.',
    pricing: 'The prototype is priced on its own. Development is priced once the prototype is approved.',
  },
  'v-model': {
    name: 'V-Model',
    short: 'Every build phase paired with a planned test phase.',
    phases: ['Requirements — acceptance tests', 'System design — system tests', 'Module design — integration tests', 'Development — unit tests'],
    how: 'Testing is planned alongside each phase of design, not left to the end. Each level of the build is verified against the matching level of requirements before handover.',
    bestFor: 'Systems where accuracy is critical: billing, payments, financial records and anything audited.',
    pricing: 'One fixed price, with the test plan agreed as part of the scope.',
  },
  kanban: {
    name: 'Kanban',
    short: 'A continuous flow of improvements after launch.',
    phases: ['Request', 'Prioritised', 'In progress', 'Review', 'Done'],
    how: 'Requests are placed on a shared board, prioritised with you and worked through continuously, with a limit on work in progress so each item is finished properly.',
    bestFor: 'Ongoing improvements, maintenance and support once a website, system or app is live.',
    pricing: 'Covered by a monthly care plan or an agreed monthly scope.',
  },
};

/** Which models each Build page leads with; the rest follow. */
export const modelFit = {
  website: { label: 'Common for websites', ids: ['iterative-waterfall', 'waterfall', 'prototype', 'agile'] },
  software: { label: 'Common for software', ids: ['incremental', 'agile', 'v-model', 'iterative-waterfall'] },
  app: { label: 'Common for apps', ids: ['prototype', 'agile', 'incremental', 'iterative-waterfall'] },
};

/* --------------------------------------------------------------------------
   /services/grow, /services/automate, /services/support
   Each service here is one block on its page; `id` is its anchor.
   -------------------------------------------------------------------------- */

export const grow = {
  services: [
    {
      id: 'seo',
      name: 'Search visibility (SEO, AEO, GEO)',
      answer: 'Show up when customers search — on Google, and inside AI tools like ChatGPT where people now ask for recommendations.',
      price: services.seo.price,
      includes: ['Technical fixes', 'On-page optimisation', 'Content plan', 'Google Business Profile management', 'Answer-engine structuring', 'Monthly report on rankings and enquiries'],
      excludes: [],
      note: 'Six-month minimum. Nobody can guarantee a Google ranking, and we do not.',
      priceMovers: 'What moves the price: how competitive your searches are, how many locations or services you want found for, and how much content the plan includes.',
      cta: { label: 'Ask about search visibility', need: 'seo' },
    },
    {
      id: 'social',
      name: 'Social media management',
      answer: 'Your Facebook, Instagram and TikTok handled — planned, posted and answered.',
      price: services.social.price,
      includes: ['Content plan', 'Posting', 'Comment and message replies', 'Monthly report'],
      excludes: ['Ad spend, which is always separate'],
      note: 'Exact post counts are written into every contract.',
      priceMovers: 'What moves the price: the number of platforms, posts a month, and whether we shoot the content or you supply it.',
      cta: { label: 'Ask about social media', need: 'social' },
    },
    {
      id: 'video',
      name: 'Content and video production',
      answer: 'We come to your business and shoot it properly — real camera, real crew — then cut it into reels and ads people actually watch.',
      price: services.video.price,
      includes: ['Shoot day with crew', '6–10 finished pieces per shoot day', 'Editing and captions'],
      excludes: [],
      note: 'One shoot day = 6–10 finished pieces = 4–8 weeks of content. AI production fills the gaps between shoots. Real place means real footage; AI is for explainers, graphics and variations.',
      priceMovers: 'Shoot days are capped in writing. Travel outside the Kathmandu valley is quoted separately.',
      cta: { label: 'Ask about a shoot', need: 'video' },
    },
    {
      id: 'ads',
      name: 'Paid advertising',
      answer: 'Meta, Google and TikTok ads run properly and reported in cost per enquiry.',
      price: services.ads.price,
      includes: ['Campaign setup', 'Creative direction', 'Weekly optimisation', 'Monthly report on cost per enquiry'],
      excludes: ['Ad spend, which is your money and is paid directly to the platform'],
      priceMovers: 'The price is our management fee. Ad spend is always yours, paid straight to Meta, Google or TikTok, never through us.',
      cta: { label: 'Ask about ads', need: 'ads' },
    },
  ],
  faqs: [
    {
      q: 'Do you guarantee Google rankings?',
      a: 'No, and neither can anyone else. Google does not sell or promise positions, so any company that guarantees a number one ranking is either guessing or misleading you. What we commit to is the work — technical fixes, on-page optimisation, content, Google Business Profile — and a monthly report showing rankings and, more importantly, how many enquiries came in.',
    },
    {
      q: 'Why is there a six-month minimum on search visibility?',
      a: 'Because search results take months to respond to the work. A shorter plan would mostly pay for the set-up and stop before it has had time to bring in enquiries. The monthly report shows you what is moving while it builds.',
    },
    {
      q: 'What are AEO and GEO?',
      a: 'AEO (answer engine optimisation) and GEO (generative engine optimisation) mean structuring your site so AI tools like ChatGPT, Perplexity and Gemini can read it, trust it and name you when someone asks for a recommendation. It sits alongside ordinary SEO, not instead of it.',
    },
    {
      q: 'Is the ad spend included in the price?',
      a: 'No. Our price is the management fee. The ad spend is your money and is paid directly to Meta, Google or TikTok, so you can always see exactly what was spent.',
    },
    {
      q: 'How much content does one shoot day give me?',
      a: 'One shoot day gives 6 to 10 finished pieces, which is usually 4 to 8 weeks of posting. Between shoots, AI production fills the gaps with explainers, graphics and variations.',
    },
  ],
};

export const automate = {
  services: [
    {
      id: 'ai-chat',
      name: 'AI chat and enquiry handling',
      answer: 'Every message on WhatsApp, Messenger and your website answered instantly, day and night, in English and Nepali, with real enquiries passed to your team.',
      price: services['ai-chat'].price,
      includes: ['Setup on all three channels', 'English and Nepali replies', 'Handover rules to your staff', 'Monthly tuning'],
      excludes: [],
      priceMovers: 'What moves the price: the number of channels, how many questions it has to handle, and what it connects to. Monthly tuning is quoted with the setup.',
      cta: { label: 'Ask about AI chat', need: 'ai-chat' },
    },
    {
      id: 'automation',
      name: 'Workflow automation',
      answer: 'The copying, forwarding, reminding and reporting your staff do by hand — connected and automated.',
      price: services.automation.price,
      includes: ['Enquiry to sheet to auto-reply to daily summary', 'Order to invoice to delivery note', 'Fee reminder cycles', '8pm daily sales report'],
      excludes: [],
      priceMovers: 'What moves the price: how many steps and tools the workflow connects, and how many workflows you want automated.',
      cta: { label: 'Ask about automation', need: 'automation' },
    },
    {
      id: 'ai-agents',
      name: 'AI agents and internal tools',
      answer: 'Custom AI that does real work inside your business, built around your actual processes.',
      price: null,
      priceNote: 'Process assessment',
      includes: [],
      excludes: [],
      note: 'Every engagement begins with a process assessment: a 30 to 60 minute review of your daily operations at no cost, followed by a written scope and price.',
      cta: { label: 'Request a process assessment', need: 'ai-agents' },
    },
  ],
  faqs: [
    {
      q: 'What is AI automation and does my business need it?',
      a: 'AI automation means software doing the repetitive work your staff currently do by hand — answering the same WhatsApp questions, copying orders into a sheet, sending fee reminders, typing the daily sales report. You need it if your team spends more than an hour a day on work that follows the same steps every time. We begin with a 30 to 60 minute process assessment, at no cost, and advise honestly if the answer is no.',
    },
    {
      q: 'Will the AI chat reply in Nepali?',
      a: 'Yes. It replies in English and Nepali, on WhatsApp, Messenger and your website, and it is tuned every month on the questions your customers actually ask.',
    },
    {
      q: 'What happens when the AI cannot answer?',
      a: 'It hands the conversation to your staff. We set the handover rules with you — for example, anything about a complaint, a refund or a large order goes straight to a person — so a real enquiry is never left with a machine.',
    },
    {
      q: 'What is the process assessment?',
      a: 'A 30 to 60 minute walkthrough of your daily work, in person or on a call. We look for the work that follows the same steps every time, then give you a written scope and price for automating it — or tell you it is not worth automating.',
    },
  ],
};

export const carePlans = {
  rows: ['Hosting, SSL and backups', 'Software updates', 'Small changes included', 'Response time', 'Monthly report'],
  plans: [
    { name: 'Essential', price: { from: 5000, per: 'month', exact: true }, values: ['Yes', 'Yes', '2 a month', 'Within 48 hours', 'No'] },
    { name: 'Standard', price: { from: 10000, per: 'month', exact: true }, values: ['Yes', 'Yes', '5 a month', 'Within 24 hours', 'Yes'], featured: 'Most chosen' },
    { name: 'Complete', price: { from: 18000, per: 'month', exact: true }, values: ['Yes', 'Yes', '10 a month', 'Same day', 'Yes, with priority'] },
  ],
};

export const support = {
  services: [
    {
      id: 'hosting',
      name: 'Domain and hosting',
      answer: 'Domain, hosting, email and SSL — set up, renewed on time, and in your name, not held in ours.',
      price: services.hosting.price,
      includes: ['Domain registration and renewal', 'Hosting', 'Business email', 'SSL certificate'],
      excludes: [],
      note: 'Everything registered in your name.',
      priceMovers: 'What moves the price: the domain ending you choose, the number of email accounts, and the hosting size.',
      cta: { label: 'Ask about hosting', need: 'hosting' },
    },
    {
      id: 'maintenance',
      name: 'Maintenance and updates',
      answer: 'Updates, security, backups and small fixes handled before they become problems.',
      price: services.maintenance.price,
      includes: ['Software updates', 'Security patches', 'Backups', 'Small fixes'],
      excludes: [],
      cta: { label: 'Ask about maintenance', need: 'maintenance' },
    },
  ],
  faqs: [
    {
      q: 'Do you provide support after launch?',
      a: 'Yes. Every project includes support after launch at no extra cost: 14 days on a landing page, 30 days on websites and stores, and 60 days on software and apps. After that you can move to a monthly care plan, or simply call us when you need something. There is no obligation to keep paying us.',
    },
    {
      q: 'Is the domain registered in my name?',
      a: 'Yes. The domain, the hosting and the business email are registered in your name, never ours, and you get the logins. If you ever move to another company, you take them with you.',
    },
    {
      q: 'Which care plan do I need?',
      a: 'Essential covers hosting, updates, backups and 2 small changes a month with a 48-hour response. Standard, the one most businesses choose, adds 5 small changes a month, a 24-hour response and a monthly report. Complete is for businesses that change their site often and need a same-day response.',
    },
    {
      q: 'Can I stop a care plan?',
      a: 'Yes. There is no obligation to keep paying us, and the notice terms are written into the plan before you start. Everything stays in your name either way.',
    },
  ],
};

/* --------------------------------------------------------------------------
   Contact form "Service" list, and ?need= values from older links.
   -------------------------------------------------------------------------- */

export const needs = [
  { value: 'landing', label: 'Landing / single page' },
  { value: 'website', label: 'Business website' },
  { value: 'store', label: 'E-commerce / online store' },
  { value: 'booking-system', label: 'Booking or web system' },
  { value: 'software', label: 'Custom software' },
  { value: 'mobile-app', label: 'Mobile app' },
  { value: 'seo', label: 'Search visibility (SEO, AEO, GEO)' },
  { value: 'social', label: 'Social media management' },
  { value: 'video', label: 'Content and video production' },
  { value: 'ads', label: 'Paid advertising' },
  { value: 'ai-chat', label: 'AI chat and enquiry handling' },
  { value: 'automation', label: 'Workflow automation' },
  { value: 'ai-agents', label: 'AI agents and internal tools' },
  { value: 'hosting', label: 'Domain and hosting' },
  { value: 'maintenance', label: 'Maintenance and updates' },
  { value: 'care-plan', label: 'A monthly care plan' },
  { value: 'not-sure', label: 'Not sure yet' },
];

/** Old ?need= values still in the wild, mapped to their current ones. */
export const needAliases = { portfolio: 'landing', 'business-software': 'software' };

export const contactHref = (need) => `/contact?need=${need}`;

/** The seven services URLs, for the sitemap and llms.txt. */
export const servicePages = [
  { path: '/services', name: 'Services and prices (hub)' },
  { path: '/services/website', name: 'Websites: landing pages, business websites, online stores, booking systems' },
  { path: '/services/software', name: 'Custom software' },
  { path: '/services/app', name: 'Mobile apps' },
  { path: '/services/grow', name: 'Search visibility, social media, video and paid ads' },
  { path: '/services/automate', name: 'AI chat, workflow automation and AI agents' },
  { path: '/services/support', name: 'Domain and hosting, maintenance and care plans' },
];
