/**
 * Prices a package built in /builder. Pure: takes the builder's state, returns
 * every line, discount and total, so the cart, the proposal and the tests all
 * read the same numbers.
 */
import {
  VAT, discounts, prepayRate, planWebsiteDiscount, planSeoDiscount, units, social, platforms, levels, aiSetup, plans,
  websites, apps, oneTime,
} from '../data/packages.js';

export const planById = (id) => plans.find((p) => p.id === id) ?? null;

/** A fresh state; with a plan, every quantity starts at what it includes. */
export function initialState(planId = null) {
  const plan = planById(planId);
  const inc = plan?.includes;
  return {
    client: '',
    staff: '',
    plan: plan?.id ?? null,
    qty: Object.fromEntries(Object.keys(units).map((k) => [k, inc?.[k] ?? 0])),
    platforms: inc ? [...inc.platforms] : [],
    seo: inc?.seo ?? 0,
    ai: inc?.ai ?? 0,
    care: inc?.care ?? 0,
    web: { type: 'none', pages: 1, bilingual: false },
    app: { ios: false, android: false, tier: 'standard', care: false },
    software: false,
    agentic: 0,
    adFilm: 'none',
    photoshoot: 0,
    extraHalf: 0,
    extraFull: 0,
    brandKit: false,
    festival: 0,
    server: false,
    healthCheck: false,
    term: 3,
  };
}

/** What the plan includes; all zeros without one. */
export function included(state) {
  const inc = planById(state.plan)?.includes;
  return {
    ...Object.fromEntries(Object.keys(units).map((k) => [k, inc?.[k] ?? 0])),
    platforms: inc?.platforms ?? [],
    seo: inc?.seo ?? 0,
    ai: inc?.ai ?? 0,
    care: inc?.care ?? 0,
  };
}

const tierFor = (table, amount) => table.find((t) => amount >= t.min) ?? null;
const nextTier = (table, amount) =>
  [...table].sort((a, b) => a.min - b.min).find((t) => amount < t.min) ?? null;

export function websitePrice(web) {
  const w = websites[web.type];
  if (!w) return 0;
  const extra = Math.max(0, web.pages - w.pages) * w.extraPage;
  return w.base + extra + (web.bilingual ? w.bilingual : 0);
}

export function appPrice(app) {
  const count = (app.ios ? 1 : 0) + (app.android ? 1 : 0);
  if (!count) return 0;
  const base = apps.tiers[app.tier].base;
  return Math.round(base * (1 + (count - 1) * apps.secondPlatform));
}

