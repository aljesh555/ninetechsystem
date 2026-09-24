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
  { title: 'Free scoping call', body: 'We learn how your business runs.' },
  { title: 'Scope and price in writing', body: 'You approve it before anything starts.' },
  { title: 'Build in stages', body: 'You see it come together. No six-week silence.' },
  { title: 'Launch and hand over', body: 'Everything in your name, plus training.' },
  { title: 'Support', body: 'Included after launch, then a care plan if you want one.' },
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
    price: { from: 200000 },
    href: '/services/software',
    icon: 'software',
  },
  'mobile-app': {
    name: 'App',
    short: "Android and iPhone apps for the phones your customers actually own. We'll tell you honestly when a web app does the job instead.",
    price: null,
    priceNote: 'Quoted',
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
    priceNote: 'Free process review',
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
    tagline: "We don't disappear after launch.",
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
  { q: 'Drowning in messages?', a: 'AI chat & Workflow automation', links: ['/services/automate'] },
  { q: "Already have a site that's slow or broken?", a: 'We fix and redesign without losing your rankings', links: ['/contact?need=website'] },
];

/* --------------------------------------------------------------------------
   /services/website
   -------------------------------------------------------------------------- */

export const website = {
  offers: [
    {
      id: 'landing',
      name: 'Landing / single page',
      short: 'Landing page',
      price: { from: 20000, to: 35000 },
      time: '3–7 days',
      intro: "A focused, single-scroll site to get you online fast. For a campaign, a launch, a professional's profile, or a business that wants to be online this week and grow later.",
      features: [
        'Custom-designed page — built for your brand, not a template',
        'Mobile-responsive, works on every phone',
        'Fast loading, built for Nepali networks',
        'Search-ready — built for Google and AI search (SEO, AEO, GEO)',
        'Contact form + WhatsApp button',
        'SSL secure (https)',
        'Social media links',
        'Google Business Profile setup',
        'Everything registered in your name',
        'Admin access to edit text and images',
        '14 days support',
      ],
      note: 'Content writing and photography can be arranged separately.',
      cta: { label: 'Get a quote for a landing page', need: 'landing' },
    },
    {
      id: 'business',
      name: 'Business website',
      short: 'Business website',
      price: { from: 50000, to: 120000 },
      time: '2–3 weeks',
      intro: 'A complete, custom-built website engineered to load fast, rank on Google and AI search, and turn visitors into enquiries.',
      features: [
        'Custom design from scratch — built for your brand, never a template',
        '5–8 pages, expandable',
        'Mobile-first, tested on real Nepali devices and networks',
        'Fast loading — Core Web Vitals optimised',
        'Full SEO + AEO + GEO — found on Google and in AI search (ChatGPT, Perplexity, Gemini)',
        'Structured data / schema markup built in',
        'CMS — edit your own text, images, pages and content',
        'Contact form + WhatsApp integration',
        'Blog / news section',
        'Photo gallery',
        'Google Maps integration',
        'SSL secure (https)',
        'Social media integration',
        'Google Business Profile setup',
        'Analytics + Search Console setup — see your visitors and search performance',
        'Speed & security hardening',
        'Everything registered in your name',
        'Admin training session',
        '30 days post-launch support',
      ],
      note: 'Content writing, professional photography and bilingual (English + Nepali) can be arranged separately.',
      cta: { label: 'Get a quote for a business website', need: 'website' },
    },
    {
      id: 'ecommerce',
      name: 'E-commerce / online store',
      short: 'E-commerce',
      tableName: 'E-commerce store',
      price: { from: 90000, to: 250000 },
      time: '3–6 weeks',
      intro: 'A complete online store where customers browse, pay, and you manage every order from your phone.',
      lead: 'Everything in the business website, plus:',
      clusters: [
        {
          name: 'Store & products',
          items: ['Custom store design', 'Product catalogue (categories, images, descriptions)', 'Product variants (size, colour, options)', 'Product search & filters', 'Related / featured products'],
        },
        {
          name: 'Buying & payment',
          items: ['Shopping cart & checkout', 'eSewa, Khalti & Fonepay integration', 'Cash-on-delivery', 'Discount codes & offers', 'Secure checkout (SSL)'],
        },
        {
          name: 'Orders & delivery',
          items: ['Order management dashboard — manage every order from your phone', 'Delivery zones & charges by area', 'Automatic order confirmation by WhatsApp, SMS or email', 'Order status tracking for customers', 'Abandoned-cart recovery'],
        },
        {
          name: 'Customers & stock',
          items: ['Customer accounts & order history', 'Stock / inventory management with low-stock alerts', 'Customer contact capture for future marketing'],
        },
        {
          name: 'Growth & management',
          items: ['Full SEO + AEO + GEO for your products', 'Sales & analytics reports', 'CMS — add and edit products yourself', 'Admin training session', '30 days support'],
        },
      ],
      addons: ['Live courier integration (Pathao / Nepal Can Move)', 'Multi-vendor marketplace', 'Bank & international payments', 'Product photography & bulk data entry'],
      scope: [
        "Payment integration is included. You'll need your own eSewa/Khalti/Fonepay merchant accounts — we guide you through setting them up. Their one-time setup fee (around NPR 20,000–30,000) and 1–2% per-transaction fees are paid by you directly to them, not to us.",
        'Order status tracking is included. Live courier tracking with Pathao or Nepal Can Move can be added — you\'ll need a merchant account with the courier.',
      ],
      cta: { label: 'Get a quote for a store', need: 'store' },
    },
    {
      id: 'booking',
      name: 'Booking & web systems',
      short: 'Booking & web systems',
      tableName: 'Booking / web system',
      price: null,
      priceNote: 'Quoted after a free call',
      time: '4–8 weeks',
      intro: 'Appointments, reservations and enquiries in one system instead of a notebook and three phone numbers. For clinics, salons, hotels, trekking agencies, training centres.',
      features: ['Booking / enquiry flows', 'Calendar & availability', 'Staff logins', 'Notifications (email/WhatsApp)', 'Dashboard', 'Training', '30 days support'],
      cta: { label: 'Book a free scoping call', need: 'booking-system' },
    },
  ],
  priceFootnote: "Prices exclude 13% VAT. On the first call we narrow the range to a fixed number; once agreed it doesn't move unless you change the scope.",
  faqs: [
    {
      q: 'How much does a website cost in Nepal?',
      a: 'With us, a landing page costs NPR 20,000 to 35,000, a business website NPR 50,000 to 1,20,000, and an online store NPR 90,000 to 2,50,000, all excluding 13% VAT. Where you land in the range depends on the number of pages, whether you need payments or logins, and how much of the content already exists. On the first call we narrow it to one fixed price, in writing, and it does not change unless you change the scope.',
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
      q: 'What if I want changes after the scope is agreed?',
      a: 'Changes inside the agreed scope are part of the job. If you want something outside it, we quote the change in writing first, and nothing extra is built until you approve it.',
    },
  ],
};

