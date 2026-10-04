/**
 * The package builder's price list: the four monthly growth plans, every unit
 * that can be added to them, and the one-time work sold alongside. Read by
 * /builder, and by services.js for the SEO / AEO / GEO tiers on /services/seo.
 * Every figure is NPR, excluding 13% VAT.
 *
 * This file ships to the browser. It holds prices a client may see and nothing
 * else: no delivery costs, margins or salaries.
 *
 * Unit prices are what a client pays for a piece bought on its own. They are
 * deliberately priced so that a plan always costs less than its own contents
 * bought separately; the builder uses that gap as the sales story.
 */

export const VAT = 0.13;

/** Volume discounts, applied separately to the monthly and one-time totals.
 *  The highest threshold reached wins; they do not stack with each other. */
export const discounts = {
  monthly: [
    { min: 100000, rate: 0.1 },
    { min: 50000, rate: 0.05 },
  ],
  oneTime: [
    { min: 200000, rate: 0.1 },
    { min: 100000, rate: 0.05 },
  ],
};

/** Paying six months up front takes a further 5% off the monthly fee. */
export const prepayRate = 0.05;

/** A website costs less when it comes with a monthly plan: the plan carries a
 *  one-time discount on it, and that is the reason shown to the client. This is
 *  the one number to change the bundle offer. The separate 12-month free-website
 *  credit (plan.freeWebsite) is unchanged and takes precedence on a 12-month term. */
export const planWebsiteDiscount = 0.2;

/** Search and AI visibility costs less inside a monthly plan as well: this much
 *  off the tier, or off the upgrade when the plan already includes a lower one.
 *  /services/seo shows the full price, which is what SEO costs on its own. */
export const planSeoDiscount = 0.2;

/** Monthly, per unit. `max` bounds the stepper. */
export const units = {
  reels: { label: 'Short videos (reels)', unit: 2500, max: 40 },
  graphics: { label: 'Graphic designs', unit: 1000, max: 60 },
  photos: { label: 'Edited photos', unit: 300, max: 100, step: 5 },
  campaigns: { label: 'Active ad campaigns', unit: 8000, max: 10 },
  boosts: { label: 'Boosted posts', unit: 1500, max: 20 },
  halfDays: { label: 'Filming half-days', unit: 8000, max: 12 },
  creators: { label: 'Hired creators', unit: 7500, max: 6, note: 'estimate; billed at cost, agreed before booking' },
};

/** Posting and community management. Facebook and Instagram are the base. */
export const social = { base: 10000, extraPlatform: 3000 };

export const platforms = [
  { id: 'facebook', label: 'Facebook', base: true },
  { id: 'instagram', label: 'Instagram', base: true },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube Shorts' },
  { id: 'linkedin', label: 'LinkedIn' },
];

/** Tiered monthly services. Level 0 is "none". */
export const levels = {
  seo: {
    label: 'SEO / AEO / GEO',
    // Also read by services.js: /services/seo shows these names, prices and
    // counts, so the service page and the builder always quote the same tier.
    // Google Business Profile set-up is part of every plan already, so it is not
    // a tier here. Without a plan, the Light tier includes GBP set-up.
    options: [
      { name: 'None', body: 'No search work this month.', price: 0 },
      { name: 'Light', keywords: 5, articles: 1, body: '5 keywords and one article a month, on-page and technical SEO, AEO schema so AI answers can quote you, and local SEO. GBP set-up included if you have no plan.', price: 18000 },
      { name: 'Standard', keywords: 10, articles: 2, body: '10 keywords and two articles a month, GEO monitoring across ChatGPT, Gemini and Perplexity, and quality backlinks.', price: 30000 },
      { name: 'Growth', keywords: 20, articles: 4, body: '20 keywords and four articles a month, GEO off-site citations and digital PR, Nepali backlink building, competitor tracking and a strategy call.', price: 49000 },
      { name: 'Full', keywords: 40, articles: 6, body: '40 keywords and six articles a month, and an infographic every month.', price: 77000 },
    ],
  },
  ai: {
    label: 'AI assistant',
    options: [
      { name: 'None', body: 'Your team answers every message.', price: 0 },
      { name: 'Messenger & Instagram', body: 'Answers FAQs in Nepali and English on both inboxes.', price: 5000 },
      { name: '+ WhatsApp', body: 'Adds WhatsApp, up to 1,000 conversations a month.', price: 8000 },
      { name: '+ Website & leads', body: 'Adds website chat; every lead logged, a daily summary to the owner.', price: 12000 },
      { name: '+ Office automation', body: 'Plus one new office automation built every quarter.', price: 20000 },
    ],
  },
  care: {
    label: 'Website care',
    options: [
      { name: 'None', body: 'You look after the website yourself.', price: 0 },
      { name: 'Hosting & security', body: 'Hosting, updates, backups and security monitoring.', price: 5000 },
      { name: '+ 2 edits a month', body: 'Text, image or price changes, done for you.', price: 7000 },
      { name: '+ 4 edits a month', body: 'Room for a new offer or page section every week.', price: 9000 },
      { name: '+ 8 edits, priority', body: 'Priority fixes, same working day.', price: 12000 },
    ],
  },
};

