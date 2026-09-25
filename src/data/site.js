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
    title: 'Everything documented before we start',
    body: 'The problem, the solution, the scope, the timeline and the cost are agreed in writing before any work begins. If anything changes, we document it and agree it with you first.',
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

/** Industries, each with the work we most often do for it (all from our services). */
export const industries = [
  { name: 'Restaurants and cafés', needs: 'Online ordering with eSewa and Khalti, WhatsApp order handling, and reels that fill tables.' },
  { name: 'Hotels and resorts', needs: 'Direct booking systems, search visibility for travellers, and video of the property.' },
  { name: 'Travel and trekking', needs: 'Enquiry handling around the clock, itinerary websites, and follow-up that does not slip.' },
  { name: 'Schools and colleges', needs: 'Admission websites, fee reminders, and management systems for records and reports.' },
  { name: 'Clinics', needs: 'Appointment booking, reminders to patients, and a website patients can trust.' },
  { name: 'Retail and e-commerce', needs: 'Online stores with local payments, stock management, and paid ads that bring buyers.' },
  { name: 'Distributors and wholesalers', needs: 'Billing and inventory software, order-to-invoice automation, and daily sales reports.' },
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
export const promise = 'Before any work begins, we document the problem, the solution, the scope and the timeline. Both sides sign it, and we deliver what was agreed.';

export const process = [
  {
    icon: 'chat',
    title: 'We understand your business',
    short: 'A consultation about how your business runs, where time is lost, and what you need to achieve.',
    body: 'Every engagement begins with a consultation, by call or at your office, at no cost. We learn how your business operates, where time is lost, what is still done by hand, and what you want to achieve. Our aim is to recommend the right solution for your business, not the most expensive one.',
    get: 'A clear understanding of the problem and our honest recommendation, including when a simpler solution will do the job.',
    bring: 'An overview of how the business runs today and what you would like to improve. Existing files, message threads or websites you refer to are very helpful.',
  },
  {
    icon: 'sheet',
    title: 'We document the problem and the solution',
    short: 'A written proposal: the problem as we understand it, the solution we recommend, the scope, the milestones and the cost.',
    body: 'We then prepare a written proposal. It documents the problem as we understand it, the solution we recommend and why, the scope of work, what is and is not included, a timeline with milestones, and the cost. Everything is clear before any work begins.',
    get: 'A proposal document: the problem, the recommended solution and the reasoning behind it, the scope, inclusions and exclusions, milestones and cost.',
    bring: 'A careful review. The document should describe your business accurately, so tell us about anything that needs correcting or clarifying before you approve it.',
  },
  {
    icon: 'lock',
    title: 'We confirm the scope together',
    short: 'Both sides sign the proposal. It becomes the reference for the whole project, and any change is agreed first.',
    body: 'When you are satisfied with the proposal, both parties sign it. The signed document becomes the reference for the whole project: the work, the timeline and the cost are agreed. If you later need something additional, we document and quote it first, and it proceeds only with your approval.',
    get: 'A signed project document that both sides work from. Any change to the work, the timeline or the cost is agreed in writing first.',
    bring: 'Your signature, and the initial payment set out in the proposal.',
  },
  {
    icon: 'website',
    title: 'We build, and you see the progress',
    short: 'Work is delivered in stages. You review each one, and approve every major stage before the next begins.',
    body: 'Work progresses in stages, and you review each one as it is completed. Every major stage requires your approval before the next begins, so you always know exactly where the project stands.',
    get: 'Regular progress you can see and test, and a formal sign-off at each major stage.',
    bring: 'Content (text, images, access details) and feedback within the agreed dates. Timely input keeps the project on schedule.',
  },
  {
    icon: 'launch',
    title: 'We launch and hand over',
    short: 'Tested thoroughly, launched, registered in your name, and your team trained to use it.',
    body: 'Before launch, we test everything thoroughly. We then put the project live and hand over everything in your name: domain, hosting, logins and files. Your team receives training, so you can manage it with confidence from day one.',
    get: 'The live website or system, all accounts and files registered in your name, and training for your team.',
    bring: 'A final review before launch, and the staff who will use the system at the training session.',
  },
  {
    icon: 'maintenance',
    title: 'We continue to support you',
    short: 'Our team stays responsible after launch: we respond to your requests, resolve issues and keep everything running.',
    body: 'Our work does not end at launch. Every project includes a period of support, during which our team responds to your requests, identifies and resolves any issues, and keeps everything running as it should. After that, we remain available through a care plan or whenever you need us. We aim to be the technology partner you work with for years, not for a single project.',
    get: 'Support after launch: 14 days for a landing page, 30 for websites and stores, and 60 for software and apps, followed by an optional care plan.',
    bring: 'Contact our team by phone, WhatsApp or email whenever you need assistance. We take it from there.',
  },
];

/** Trust badges shown with the process. */
export const trustBadges = [
  { icon: 'sheet', value: 'Documented from the start', label: 'Problem, solution, scope, timeline' },
  { icon: 'lock', value: 'Everything in your name', label: 'Domain, hosting, logins and files' },
  { icon: 'chat', value: 'We reply within minutes', label: 'Sunday–Friday, 10am–5pm' },
  { icon: 'maintenance', value: 'Ongoing support', label: 'From launch onwards' },
];