/* --------------------------------------------------------------------------
   /services/software
   -------------------------------------------------------------------------- */

export const software = {
  price: { from: 200000 },
  systems: [
    { name: 'Portals', body: 'Customer or partner portals with role-based access.' },
    { name: 'Dashboards', body: 'Operational views for sales, support, inventory, or admissions.' },
    { name: 'Workflow automation', body: 'Cron jobs, queues, notifications, and data sync.' },
    { name: 'Integrations', body: 'Payments, email, CRM, spreadsheets, and external APIs.' },
    { name: 'Data systems', body: 'Search, filtering, exports, and clean admin UX.' },
    { name: 'Reliability upgrades', body: 'Refactors, caching, indexing, and performance fixes.' },
  ],
  features: [
    'Roles and permissions that actually hold — each person sees only what they should',
    'A dashboard your team can run without calling us',
    "Reports that answer the questions you'll ask six months in, not just today",
    "A database built for where you're going, not just where you are",
    'Payments, SMS and other integrations wired to real providers and tested end to end',
    'One round of migration from your existing Excel or files',
    'Works on phone and computer',
    'Written documentation and training, so this is maintainable by anyone',
    '60 days support after launch',
    'Everything in your name',
  ],
  priceMovers: ['Modules and features', 'Number of users', 'Integrations', 'Complexity of reports and workflows'],
  faqs: [
    {
      q: 'How much does custom software cost in Nepal?',
      a: 'Most custom software we build starts from NPR 2,00,000, excluding 13% VAT. The final price depends on the number of modules, the number of users, the integrations it needs and how complex the reports and workflows are. After a free scoping call you get a fixed price in writing.',
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
      q: 'Can it grow with my business?',
      a: 'Yes. The database is designed for where the business is going, not just where it is, so new modules and users can be added later without starting again. Each addition is quoted in writing first.',
    },
    {
      q: 'Do you support it after launch?',
      a: 'Yes. 60 days of support are included after launch. After that you can move to a monthly care plan, or call us when you need something.',
    },
  ],
};

