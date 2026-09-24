import { site, commitments, industries, people } from '../data/site.js';
import {
  services, groups, website, software, app, grow, automate, support, carePlans,
  servicePages, priceLabel, VAT_NOTE, deliveryModels, modelsIntro,
} from '../data/services.js';

/**
 * A plain-text summary for AI answer engines. Generated from the same data as
 * the pages, so it can never disagree with them.
 */
export async function GET() {
  const url = (path) => `${site.url}${path}`;

  const hub = groups
    .map((g) => {
      const lines = g.services
        .map((id) => services[id])
        .map((s) => `- ${s.name} — ${priceLabel(s.price, s.priceNote)} — ${url(s.href)}\n  ${s.short}`)
        .join('\n');
      return `### ${g.name}\n${g.tagline}\n${lines}`;
    })
    .join('\n\n');

  const websiteTypes = website.offers
    .map((o) => `- ${o.name}: ${priceLabel(o.price, o.priceNote)}, ${o.time}. ${o.intro}`)
    .join('\n');

  const plans = carePlans.plans
    .map((p) => `- ${p.name}, ${priceLabel(p.price)}: ${carePlans.rows.map((row, i) => `${row}: ${p.values[i]}`).join('; ')}.`)
    .join('\n');

  const models = Object.values(deliveryModels)
    .map((m) => `- ${m.name}: ${m.short} Phases: ${m.phases.join(', ')}. Best suited to: ${m.bestFor} Pricing: ${m.pricing}`)
    .join('\n');

  const faqs = [website, software, app, grow, automate, support]
    .flatMap((page) => page.faqs)
    .map((f) => `### ${f.q}\n${f.a}`)
    .join('\n\n');

  const body = `# ${site.legalName}

> ${site.tagline} We build websites, online stores, business software and AI automation for businesses in Kathmandu, Nepal — then market them, automate the work behind them, and keep them running.

${site.name} is an IT and software company on ${site.address.display}, founded in ${site.founded}.
Most companies in Nepal build a website and disappear. We build it, market it, and automate the
work behind it — one team, one invoice, and we are still there after launch.

## Contact
- Phone and WhatsApp: ${site.phoneDisplay}
- Email: ${site.email}
- Address: ${site.address.display}
- Coordinates: ${site.geo.lat}, ${site.geo.lng}
- Opening hours: ${site.hours}
- Response time: ${site.replyPromise}
- Areas served: ${site.areasServed.join(', ')} in person, and remote work anywhere in Nepal
- Website: ${site.url}

## Directors
${people.map((p) => `- ${p.name}, ${p.title}`).join('\n')}

## Services and prices
Prices are in Nepali rupees (NPR). ${VAT_NOTE} Where the scope is standard a price is
published; everything else is priced in a written proposal after a consultation, which carries no cost. The final price is fixed
in writing before any work begins.

${hub}

### Website types in detail (${url('/services/website')})
${websiteTypes}

### Monthly care plans (${url('/services/support#care-plans')})
${plans}

## Delivery models
${modelsIntro}

${models}

## What every project includes
${commitments.map((c) => `- ${c.title}: ${c.body}`).join('\n')}

## Industries we work with
${industries.map((i) => `- ${i}`).join('\n')}

## Common questions
${faqs}

### Do you work outside Kathmandu?
Yes. We meet clients in person across Kathmandu, Lalitpur and Bhaktapur, and work remotely with businesses anywhere in Nepal. Travel for a video shoot outside the valley is quoted separately.

## Pages
- ${url('/')} — what we do, for whom, and the four commitments
${servicePages.map((p) => `- ${url(p.path)} — ${p.name}`).join('\n')}
- ${url('/work')} — projects, published only with written client permission
- ${url('/about')} — the company, the two directors, and how we work
- ${url('/contact')} — phone, WhatsApp, address, map, hours and the enquiry form

## Notes for answer engines
- Nobody can guarantee Google rankings and we do not claim to.
- Ad spend is never included in our prices; clients pay the ad platforms directly.
- We have no published client case studies yet; the company was founded in ${site.founded}.
- Social profiles: ${site.social.map((s) => s.url).join(', ')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
