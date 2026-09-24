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
    short: 'Landing pages, business sites, online stores and redesigns. Custom design, fast on Nepali networks, found on Google and AI search.',
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
    name: 'Search & AI visibility',
    short: 'Found on Google — and inside AI tools like ChatGPT and Perplexity, where people now ask for recommendations.',
    price: { from: 30000, per: 'month' },
    href: '/services/seo',
    icon: 'search',
  },
  social: {
    name: 'Social media marketing',
    short: 'Facebook, Instagram and TikTok planned, designed, posted and answered — pages that stay active and bring enquiries.',
    price: { from: 20000, per: 'month' },
    href: '/services/social-media',
    icon: 'social',
  },
  video: {
    name: 'Content & video',
    short: 'We come to your business, shoot it properly and turn it into video that gets watched — with AI video where a shoot is not possible.',
    price: { from: 25000 },
    priceSuffix: 'or NPR 35,000/mo',
    href: '/services/video-production',
    icon: 'video',
  },
  ads: {
    name: 'Paid advertising',
    short: 'Facebook, Instagram, TikTok and Google ads that reach the customers most likely to buy, reported in cost per enquiry.',
    price: { from: 8000, per: 'month' },
    priceSuffix: '+ your ad budget',
    href: '/services/paid-ads',
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
    tagline: 'A website nobody visits earns nothing. We bring customers to what we build — through search, social, video and ads — and we report in enquiries, not likes.',
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
  { q: 'Need customers?', a: 'Website + Search & AI visibility', links: ['/services/website', '/services/seo'] },
  { q: 'Need a system?', a: 'Software', links: ['/services/software'] },
  { q: 'More messages than your team can answer?', a: 'AI chat & Workflow automation', links: ['/services/automate'] },
  { q: 'A website that is slow or out of date?', a: 'Website redesign & rescue, built to keep your search rankings', links: ['/services/website#redesign'] },
];

/* --------------------------------------------------------------------------
   /services/website
   -------------------------------------------------------------------------- */