/* --------------------------------------------------------------------------
   /services/app
   -------------------------------------------------------------------------- */

export const app = {
  price: { from: 500000 },
  time: '8–16 weeks',
  whenReal: ['Your customers use it daily', 'You need push notifications', 'It must work offline', 'You need in-app payments', "You're building a product, not a brochure"],
  features: [
    'One app, both stores — Android and iPhone',
    'Tested on the phones your customers actually own, not just a flagship',
    "Works on a weak connection, and degrades gracefully when there isn't one",
    'Push notifications set up and ready',
    'In-app payments if you need them',
    'Store listings, screenshots and the approval process handled',
    'Crash tracking after launch, so we find problems before your users tell you',
    '60 days support',
  ],
  faqs: [
    {
      q: 'Do I need an app or a website?',
      a: 'Most businesses need a website, not an app. A well-built mobile website or a progressive web app works on every phone, costs far less and needs no app-store approval. A native app makes sense when customers use it daily, or you need push notifications, offline use or in-app payments. We tell you which you need before you spend anything.',
    },
    {
      q: 'How much does an app cost in Nepal?',
      a: 'Native Android and iPhone apps start from NPR 5,00,000 with us, excluding 13% VAT, and are quoted per project after a free call. A progressive web app costs far less, and for many businesses it does the same job.',
    },
    {
      q: 'How long does an app take?',
      a: 'A native app takes 8 to 16 weeks, depending on the features. A progressive web app usually ships in a few weeks.',
    },
    {
      q: 'Will it work on cheap phones?',
      a: 'Yes. We test on the mid-range Android phones your customers actually own, not just a flagship, and build it to keep working on a weak connection.',
    },
    {
      q: 'Do you handle the Play Store and App Store?',
      a: 'Yes. We prepare the store listings and screenshots and take the app through the approval process. The developer accounts are registered in your name, and their fees are paid by you directly to Google and Apple.',
    },
  ],
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
      priceNote: 'Free process review',
      includes: [],
      excludes: [],
      note: 'It starts with a free process review: a 30 to 60 minute walkthrough of your daily work, after which you get a written scope and price.',
      cta: { label: 'Book a free process review', need: 'ai-agents' },
    },
  ],
  faqs: [
    {
      q: 'What is AI automation and does my business need it?',
      a: 'AI automation means software doing the repetitive work your staff currently do by hand — answering the same WhatsApp questions, copying orders into a sheet, sending fee reminders, typing the daily sales report. You need it if your team spends more than an hour a day on work that follows the same steps every time. We start with a free 30 to 60 minute process review and tell you honestly if the answer is no.',
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
      q: 'What is the free process review?',
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
