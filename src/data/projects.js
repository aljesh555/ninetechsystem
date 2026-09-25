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
 *   - `built` describes what exists and can be checked on the live site. No
 *     outcome is claimed unless the client has confirmed the number and would
 *     repeat it out loud, in which case it goes in `outcome`
 *   - drop the screenshot at src/images/slots/<image>.jpg (see IMAGES.md)
 */

export const projects = [
  {
    slug: 'shakti-x-gym',
    client: 'Shakti X Gym and Fitness',
    sector: 'Gyms and fitness studios',
    sectorHref: '/sectors#gyms',
    location: 'Gongabu Ganeshthan, Kathmandu',
    year: '2026',
    url: 'https://shaktixgym.com.np',
    summary:
      'A gym trades on two questions a visitor asks before anything else: where is it, and what does membership cost. The site answers both before it asks for an enquiry.',
    built: [
      'The address published with its landmark and a map link, because an address in Kathmandu is given by landmark and floor, not by street number.',
      'Opening hours, both phone numbers and the accepted payment methods marked up as structured data, so search results can carry them without the visitor opening the site at all.',
      'Membership plans set out in full, so the price is answered on the page instead of becoming a message someone has to reply to.',
      'Founder and coach profiles, the equipment and training zones, and a gallery of the floor, for the part of the decision that is about trust rather than price.',
      'An enquiry route to a consultation, reachable from every screen.',
      'A light and a dark theme, built for phones first, since that is how almost every visitor arrives.',
    ],
    services: [
      { label: 'Business website', href: '/services/website#business' },
      { label: 'Search visibility', href: '/services/seo' },
    ],
    image: 'work-shakti-x-gym',
  },
];
