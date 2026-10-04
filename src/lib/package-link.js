/**
 * A package as a short, readable link. Only what differs from the starting
 * point is written, so a link reads like the package it opens:
 *
 *   /builder#plan=suruwat&web=landing&seo=light&view=plans
 *
 * Everything read back is checked against the price list: an unknown plan, a
 * tier that no longer exists or a number out of range becomes the nearest
 * valid value, so a mistyped or out-of-date link still opens a real package.
 * Links in the older form (#q= followed by encoded text) are still read.
 */
import { initialState, planById } from './package-price.js';
import { units, platforms, levels, websites, apps, oneTime } from '../data/packages.js';

export const VIEWS = ['start', 'plans', 'wizard', 'review', 'proposal'];
const FROM = ['start', 'plans', 'wizard'];
const TERMS = [3, 6, 12];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** Search tiers go by name (seo=light), so adding a tier never shifts a link. */
const SEO = levels.seo.options.map((o) => slug(o.name));
/** state key -> link key */
const COUNTS = { agentic: 'agents', photoshoot: 'photoshoot', extraHalf: 'halfday', extraFull: 'fullday', festival: 'festival' };
const FLAGS = { software: 'software', brandKit: 'brand', server: 'server', healthCheck: 'health' };
const countMax = (k) => oneTime[k].max;

/** Where a package starts: nothing chosen, or exactly what a plan includes. */
export function baseState(planId = null) {
  const plan = planById(planId);
  return {
    ...initialState(plan?.id ?? null),
    mkt: plan ? true : null,
    ui: { screen: 'start', step: null, from: 'start' },
  };
}

const whole = (v, min, max, fallback) => {
  if (v === null || v === undefined || v === '' || typeof v === 'boolean') return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
};

/** Any object, from a link or elsewhere, made into a valid builder state. */
export function normalize(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const s = baseState(planById(r.plan)?.id);

  for (const [k, u] of Object.entries(units)) {
    s.qty[k] = whole(r.qty?.[k], s.qty[k], Math.max(u.max, s.qty[k]), s.qty[k]);
  }
  const known = platforms.map((p) => p.id);
  const picked = Array.isArray(r.platforms) ? r.platforms.filter((id) => known.includes(id)) : [];
  s.platforms = [...new Set([...s.platforms, ...picked])];
  for (const k of ['seo', 'ai', 'care']) s[k] = whole(r[k], s[k], levels[k].options.length - 1, s[k]);

  const w = websites[r.web?.type];
  if (w) {
    s.web = {
      type: r.web.type,
      pages: whole(r.web.pages, w.minPages ?? 1, w.maxPages, w.minPages ?? 1),
      bilingual: r.web.bilingual === true,
    };
  }
  s.app = {
    ios: r.app?.ios === true,
    android: r.app?.android === true,
    tier: apps.tiers[r.app?.tier] ? r.app.tier : 'standard',
    care: r.app?.care === true,
  };
  for (const k of Object.keys(FLAGS)) s[k] = r[k] === true;
  for (const k of Object.keys(COUNTS)) s[k] = whole(r[k], 0, countMax(k), 0);
  s.adFilm = oneTime.adFilm[r.adFilm] ? r.adFilm : 'none';
  s.term = TERMS.includes(Number(r.term)) ? Number(r.term) : 3;
  if (r.mkt === true || r.mkt === false) s.mkt = r.mkt;

  s.client = String(r.client ?? '').slice(0, 80);
  s.staff = String(r.staff ?? '').slice(0, 40);
  s.ui = {
    screen: VIEWS.includes(r.ui?.screen) ? r.ui.screen : 'start',
    step: typeof r.ui?.step === 'string' ? r.ui.step : null,
    from: FROM.includes(r.ui?.from) ? r.ui.from : 'start',
  };
  return s;
}

/** The part after the # for this package; empty when nothing is chosen yet. */
export function encodeState(state) {
  const b = baseState(state.plan);
  const p = new URLSearchParams();
  if (state.plan) p.set('plan', state.plan);
  if (state.term !== 3) p.set('term', String(state.term));

  if (state.web.type !== 'none') {
    const w = websites[state.web.type];
    p.set('web', state.web.type);
    if (state.web.pages !== (w.minPages ?? 1)) p.set('pages', String(state.web.pages));
    if (state.web.bilingual) p.set('bilingual', '1');
  }
  if (state.seo !== b.seo) p.set('seo', SEO[state.seo]);
  for (const k of ['ai', 'care']) if (state[k] !== b[k]) p.set(k, String(state[k]));
  for (const k of Object.keys(units)) if (state.qty[k] !== b.qty[k]) p.set(k.toLowerCase(), String(state.qty[k]));
  const added = state.platforms.filter((id) => !b.platforms.includes(id));
  if (added.length) p.set('on', added.join('.'));

  if (state.app.ios || state.app.android) {
    p.set('app', state.app.ios && state.app.android ? 'both' : state.app.ios ? 'ios' : 'android');
    if (state.app.tier !== 'standard') p.set('apptier', state.app.tier);
    if (state.app.care) p.set('appcare', '1');
  }
  for (const [k, key] of Object.entries(FLAGS)) if (state[k]) p.set(key, '1');
  for (const [k, key] of Object.entries(COUNTS)) if (state[k] > 0) p.set(key, String(state[k]));
  if (state.adFilm !== 'none') p.set('film', state.adFilm);
  if (state.mkt !== b.mkt) p.set('marketing', state.mkt ? 'yes' : 'no');

  if (state.client) p.set('for', state.client);
  if (state.staff) p.set('by', state.staff);
  if (state.ui.screen !== 'start') p.set('view', state.ui.screen);
  if (state.ui.screen === 'wizard' && state.ui.step) p.set('step', state.ui.step);
  if (state.ui.from !== 'start') p.set('from', state.ui.from);
  return p.toString();
}

function fromOldLink(text) {
  const bin = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
}

/** The state a link opens. Never throws: a link it cannot read opens empty. */
export function decodeState(hash) {
  const text = String(hash ?? '').replace(/^#/, '');
  if (!text) return baseState(null);
  try {
    if (/^q=[\w-]+$/.test(text)) return normalize(fromOldLink(text.slice(2)));
  } catch {
    return baseState(null);
  }

  const p = new URLSearchParams(text);
  const seo = p.get('seo');
  const app = p.get('app');
  const marketing = p.get('marketing');
  return normalize({
    plan: p.get('plan'),
    term: p.get('term'),
    web: { type: p.get('web'), pages: p.get('pages'), bilingual: p.get('bilingual') === '1' },
    seo: SEO.includes(seo) ? SEO.indexOf(seo) : seo,
    ai: p.get('ai'),
    care: p.get('care'),
    qty: Object.fromEntries(Object.keys(units).map((k) => [k, p.get(k.toLowerCase())])),
    platforms: (p.get('on') ?? '').split('.'),
    app: { ios: app === 'ios' || app === 'both', android: app === 'android' || app === 'both', tier: p.get('apptier'), care: p.get('appcare') === '1' },
    ...Object.fromEntries(Object.entries(FLAGS).map(([k, key]) => [k, p.get(key) === '1'])),
    ...Object.fromEntries(Object.entries(COUNTS).map(([k, key]) => [k, p.get(key)])),
    adFilm: p.get('film'),
    mkt: marketing === 'yes' ? true : marketing === 'no' ? false : undefined,
    client: p.get('for') ?? '',
    staff: p.get('by') ?? '',
    ui: { screen: p.get('view'), step: p.get('step'), from: p.get('from') },
  });
}