/** One-off charge to build and train the assistant when bought without a plan. */
export const aiSetup = 15000;

/** `setup` is a one-time fee charged when a plan starts. It is 0 on every plan
 *  for now: no setup line is shown or charged. Set a figure here to bring it
 *  back; a 12-month commitment then waives it again. */
export const plans = [
  {
    id: 'pahichan',
    name: 'Pahichan',
    promise: 'Be seen',
    price: 14999,
    setup: 0,
    bestFor: 'A shop or clinic with no marketing yet',
    adBudget: 'Rs 3,000–6,000',
    includes: {
      reels: 2, graphics: 8, photos: 0, campaigns: 0, boosts: 2, halfDays: 0, creators: 0,
      platforms: ['facebook', 'instagram'], seo: 0, ai: 1, care: 1,
    },
    features: [
      'No filming: we work from your photos and clips',
      '2 motion posts and 8 graphic posts',
      'Facebook and Instagram',
      '2 boosted posts',
      'Google Business Profile set up',
      'AI assistant on Messenger and Instagram',
      'Hosting and security, if hosted with us',
      'One-page monthly report on WhatsApp',
    ],
    reply: 'Replies within 2 working days',
  },
  {
    id: 'suruwat',
    name: 'Suruwat',
    promise: 'Get customers',
    price: 29999,
    setup: 0,
    bestFor: 'A local business ready to advertise',
    adBudget: 'Rs 6,000–12,000',
    freeWebsite: { label: 'Landing page', value: 25000 },
    includes: {
      reels: 4, graphics: 8, photos: 10, campaigns: 1, boosts: 0, halfDays: 1, creators: 0,
      platforms: ['facebook', 'instagram', 'tiktok'], seo: 0, ai: 2, care: 2,
    },
    features: [
      'Half a day of filming on location, every month',
      '4 reels, 10 edited photos, 8 graphic posts',
      'Facebook, Instagram and TikTok',
      '1 Meta ad campaign, managed',
      'Monthly Google profile posts and review replies',
      'AI assistant adds WhatsApp, up to 1,000 chats',
      'Website care with 2 edits a month',
    ],
    reply: 'Replies within 1 working day',
  },
  {
    id: 'pragati',
    name: 'Pragati',
    promise: 'Grow faster',
    price: 49999,
    setup: 0,
    recommended: true,
    bestFor: 'A business with steady sales that wants more',
    adBudget: 'Rs 12,000–25,000',
    freeWebsite: { label: 'Business website', value: 60000 },
    includes: {
      reels: 8, graphics: 10, photos: 20, campaigns: 2, boosts: 0, halfDays: 2, creators: 0,
      platforms: ['facebook', 'instagram', 'tiktok'], seo: 1, ai: 3, care: 3,
    },
    features: [
      'A full day of filming every month',
      '8 reels, 20 edited photos, 10 graphic posts',
      'A hired creator on camera every other month',
      '2 Meta campaigns, new creative tested weekly',
      'A monthly article, on-page fixes, schema for AI answers',
      'AI assistant on your website too, every lead logged',
      'Website care with 4 edits a month',
      'Monthly report and a 30-minute call',
    ],
    reply: 'Replies the same day',
  },
  {
    id: 'shikhar',
    name: 'Shikhar',
    promise: 'Lead your market',
    price: 99999,
    setup: 0,
    bestFor: 'Multi-branch, brand or e-commerce',
    adBudget: 'Rs 25,000 and up',
    freeWebsite: { label: 'Business website', value: 60000 },
    includes: {
      reels: 12, graphics: 14, photos: 30, campaigns: 4, boosts: 0, halfDays: 4, creators: 1,
      platforms: ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin'], seo: 2, ai: 4, care: 4,
    },
    features: [
      'Two days of filming a month, and an ad film every 6 months',
      '12 reels, 30 edited photos, 14 graphic posts',
      'A hired creator on camera every month',
      'Meta, Google and TikTok ads with retargeting, up to 4 campaigns',
      'Two articles, backlinks, and an AI-search visibility check',
      'A new office automation every quarter',
      'Website care with 8 edits and priority fixes',
      'A named manager, and a call every 2 weeks',
    ],
    reply: 'Same-day replies from a named manager',
  },
];

