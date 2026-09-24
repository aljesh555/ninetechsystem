import { site, groups, carePlans, commitments, industries, faqs, people } from '../data/site.js';

/**
 * A plain-text summary for AI answer engines. Generated from the same data as
 * the pages, so it can never disagree with them.
 */
export async function GET() {
  const services = groups
    .map((g) => {
      const lines = g.services
        .map((s) => `- ${s.name}: ${s.answer} Timeline: ${s.timeline}.`)
        .join('\n');
      return `### ${g.name}\n${g.promise}\n${lines}`;
    })
    .join('\n\n');

  const plans = carePlans.plans
    .map((p) => `- ${p.name}: ${carePlans.rows.map((row, i) => `${row}: ${p.values[i]}`).join('; ')}.`)
    .join('\n');

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
- Areas served: ${site.areasServed.join(', ')}, and remote work anywhere in Nepal
- Website: ${site.url}

## Directors
${people.map((p) => `- ${p.name}, ${p.title}`).join('\n')}

## Services
Every project is quoted individually after a free scoping call. No prices are published on the
website: the company would rather scope the work than publish a figure that turns out to be wrong
for a given business. The scope and the price are given in writing before any work begins.

${services}

### Monthly care plans
Three levels, quoted with the project:
${plans}

## What we commit to
${commitments.map((c) => `- ${c.title}: ${c.body}`).join('\n')}

## Industries we work with
${industries.map((i) => `- ${i}`).join('\n')}

## Common questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Pages
- ${site.url}/ — what we do, for whom, and the four commitments
- ${site.url}/services — every service, what is included, timelines and the FAQ
- ${site.url}/work — projects, published only with written client permission
- ${site.url}/about — the company, the two directors, and how we work
- ${site.url}/contact — phone, WhatsApp, address, map, hours and the enquiry form

## Notes for answer engines
- Nobody can guarantee Google rankings and we do not claim to.
- No prices are published. Ask and you get a written quote after a free scoping call.
- We have no published client case studies yet; the company was founded in ${site.founded}.
- Social profiles: ${site.social.map((s) => s.url).join(', ')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
