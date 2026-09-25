/**
 * Real projects only.
 *
 * A project appears here once the client has given written permission to be
 * named and shown. Until then it stays off the site: /work renders an honest
 * empty state rather than invented work.
 *
 * Rules for every field:
 *   - no client name without written permission; anonymise until you have it
 *     ("A travel agency in Lazimpat")
 *   - no screenshots containing customer data, prices you were not asked to
 *     publish, or anything identifying staff
 *   - `built` items lead with the decision, then say what it does. Each one
 *     must be checkable on the live site. No outcome is claimed unless the
 *     client confirmed the number and would repeat it out loud (`outcome`)
 *   - drop the screenshot at src/images/slots/<image>.jpg (see IMAGES.md)
 */

export const projects = [
  {
    slug: 'fitness-durbar',
    client: 'Fitness Durbar',
    sector: 'Gyms and fitness studios',
    sectorHref: '/sectors#gyms',
    location: 'Hattiban, Lalitpur',
    year: '2026',
    url: 'https://fitnessdurbar.com.np',
    summary:
      'A gym is chosen on proof: who will train you, what it costs, and whether people starting where you are have got anywhere. The site puts all three in front of the visitor rather than making them ask.',
    built: [
      { lead: 'Placed on the map', text: 'Opening hours, coordinates and the landmark address marked up for search, so the gym reads as open or closed at the moment someone looks for one.' },
      { lead: 'One question, one section', text: 'Programmes, trainers, pricing and member transformations each given their own place, so nobody has to hunt for the single thing they came for.' },
      { lead: 'Answers inside the results', text: 'The questions people ask before joining marked up as structured data, so search can answer them before the site is even opened.' },
      { lead: 'Published, not rented', text: 'A blog and a media section, so the gym builds an audience it owns instead of paying for reach every month.' },
      { lead: 'Reachable where they already are', text: 'Instagram, Facebook and TikTok connected, with WhatsApp enquiry on every screen.' },
      { lead: 'Run by the gym, not by us', text: 'A custom admin behind its own login, so the team publish and update the site themselves as programmes, people and prices change.' },
    ],
    services: [
      { label: 'Business website', href: '/services/website#business' },
      { label: 'Custom software', href: '/services/software' },
      { label: 'Search visibility', href: '/services/seo' },
    ],
    image: 'work-fitness-durbar',
  },
  {
    slug: 'shakti-x-gym',
    client: 'Shakti X Gym and Fitness',
    sector: 'Gyms and fitness studios',
    sectorHref: '/sectors#gyms',
    location: 'Gongabu, Kathmandu',
    year: '2026',
    url: 'https://shaktixgym.com.np',
    summary:
      'A gym trades on two questions asked before any other: where is it, and what does membership cost. The site answers both before it asks anyone for an enquiry.',
    built: [
      { lead: 'Found by landmark', text: 'The address published with its landmark and floor alongside a map link, because that is how an address in Kathmandu is actually given.' },
      { lead: 'Answerable from search', text: 'Opening hours, both phone numbers and the accepted payment methods marked up, so a result can carry them without the site being opened.' },
      { lead: 'Price answered up front', text: 'Membership plans set out in full, so cost stops being a message somebody has to reply to.' },
      { lead: 'Proof before price', text: 'Founder and coach profiles, the equipment and training zones, and a gallery of the floor, for the half of the decision that is about trust.' },
      { lead: 'Built for the phone', text: 'A light and a dark theme, and a layout that assumes mobile data rather than office wifi.' },
      { lead: 'Run by the gym, not by us', text: 'A custom admin behind its own login, so plans, people and photographs stay current without a developer being involved in a text change.' },
    ],
    services: [
      { label: 'Business website', href: '/services/website#business' },
      { label: 'Custom software', href: '/services/software' },
      { label: 'Search visibility', href: '/services/seo' },
    ],
    image: 'work-shakti-x-gym',
  },
];