/** Websites: a base price that covers `pages`, then a price per extra page. */
export const websites = {
  landing: { label: 'Landing page', blurb: 'One focused page with WhatsApp and a form, fast on 4G.', base: 20000, pages: 1, extraPage: 6000, maxPages: 4, bilingual: 5000 },
  business: { label: 'Business website', blurb: '5–8 pages, you edit it yourself, Nepali and English, SEO set up.', base: 60000, pages: 8, minPages: 5, extraPage: 5000, maxPages: 30, bilingual: 0 },
  store: { label: 'Online store', blurb: 'Catalogue, cart and checkout with eSewa, Khalti and Fonepay.', base: 100000, pages: 10, minPages: 5, extraPage: 5000, maxPages: 40, bilingual: 0, from: true },
};

/** Mobile apps. The first platform carries the base; the second adds a share. */
export const apps = {
  tiers: {
    simple: { label: 'Simple', body: 'Information, catalogue, booking or enquiry forms.', base: 250000 },
    standard: { label: 'Standard', body: 'Accounts, payments, notifications and an admin panel.', base: 350000 },
    advanced: { label: 'Advanced', body: 'Marketplace, live tracking, real-time features or integrations.', base: 500000 },
  },
  secondPlatform: 0.35,
  care: 10000,
};

export const oneTime = {
  software: { label: 'Custom web app or business software', price: 250000, from: true },
  server: { label: 'Server setup: VPS, security, backups, monitoring', price: 15000 },
  agentic: { label: 'Agentic AI office setup', base: 75000, baseWorkflows: 3, extra: 20000, care: 8000, max: 8 },
  adFilm: {
    standard: { label: 'Ad film, 30–60 sec: script, crew, one talent', price: 50000 },
    premium: { label: 'Premium ad film: multiple locations and talent', price: 100000 },
  },
  photoshoot: { label: 'Product or menu photoshoot, 25 edited photos', price: 12000, max: 10 },
  extraHalf: { label: 'Extra shoot, half day', price: 8000, max: 10 },
  extraFull: { label: 'Extra shoot, full day', price: 15000, max: 10 },
  brandKit: { label: 'Brand kit: logo refresh, colours, fonts, post templates', price: 25000 },
  festival: { label: 'Festival pack: 4 extra reels and a festive set', price: 15000, max: 4 },
  healthCheck: { label: 'Digital Health Check', price: 10000, note: 'Credited in full if you sign within 30 days.' },
};

export const terms = [
  { months: 3, name: '3 months', body: 'The minimum. Then month to month with 30 days’ notice.' },
  { months: 6, name: '6 months, paid up front', body: '5% off the monthly fee.' },
  { months: 12, name: '12 months', body: plans.some((p) => p.setup > 0) ? 'Setup fee waived, and a free website on Suruwat and above.' : 'A free website on Suruwat and above.' },
];

/** What every plan includes, and the terms, as the client reads them. */
export const everyPlan = [
  'Every account, page, ad account and the domain stay in your name.',
  'Nothing is posted without your approval.',
  'Captions in Nepali and English.',
  'Festival posts for Dashain, Tihar and Nepali New Year.',
];

export const clientTerms = [
  'Monthly fee paid in advance by the 1st of each month. Work pauses after 7 days unpaid.',
  'One-time work: 50% to start, 50% on delivery.',
  'Every deliverable in your plan, every month. Anything we miss is credited on the next bill.',
  'Your ad budget is paid by you directly to Meta, Google or TikTok. We never mark it up.',
  'Two rounds of revisions per piece. Unused deliverables carry over for one month only.',
  'We promise the work and honest reporting, not a number of sales or followers.',
  'Prices exclude 13% VAT. A VAT bill is issued every month.',
  'This quote is valid for 15 days.',
];