export const website = {
  offers: [
    {
      id: 'landing',
      icon: 'launch',
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
      icon: 'website',
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
      icon: 'store',
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
      icon: 'calendar',
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
    {
      id: 'redesign',
      icon: 'maintenance',
      name: 'Website redesign & rescue',
      short: 'Redesign & rescue',
      price: { from: 30000, to: 90000 },
      time: '1–3 weeks',
      forExisting: true,
      intro: "Have a site that's slow, outdated, or doesn't work on phones? We rebuild it — faster, modern and mobile-first — with your content carried over and built to keep the Google rankings you already have.",
      highlights: ['Refresh from NPR 30,000', 'Full rebuild from NPR 50,000', 'Rankings protected with 301 redirects'],
      tiers: [
        { name: 'Refresh', price: { from: 30000 }, body: 'A new, modern look, mobile-responsive, with speed fixes. The existing structure stays.' },
        { name: 'Full rebuild', price: { from: 50000 }, body: 'A new design on new, fast technology, restructured, with your content migrated.' },
      ],
      included: [
        'Mobile-first custom redesign (no templates)',
        'Google rankings protected — proper URL mapping and 301 redirects, metadata and schema migrated',
        'Speed & Core Web Vitals fixes',
        'Your content migrated from the old site',
        'CMS — a simple dashboard to update it yourself',
        '30 days support',
      ],
      audit: 'Every redesign begins with an audit of your current site, at no cost: what is slowing it down and what is costing you visitors. A written proposal for the rebuild follows.',
      cta: { label: 'Request a site audit', need: 'redesign' },
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
      q: 'Will a redesign affect my Google rankings?',
      a: 'A redesign is built to keep the rankings you already have. Every old address is mapped to its new page with a permanent (301) redirect, and your page titles, descriptions and structured data are carried over, so search engines treat the new site as the same site. Most ranking losses after a redesign come from skipping these steps.',
    },
    {
      q: 'Can you redesign a website another company built?',
      a: 'Yes. We start with an audit of the current site, at no cost, then either refresh the design on the existing structure or rebuild it on new technology. Your content is migrated either way, and the new site is registered in your name.',
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
  intro: 'A website nobody visits earns nothing. We bring customers to what we build — through search, social, video and ads — and we report in enquiries, not likes.',
  facts: [
    { icon: 'gauge', value: 'Reported in enquiries', label: 'Not likes or vanity rankings' },
    { icon: 'lock', value: 'In your name', label: 'Analytics, Search Console and ad accounts' },
    { icon: 'chat', value: 'English and Nepali', label: 'Captions, content and ads' },
    { icon: 'coins', value: 'Ad spend never marked up', label: 'Paid directly to the platform' },
  ],
  standards: [
    { icon: 'gauge', name: 'Reported in enquiries', body: 'Every monthly report leads with enquiries and cost per enquiry — the numbers that affect your revenue — not follower counts.' },
    { icon: 'lock', name: 'Your accounts, your data', body: 'Analytics, Search Console, pages and ad accounts are registered in your name. If you ever leave, you keep all of it.' },
    { icon: 'chat', name: 'Bilingual', body: 'Captions, content and ads in English and Nepali, written for the customers you actually serve.' },
    { icon: 'video', name: 'Content made in-house', body: 'The reels, videos and graphics we produce feed your social pages and your ads, so every channel carries the same message.' },
    { icon: 'search', name: 'White-hat only', body: 'No spam directories, no fake backlinks and no AI-spam content — nothing that can get your business penalised.' },
    { icon: 'sheet', name: 'Proper billing', body: 'Written scope every month, and VAT bills for our fees.' },
  ],
  services: [
    {
      id: 'seo',
      slug: 'seo',
      scene: 'seo',
      kicker: 'Grow — Search & AI visibility',
      h1: 'SEO and AI search visibility in Kathmandu',
      title: 'SEO & AI Search Visibility in Kathmandu — Nine Technology',
      description: 'SEO, AEO and GEO for businesses in Nepal: found on Google and recommended by ChatGPT and Perplexity. From NPR 30,000/month, reported in enquiries.',
      answer: 'Nine Technology makes businesses in Nepal easy to find on Google and inside AI tools such as ChatGPT, Perplexity and Gemini — through SEO, AEO, GEO and local SEO — from NPR 30,000 a month. Every plan is scoped to your competition, run white-hat only, and reported in enquiries and cost per lead.',
      facts: [
        { icon: 'search', value: 'SEO, AEO and GEO', label: 'Google and AI search' },
        { icon: 'store', value: 'Local SEO', label: 'Google Business Profile' },
        { icon: 'lock', value: 'In your name', label: 'Analytics and Search Console' },
        { icon: 'gauge', value: 'Reported in enquiries', label: 'And cost per lead' },
      ],
      pillars: {
        heading: 'Four kinds of visibility',
        lead: 'Customers now find businesses in more than one place. The plan covers all four.',
        items: [
          { icon: 'search', name: 'SEO', body: 'Keyword research, on-page optimization, technical SEO and off-page authority building, so you rank on Google.' },
          { icon: 'sheet', name: 'AEO', body: 'Structured content, FAQs and schema, so you are the direct answer in featured snippets and voice search.' },
          { icon: 'agent', name: 'GEO', body: 'So ChatGPT, Perplexity and Gemini understand your business and recommend it.' },
          { icon: 'store', name: 'Local SEO', body: 'Google Business Profile and local search, for customers looking nearby.' },
        ],
      },
      flow: [
        { name: 'AI-search audit', body: 'How you appear on Google and in AI tools today, and what competitors do.' },
        { name: 'Proposal', body: 'Scope, targets and monthly price, scoped to your competition.' },
        { name: 'Technical and on-page', body: 'Fixes, structure, content and schema on your site.' },
        { name: 'Authority and local', body: 'Off-page authority building and Google Business Profile.' },
        { name: 'Monthly report', body: 'Enquiries and cost per lead first, then the next month planned.' },
      ],
      related: ['social', 'ads'],
      faqs: [
        { q: 'Do you guarantee Google rankings?', a: 'No, and neither can anyone else. Google does not sell or promise positions, so any company that guarantees a number one ranking is either guessing or misleading you. What we commit to is the work — technical fixes, on-page optimisation, content, Google Business Profile — and a monthly report showing rankings and, more importantly, how many enquiries came in.' },
        { q: 'What are AEO and GEO?', a: 'AEO (answer engine optimisation) structures your content, FAQs and schema so you are the direct answer in featured snippets and voice search. GEO (generative engine optimisation) makes your business readable and trustworthy to AI tools such as ChatGPT, Perplexity and Gemini, so they recommend you. Both sit alongside ordinary SEO, not instead of it.' },
        { q: 'How much does SEO cost in Nepal?', a: 'With us, from NPR 30,000 a month, excluding 13% VAT. SEO is scoped to your competition rather than sold as a fixed package — a local restaurant needs a different scope than a national store — so the price follows an AI-search audit and a written proposal.' },
        { q: 'What does the AI-search audit cover?', a: 'How your business appears today on Google and in AI tools such as ChatGPT and Perplexity, what your competitors are doing, and what would change your visibility. It carries no cost, and a written proposal follows.' },
        { q: 'Do you buy backlinks?', a: 'No. We work white-hat only: no spam directories, no fake backlinks and no AI-spam content. Off-page authority is built through genuine mentions and listings, because shortcuts can get a business penalised.' },
      ],
      icon: 'search',
      name: 'Search & AI visibility',
      price: { from: 30000, per: 'month' },
      intro: 'Found on Google — and inside AI tools like ChatGPT and Perplexity, where people now ask for recommendations.',
      highlights: ['SEO, AEO and GEO', 'Local SEO and Google Business Profile', 'Reported in enquiries'],
      features: [
        'Search engine optimization (SEO) — keyword research, on-page optimization, technical SEO, off-page authority building',
        "Answer Engine Optimization (AEO) — structured content, FAQs and schema, so you're the direct answer in featured snippets and voice search",
        'Generative Engine Optimization (GEO) — so ChatGPT, Perplexity and Gemini recommend your business',
        'Local SEO — Google Business Profile and local search',
        'Monthly reporting — in enquiries and cost per lead, not vanity rankings',
        'Everything in your name — your Analytics, your Search Console, your data',
        'White-hat only — no spam directories, no fake backlinks, no AI-spam content',
      ],
      note: 'SEO is scoped to your competition, not sold as a fixed box — a local restaurant needs a different scope than a national store. We assess it and send a written proposal after a consultation. We do not guarantee rankings; anyone who does is misleading you.',
      cta: { label: 'Request an AI-search audit', need: 'seo' },
      ctaNote: 'The audit carries no cost.',
    },
    {
      id: 'social',
      slug: 'social-media',
      scene: 'social',
      kicker: 'Grow — Social media marketing',
      h1: 'Social media marketing in Kathmandu',
      title: 'Social Media Marketing in Kathmandu — Nine Technology',
      description: 'Facebook, Instagram and TikTok run for businesses in Nepal: strategy, designs, bilingual captions, posting and replies. From NPR 20,000/month.',
      answer: 'Nine Technology runs Facebook, Instagram and TikTok for businesses in Nepal — content strategy, a monthly calendar, custom designs, English and Nepali captions, posting, replies and reels — from NPR 20,000 a month, reported in reach, engagement and enquiries.',
      facts: [
        { icon: 'calendar', value: 'Monthly calendar', label: 'Planned and approved with you' },
        { icon: 'chat', value: 'English and Nepali', label: 'Captions and replies' },
        { icon: 'social', value: 'Three platforms', label: 'Facebook, Instagram, TikTok' },
        { icon: 'gauge', value: 'Reported in enquiries', label: 'With reach and engagement' },
      ],
      flow: [
        { name: 'Strategy', body: 'What to post and why, built around your business.' },
        { name: 'Calendar approved', body: 'The month planned ahead and agreed with you.' },
        { name: 'Design and captions', body: 'Graphics, carousels and reels, captioned in English and Nepali.' },
        { name: 'Post and reply', body: 'Scheduled across all three platforms; comments and messages answered.' },
        { name: 'Monthly report', body: 'Reach, engagement and enquiries, and what changes next month.' },
      ],
      related: ['video', 'ads'],
      faqs: [
        { q: 'How many posts do we get each month?', a: 'Post and reel counts are agreed in writing each month, based on your plan and your goals. You approve the monthly content calendar before anything is published.' },
        { q: 'Do you reply to comments and messages?', a: 'Yes. Community management is included: replying to comments and messages on Facebook, Instagram and TikTok during business hours.' },
        { q: 'Do you make the reels?', a: 'We edit reels from footage you provide or we shoot. On-site shooting is a separate service, Content & video production, which is often combined with social media marketing.' },
        { q: 'Can the captions be in Nepali?', a: 'Yes. Captions are written in English and Nepali, with hashtags, for the customers you actually serve.' },
        { q: 'Who owns our pages?', a: 'You do. Your Facebook, Instagram and TikTok pages stay registered to your business, and you keep full access to them at all times.' },
      ],
      icon: 'social',
      name: 'Social media marketing',
      price: { from: 20000, per: 'month' },
      intro: 'We run your Facebook, Instagram and TikTok — plan it, design it, post it, and reply to your customers — so your pages stay active and bring in enquiries.',
      highlights: ['Monthly content calendar', 'Designs, captions and reels', 'Replies to comments and messages'],
      features: [
        'Content strategy — what to post and why, built around your business',
        'Monthly content calendar — planned ahead and approved with you',
        'Post designs — custom graphics and carousels, in your brand',
        'Captions — English and Nepali, with hashtags',
        'Scheduling & posting — across Facebook, Instagram and TikTok',
        'Community management — replying to comments and messages in business hours',
        'Reels editing — short videos edited for your pages (from footage you or we provide)',
        'Monthly report — reach, engagement, and enquiries',
      ],
      note: 'Post and reel counts are agreed in writing each month. On-site video shooting is a separate service (Content & video), often combined with this one.',
      cta: { label: 'Request a proposal', need: 'social' },
    },
    {
      id: 'video',
      slug: 'video-production',
      scene: 'video',
      kicker: 'Grow — Content & video',
      h1: 'Video production in Kathmandu',
      title: 'Video Production in Kathmandu — Nine Technology',
      description: 'Reels, ads, product videos and brand films shot at your business in Nepal, with AI video where a shoot is not possible. From NPR 25,000.',
      answer: 'Nine Technology shoots video at businesses in Nepal and turns it into content that gets watched — reels, ads, product videos, documentaries and brand films — as a one-time production from NPR 25,000 or monthly content from NPR 35,000 a month. Where a shoot is not possible, the video is produced with AI.',
      facts: [
        { icon: 'video', value: 'Shot on location', label: 'At your business' },
        { icon: 'launch', value: 'Ready to use', label: 'Delivered for your channels' },
        { icon: 'calendar', value: 'One-time or monthly', label: 'From NPR 25,000' },
        { icon: 'agent', value: 'AI video', label: 'Where a shoot is not possible' },
      ],
      flow: [
        { name: 'Consultation', body: 'You tell us the goal and where the video will be used.' },
        { name: 'Plan the shoot', body: 'Formats, scenes, locations and schedule, agreed in writing.' },
        { name: 'Shoot', body: 'On location at your business, with photography on the same day if needed.' },
        { name: 'Edit and produce', body: 'Cut, captioned and formatted for each platform.' },
        { name: 'Deliver', body: 'Ready-to-use content, for your pages, ads and website.' },
      ],
      related: ['social', 'ads'],
      faqs: [
        { q: 'Can you shoot video at our business?', a: 'Yes. We come to your business and shoot on location, as a one-time production from NPR 25,000 or as monthly content from NPR 35,000 a month.' },
        { q: 'What if a shoot is not possible?', a: 'Where a shoot is not possible, we produce the video with AI — explainers, graphics and variations. Real places and real products are filmed for real.' },
        { q: 'Should we choose one-time or monthly?', a: 'One-time production suits a specific video or a single shoot, such as a product launch or a brand film. Monthly content suits businesses that need regular reels and videos for their pages. We recommend one at the consultation.' },
        { q: 'Do you take photographs too?', a: 'Yes. Photography can be done on the same shoot, so your pages, website and ads share the same look.' },
        { q: 'Can the videos be used in our ads?', a: 'Yes. The videos we make are delivered ready for your pages and your ads, and our paid advertising service uses them directly.' },
      ],
      icon: 'video',
      name: 'Content & video production',
      price: { from: 25000 },
      intro: 'We come to your business, shoot it properly, and turn it into video that gets watched — reels, ads, product videos, documentaries, or a full brand film. Where a shoot is not possible, we produce video with AI.',
      highlights: ['Shot on location, properly', 'Reels, ads and brand films', 'One-time or monthly'],
      makes: [
        'Reels & short-form video', 'Product & service videos', 'Advertisements & promos', 'Documentary & brand films',
        'Presenter videos', 'Event coverage', 'Testimonials', 'Company profiles', 'AI-generated video & explainers', 'Photography on the same shoot',
      ],
      makesNote: '…and whatever else your business needs — every project is different.',
      tiers: [
        { name: 'One-time production', price: { from: 25000 }, body: 'A specific video or a single shoot.' },
        { name: 'Monthly content', price: { from: 35000, per: 'month' }, body: 'Regular reels and videos, every month.' },
      ],
      note: 'We scope video to what you actually need. It starts with a consultation: you tell us the goal, we plan the shoot, produce it, and deliver ready-to-use content.',
      cta: { label: 'Request a proposal', need: 'video' },
    },
    {
      id: 'ads',
      slug: 'paid-ads',
      scene: 'ads',
      kicker: 'Grow — Paid advertising',
      h1: 'Paid advertising in Kathmandu',
      title: 'Paid Advertising in Kathmandu — Nine Technology',
      description: 'Facebook, Instagram, TikTok and Google ads for businesses in Nepal, reported in cost per enquiry. Management from NPR 8,000/month; budget paid by you.',
      answer: 'Nine Technology runs Facebook, Instagram, TikTok and Google ads for businesses in Nepal and reports them in enquiries and cost per enquiry. Management starts from NPR 8,000 a month; your ad budget is paid directly to the platform from your own account, never marked up.',
      facts: [
        { icon: 'ads', value: 'Four platforms', label: 'Facebook, Instagram, TikTok, Google' },
        { icon: 'gauge', value: 'Cost per enquiry', label: 'Tracked on every campaign' },
        { icon: 'coins', value: 'Never marked up', label: 'Budget paid by you' },
        { icon: 'sheet', value: 'VAT bills', label: 'For our fees' },
      ],
      flow: [
        { name: 'Find your audience', body: 'Who to reach, where, and what makes them act.' },
        { name: 'Create the ads', body: 'From the reels, videos and graphics we make for you.' },
        { name: 'Launch with tracking', body: 'Meta Pixel and Google Analytics, so every enquiry is measured.' },
        { name: 'Test and optimise', body: 'Every week, moving budget to what brings enquiries.' },
        { name: 'Monthly report', body: 'Reach, clicks, enquiries and cost per enquiry.' },
      ],
      related: ['video', 'seo'],
      faqs: [
        { q: 'How does paid advertising pricing work?', a: 'There are two parts. Our management fee starts from NPR 8,000 a month: a flat fee while your ad spend is under NPR 50,000 a month, and 15% of ad spend above that. Your ad budget is set by you and paid directly to the platform from your own account.' },
        { q: 'Is the ad budget included in your fee?', a: 'No. The ad budget is your money, paid directly to Facebook, Instagram, TikTok or Google from your own account — never marked up and never hidden — so you always see exactly what was spent.' },
        { q: 'Which platforms do you advertise on?', a: 'Facebook, Instagram, TikTok and Google. We recommend the mix at the consultation, based on where your customers are.' },
        { q: 'How do you measure results?', a: 'Tracking is set up with Meta Pixel and Google Analytics, so every enquiry is measured. The monthly report shows reach, clicks, enquiries and cost per enquiry.' },
        { q: 'Do you provide VAT bills?', a: 'Yes. VAT bills are provided for our management fees.' },
      ],
      icon: 'ads',
      name: 'Paid advertising',
      price: { from: 8000, per: 'month' },
      priceSuffix: '+ your ad budget',
      intro: 'Get in front of the right people, fast. Ads on Facebook, Instagram, TikTok and Google that reach the customers most likely to buy, reported in enquiries and cost per enquiry.',
      highlights: ['Facebook, Instagram, TikTok, Google', 'Tracking on every enquiry', 'Budget paid directly by you'],
      features: [
        'Find your audience — who to reach, where, and what makes them act',
        'Create the ads — using the reels, videos and graphics we make for you',
        'Set up & run campaigns — Facebook, Instagram, TikTok, Google',
        'Tracking setup — Meta Pixel and Google Analytics, so every enquiry is measured',
        'Test & optimise — weekly',
        'Bilingual ads — Nepali and English',
        'Monthly report — reach, clicks, enquiries, cost per enquiry',
        'VAT bills provided',
      ],
      money: [
        { name: 'Our management fee', value: 'From NPR 8,000/mo', body: 'For planning, creating, running and reporting on your campaigns.' },
        { name: 'Your ad budget', value: 'Set by you', body: 'Paid directly to the platform from your own account. Your money — never marked up, never hidden.' },
      ],
      feeRule: [
        ['Ad spend under NPR 50,000/month', 'Flat fee, from NPR 8,000/month'],
        ['Ad spend over NPR 50,000/month', '15% of ad spend'],
      ],
      note: 'The fee is scoped to your budget at the consultation.',
      cta: { label: 'Request an ads consultation', need: 'ads' },
      ctaNote: 'The consultation carries no cost.',
    },
  ],
  process: [
    { name: 'Consultation and audit', body: 'Where your customers come from today, and what your competitors are doing.' },
    { name: 'Strategy and proposal', body: 'Channels, content, budget and targets, agreed in writing.' },
    { name: 'Set-up in your name', body: 'Accounts, tracking and analytics, registered to your business.' },
    { name: 'Run and optimise', body: 'Content published, campaigns tested and improved every week.' },
    { name: 'Monthly report', body: 'Enquiries and cost per enquiry first, with the next month planned.' },
  ],
  faqs: [
    {
      q: 'Which marketing service should we start with?',
      a: 'It depends on where your customers come from today. Businesses that are hard to find usually start with search and AI visibility; businesses with an audience on social media usually start with social media marketing and video. We recommend a starting point at the consultation.',
    },
    {
      q: 'Can we combine services?',
      a: 'Yes, and they work better together. The reels and videos we produce feed your social pages and your ads, and every service reports in the same measure: enquiries.',
    },
    {
      q: 'Who owns the accounts and the data?',
      a: 'You do. Your Analytics, Search Console, social pages and ad accounts are registered in your name, and ad budgets are paid from your own account. If you ever stop working with us, you keep everything.',
    },
    {
      q: 'How do you report results?',
      a: 'Every month, in enquiries and cost per enquiry first — the numbers that affect revenue — followed by reach, engagement and rankings, and the plan for the next month.',
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
  { value: 'redesign', label: 'Website redesign or rescue' },
  { value: 'software', label: 'Custom software' },
  { value: 'mobile-app', label: 'Mobile app' },
  { value: 'seo', label: 'Search & AI visibility (SEO, AEO, GEO)' },
  { value: 'social', label: 'Social media marketing' },
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
  { path: '/services/grow', name: 'Digital marketing overview: search, social, video and ads' },
  { path: '/services/seo', name: 'SEO and AI search visibility' },
  { path: '/services/social-media', name: 'Social media marketing' },
  { path: '/services/video-production', name: 'Video production' },
  { path: '/services/paid-ads', name: 'Paid advertising' },
  { path: '/services/automate', name: 'AI chat, workflow automation and AI agents' },
  { path: '/services/support', name: 'Domain and hosting, maintenance and care plans' },
];