export function price(state) {
  const plan = planById(state.plan);
  const inc = included(state);
  const monthly = [];
  const once = [];

  // ---- monthly ------------------------------------------------------------
  if (plan) {
    monthly.push({ key: 'plan', label: `${plan.name} plan`, detail: plan.promise, amount: plan.price, plan: true });
  }

  const content = ['reels', 'graphics', 'photos', 'campaigns', 'boosts'].some((k) => state.qty[k] > 0);
  const extraPlatforms = state.platforms.filter((p) => !inc.platforms.includes(p)
    && !(!plan && platforms.find((x) => x.id === p)?.base));
  if (!plan && (content || state.platforms.length)) {
    monthly.push({ key: 'social', label: 'Social media management', detail: 'Facebook and Instagram, posting and replies', amount: social.base });
  }
  for (const id of extraPlatforms) {
    const p = platforms.find((x) => x.id === id);
    monthly.push({ key: `pf-${id}`, label: `${p.label} management`, detail: 'Added platform', amount: social.extraPlatform });
  }

  for (const [k, u] of Object.entries(units)) {
    const extra = state.qty[k] - inc[k];
    if (extra <= 0) continue;
    monthly.push({
      key: `u-${k}`,
      label: `${plan ? 'Extra ' + u.label.toLowerCase() : u.label}`,
      detail: `${extra} × Rs ${npr(u.unit)}${u.note ? ` (${u.note})` : ''}`,
      qty: extra,
      amount: extra * u.unit,
    });
  }

  for (const k of ['seo', 'ai', 'care']) {
    if (state[k] <= inc[k]) continue;
    const opts = levels[k].options;
    const opt = opts[state[k]];
    if (!opt) continue; // a level this price list no longer has
    const full = opt.price - opts[inc[k]].price;
    // Search work costs less inside a plan, the way a website does.
    const rate = plan && k === 'seo' ? planSeoDiscount : 0;
    const notes = [
      inc[k] > 0 && `Upgrade from ${opts[inc[k]].name}`,
      rate > 0 && `${Math.round(rate * 100)}% off with ${plan.name}`,
    ].filter(Boolean);
    monthly.push({
      key: `l-${k}`,
      label: `${levels[k].label}: ${opt.name.replace(/^\+ /, '')}`,
      detail: plan ? notes.join(' · ') : opt.body,
      amount: Math.round(full * (1 - rate)),
      ...(rate > 0 && { was: full }),
    });
  }

  const appOn = state.app.ios || state.app.android;
  if (appOn && state.app.care) {
    monthly.push({ key: 'app-care', label: 'App care', detail: 'Store updates, OS compatibility, fixes', amount: apps.care });
  }
  if (state.agentic > 0) {
    monthly.push({ key: 'agentic-care', label: 'Agentic AI care', detail: 'Monitoring and tuning your workflows', amount: oneTime.agentic.care });
  }

  // ---- one-time -----------------------------------------------------------
  const setupWaived = plan && state.term === 12;
  if (plan) {
    // Only a plan that carries a setup fee shows the line at all.
    if (plan.setup > 0) {
      once.push({
        key: 'setup', label: 'Setup fee', setup: true,
        detail: setupWaived ? 'Waived with a 12-month commitment' : 'Assistant trained, tracking, Google profile, 3-month content plan',
        amount: setupWaived ? 0 : plan.setup, was: setupWaived ? plan.setup : undefined,
      });
    }
  } else if (state.ai > 0) {
    once.push({ key: 'ai-setup', label: 'AI assistant setup', detail: 'Built and trained on your FAQs', amount: aiSetup, setup: true });
  }

  const web = websites[state.web.type];
  if (web) {
    const pages = state.web.pages;
    const full = websitePrice(state.web);
    // A website comes cheaper when it is part of a plan. Held off the 12-month
    // path, where the free-website credit below applies instead (unchanged).
    const bundled = !!plan && !(plan.freeWebsite && state.term === 12);
    const pct = Math.round(planWebsiteDiscount * 100);
    const base = `${pages} page${pages > 1 ? 's' : ''}${state.web.bilingual || !web.bilingual ? ', Nepali and English' : ''}`;
    once.push({
      key: 'web', label: web.label, from: web.from,
      detail: bundled ? `${base} · ${pct}% off with ${plan.name}` : base,
      amount: bundled ? Math.round(full * (1 - planWebsiteDiscount)) : full,
      ...(bundled && { was: full }),
    });
    if (plan?.freeWebsite && state.term === 12) {
      const credit = Math.min(full, plan.freeWebsite.value);
      once.push({ key: 'web-credit', label: `${plan.freeWebsite.label} included`, detail: 'With a 12-month commitment', amount: -credit, credit: true });
    }
  }

  if (appOn) {
    const which = [state.app.ios && 'iOS', state.app.android && 'Android'].filter(Boolean).join(' and ');
    once.push({ key: 'app', label: `Mobile app: ${which}`, detail: `${apps.tiers[state.app.tier].label}: ${apps.tiers[state.app.tier].body}`, amount: appPrice(state.app), from: true });
  }
  if (state.software) once.push({ key: 'software', label: oneTime.software.label, detail: 'Scoped in writing before we start', amount: oneTime.software.price, from: true });
  if (state.agentic > 0) {
    const a = oneTime.agentic;
    const amount = a.base + Math.max(0, state.agentic - a.baseWorkflows) * a.extra;
    once.push({ key: 'agentic', label: a.label, detail: `${state.agentic} workflow${state.agentic > 1 ? 's' : ''}: invoices, stock alerts, reports, email triage`, amount, from: true });
  }
  if (oneTime.adFilm[state.adFilm]) {
    once.push({ key: 'film', label: oneTime.adFilm[state.adFilm].label, amount: oneTime.adFilm[state.adFilm].price });
  }
  for (const k of ['photoshoot', 'extraHalf', 'extraFull', 'festival']) {
    if (state[k] > 0) once.push({ key: k, label: oneTime[k].label, detail: `${state[k]} × Rs ${npr(oneTime[k].price)}`, qty: state[k], amount: state[k] * oneTime[k].price });
  }
  if (state.brandKit) once.push({ key: 'brand', label: oneTime.brandKit.label, amount: oneTime.brandKit.price });
  if (state.server) once.push({ key: 'server', label: oneTime.server.label, amount: oneTime.server.price });
  if (state.healthCheck) once.push({ key: 'health', label: oneTime.healthCheck.label, detail: oneTime.healthCheck.note, amount: oneTime.healthCheck.price });

  // ---- totals -------------------------------------------------------------
  const sum = (lines) => lines.reduce((a, l) => a + l.amount, 0);

  const mSub = sum(monthly);
  // A plan always costs its own price. The volume discount is counted on, and
  // taken from, what is added on top of it; with no plan, that is everything.
  const mBase = sum(monthly.filter((l) => !l.plan));
  const mTier = tierFor(discounts.monthly, mBase);
  const mDisc = mTier ? Math.round(mBase * mTier.rate) : 0;
  const prepay = state.term === 6 && mSub > 0 ? Math.round((mSub - mDisc) * prepayRate) : 0;
  const mTotal = mSub - mDisc - prepay;

  const oSub = sum(once);
  const oTier = tierFor(discounts.oneTime, oSub);
  const oDisc = oTier ? Math.round(oSub * oTier.rate) : 0;
  const oTotal = oSub - oDisc;

  // Due at signing: the setup fee in full, half of the project work, and the
  // first month, or the first six when paying up front.
  const setup = sum(once.filter((l) => l.setup));
  const oRate = oTier?.rate ?? 0;
  const setupNet = Math.round(setup * (1 - oRate));
  const projectsNet = oTotal - setupNet;
  const months = mTotal > 0 ? (state.term === 6 ? 6 : 1) : 0;
  const dueNow = setupNet + Math.round(projectsNet / 2) + months * mTotal;

  // What the plan's own contents would cost bought separately.
  const separate = plan ? alaCarte(plan) : 0;

  return {
    plan, monthly, once,
    m: { sub: mSub, base: mBase, tier: mTier, disc: mDisc, prepay, total: mTotal, vat: Math.round(mTotal * VAT), next: nextTier(discounts.monthly, mBase) },
    o: { sub: oSub, base: oSub, tier: oTier, disc: oDisc, total: oTotal, vat: Math.round(oTotal * VAT), next: nextTier(discounts.oneTime, oSub), hasFrom: once.some((l) => l.from) },
    due: { exVat: dueNow, vat: Math.round(dueNow * VAT), months, onDelivery: projectsNet - Math.round(projectsNet / 2) },
    separate,
    firstYear: mTotal * 12 + oTotal,
  };
}

/** A plan's contents priced piece by piece, as if bought without the plan. */
export function alaCarte(plan) {
  const s = initialState(plan.id);
  s.plan = null;
  return price(s).m.sub;
}

/**
 * With no plan chosen, the cheapest plan that covers everything picked so
 * far, once its extras are added. Returned only when it saves money.
 */
export function betterPlan(state) {
  if (state.plan) return null;
  const now = price(state).m.sub;
  if (!now) return null;
  let best = null;
  for (const p of plans) {
    const s = structuredClone(state);
    s.plan = p.id;
    const inc = p.includes;
    for (const k of Object.keys(units)) s.qty[k] = Math.max(s.qty[k], inc[k]);
    s.platforms = [...new Set([...s.platforms, ...inc.platforms])];
    for (const k of ['seo', 'ai', 'care']) s[k] = Math.max(s[k], inc[k]);
    const cost = price(s).m.sub;
    if (cost < now && (!best || cost < best.cost)) best = { plan: p, cost, saves: now - cost };
  }
  return best;
}

export const npr = (n) => Math.round(n).toLocaleString('en-IN');
