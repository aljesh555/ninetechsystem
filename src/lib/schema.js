/**
 * JSON-LD builders shared by the services pages. The business node itself
 * (`/#organization`) is emitted on every page by Base.astro.
 */
import { site } from '../data/site.js';

export const orgRef = { '@id': `${site.url}/#organization` };
export const abs = (path) => new URL(path, site.url).href;

/** crumbs: [{ name, path }], Home first. */
export const breadcrumbList = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

export const faqPage = (path, faqs) => ({
  '@type': 'FAQPage',
  '@id': `${abs(path)}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const UNIT = { month: 'MON', year: 'ANN' };

/** An Offer for a published price, or nothing when the service is quoted. */
export function offer(price, path) {
  if (!price) return undefined;
  const spec = {
    '@type': UNIT[price.per] ? 'UnitPriceSpecification' : 'PriceSpecification',
    priceCurrency: 'NPR',
    minPrice: price.from,
    ...(price.to && { maxPrice: price.to }),
    ...(UNIT[price.per] && { unitCode: UNIT[price.per] }),
    valueAddedTaxIncluded: false,
  };
  return {
    '@type': 'Offer',
    url: abs(path),
    priceCurrency: 'NPR',
    price: price.from,
    priceSpecification: spec,
    availability: 'https://schema.org/InStock',
  };
}

export const service = ({ name, description, path, price, serviceType }) => ({
  '@type': 'Service',
  name,
  ...(serviceType && { serviceType }),
  description,
  provider: orgRef,
  areaServed: site.areasServed.map((n) => ({ '@type': 'City', name: n })),
  url: abs(path),
  ...(price && { offers: offer(price, path) }),
});
