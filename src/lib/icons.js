/**
 * The thirteen isometric service icons, drawn at build time.
 *
 * Every icon is assembled from boxes on one isometric grid by the same
 * projection, so the perspective and depth are identical across all thirteen
 * by construction. The output is plain inline SVG: no image requests, no JS.
 *
 * Grid: a 10 x 10 floor, z upward. Visible faces of a box are its top, its
 * "left" face (the y = y + d side) and its "right" face (the x = x + w side).
 * Details are painted onto those faces in face coordinates (u, v), where v
 * runs upward from the bottom edge.
 */

const S = 4.3; // grid unit in SVG px
const CX = 40; // x of the floor's back corner
const CY = 32; // y of the floor's back corner
const C30 = Math.cos(Math.PI / 6);

const NAVY = { top: '#3d6399', left: '#123566', right: '#1f4478' };
const AMBER = { top: '#ffb547', left: '#ff9500', right: '#e07f00' };
const LIGHT = '#e6edf6';
const LIGHT_DIM = '#b9c7da';

const p = (x, y, z) => [CX + (x - y) * C30 * S, CY + (x + y) * 0.5 * S - z * S];
const poly = (pts, fill) =>
  `<path d="M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join('L')}Z" fill="${fill}"/>`;

/** A box with its three visible faces. */
function box(x, y, z, w, d, h, c = NAVY) {
  return (
    poly([p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)], c.top) +
    poly([p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)], c.left) +
    poly([p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)], c.right)
  );
}

/** A rectangle painted on one face of a box. u/v are offsets within that face. */
function on(face, [x, y, z, w, d, h], u0, v0, u1, v1, fill) {
  if (face === 'top') {
    const t = z + h;
    return poly([p(x + u0, y + v0, t), p(x + u1, y + v0, t), p(x + u1, y + v1, t), p(x + u0, y + v1, t)], fill);
  }
  if (face === 'left') {
    const yy = y + d;
    return poly([p(x + u0, yy, z + v0), p(x + u1, yy, z + v0), p(x + u1, yy, z + v1), p(x + u0, yy, z + v1)], fill);
  }
  const xx = x + w; // right
  return poly([p(xx, y + u0, z + v0), p(xx, y + u1, z + v0), p(xx, y + u1, z + v1), p(xx, y + u0, z + v1)], fill);
}

const B = (...a) => a; // a box's geometry, reused for its face details

const draw = {
  website() {
    const panel = B(1, 4, 1.4, 8, 1, 6.6);
    return (
      box(2.5, 3.2, 0, 5, 3, 0.4) +
      box(4.3, 4.2, 0.4, 1.4, 0.8, 1) +
      box(...panel) +
      on('left', panel, 0.5, 5.3, 7.5, 6.1, AMBER.left) +
      on('left', panel, 0.5, 0.6, 3.6, 4.7, LIGHT) +
      on('left', panel, 4.2, 3.9, 7.5, 4.4, LIGHT_DIM) +
      on('left', panel, 4.2, 2.7, 7.5, 3.2, LIGHT_DIM) +
      on('left', panel, 4.2, 1.5, 6.4, 2.0, LIGHT_DIM)
    );
  },

  software() {
    const board = B(0.5, 0.5, 0, 9, 9, 0.5);
    return (
      box(...board) +
      on('top', board, 1, 1, 4.6, 1.6, LIGHT) +
      on('top', board, 1, 2.3, 3.4, 2.8, LIGHT_DIM) +
      box(1.6, 5.8, 0.5, 1.4, 1.4, 2, NAVY) +
      box(4.1, 5.8, 0.5, 1.4, 1.4, 3.6, NAVY) +
      box(6.6, 5.8, 0.5, 1.4, 1.4, 5.4, AMBER)
    );
  },

  app() {
    const phone = B(3, 4.2, 0, 4.2, 0.9, 9);
    return (
      box(...phone) +
      on('left', phone, 0.3, 0.9, 3.9, 8.4, LIGHT) +
      on('left', phone, 0.7, 6.5, 3.5, 7.7, AMBER.left) +
      on('left', phone, 0.7, 5.2, 3.5, 5.7, LIGHT_DIM) +
      on('left', phone, 0.7, 4.2, 2.6, 4.7, LIGHT_DIM) +
      on('left', phone, 0.7, 1.6, 3.5, 3.4, LIGHT_DIM) +
      on('left', phone, 1.6, 0.25, 2.6, 0.55, LIGHT_DIM)
    );
  },

  search() {
    const c1 = B(1.5, 2, 0, 7, 5.5, 0.6);
    const c2 = B(1.5, 2, 2.1, 7, 5.5, 0.6);
    const c3 = B(1.5, 2, 4.2, 7, 5.5, 0.6);
    return (
      box(...c1) +
      box(...c2) +
      on('top', c2, 0.8, 1, 5, 1.8, LIGHT_DIM) +
      box(...c3, AMBER) +
      on('top', c3, 0.8, 1, 5.6, 1.9, '#fff3dc') +
      on('top', c3, 0.8, 2.7, 4, 3.3, '#ffe0a8')
    );
  },

  social() {
    const t = (x, y, z, c) => box(x, y, z, 3.8, 3.8, 0.8, c);
    const last = B(5.4, 5.4, 2.4, 3.8, 3.8, 0.8);
    return (
      t(0.8, 0.8, 0.6) +
      t(5.4, 0.8, 1.6) +
      t(0.8, 5.4, 1.6) +
      box(...last, AMBER) +
      on('top', last, 0.9, 0.9, 2.9, 2.9, '#fff3dc')
    );
  },

  video() {
    const body = B(1.5, 2.5, 0, 5.5, 4.5, 4.4);
    return (
      box(4.2, 3.4, 4.4, 1.6, 1.6, 1.1) +
      box(...body) +
      on('left', body, 0.7, 2.6, 2.3, 3.6, LIGHT_DIM) +
      box(7, 3.6, 1.1, 2, 2.2, 2.2) +
      on('right', B(7, 3.6, 1.1, 2, 2.2, 2.2), 0.5, 0.5, 1.7, 1.7, LIGHT) +
      box(2.2, 3.2, 4.4, 1.2, 1.2, 0.5, AMBER)
    );
  },

  ads() {
    const panel = B(1.2, 5, 3.8, 7.6, 0.7, 4.8);
    return (
      box(2.4, 5.1, 0, 0.6, 0.6, 3.8) +
      box(7, 5.1, 0, 0.6, 0.6, 3.8) +
      box(...panel) +
      on('left', panel, 0.5, 0.6, 3.6, 4.2, AMBER.left) +
      on('left', panel, 4.2, 3.2, 7.1, 3.8, LIGHT) +
      on('left', panel, 4.2, 2.1, 7.1, 2.6, LIGHT_DIM) +
      on('left', panel, 4.2, 1.0, 6.2, 1.5, LIGHT_DIM)
    );
  },

  chat() {
    const bubble = B(1.2, 1.8, 2.2, 7.6, 5.2, 4);
    return (
      box(...bubble) +
      box(2, 7, 1, 1.6, 1.6, 1.4) +
      on('left', bubble, 1.4, 1.5, 2.5, 2.6, AMBER.left) +
      on('left', bubble, 3.3, 1.5, 4.4, 2.6, AMBER.left) +
      on('left', bubble, 5.2, 1.5, 6.3, 2.6, AMBER.left)
    );
  },

  workflow() {
    return (
      box(0.6, 0.6, 0, 2.4, 2.4, 2.4) +
      box(3, 1.4, 0, 4, 0.8, 0.25, AMBER) +
      box(7, 0.6, 0, 2.4, 2.4, 2.4) +
      box(7.8, 3, 0, 0.8, 4, 0.25, AMBER) +
      box(7, 7, 0, 2.4, 2.4, 2.4, AMBER)
    );
  },

  agent() {
    const chip = B(2, 2, 0.6, 6, 6, 1.2);
    const pins = [2.7, 4.65, 6.6];
    return (
      box(...chip) +
      pins.map((a) => box(a, 8, 0.8, 0.7, 1, 0.45)).join('') +
      pins.map((a) => box(8, a, 0.8, 1, 0.7, 0.45)).join('') +
      on('top', chip, 0.6, 0.6, 5.4, 5.4, '#2a5189') +
      box(3.9, 3.9, 1.8, 2.2, 2.2, 0.9, AMBER)
    );
  },

  hosting() {
    const tower = B(3, 3, 0, 4, 4, 9);
    const rows = [7.2, 5.1, 3.0];
    return (
      box(...tower) +
      rows.map((v) => on('left', tower, 0.5, v, 1.2, v + 0.7, AMBER.left)).join('') +
      rows.map((v) => on('left', tower, 1.7, v + 0.15, 3.5, v + 0.55, LIGHT_DIM)).join('') +
      rows.map((v) => on('right', tower, 0.5, v + 0.15, 3.5, v + 0.55, '#16386a')).join('')
    );
  },

  maintenance() {
    const body = B(1.5, 3, 0, 7, 4, 3.4);
    return (
      box(...body) +
      box(1.3, 2.8, 3.4, 7.4, 4.4, 0.8) +
      box(3.7, 4.7, 4.2, 0.6, 0.6, 1.3) +
      box(5.9, 4.7, 4.2, 0.6, 0.6, 1.3) +
      box(3.7, 4.7, 5.5, 2.8, 0.6, 0.5) +
      on('left', body, 3, 2.3, 4, 3.1, AMBER.left) +
      on('left', body, 0.6, 1, 6.4, 1.3, '#0e2a52')
    );
  },

  care() {
    return (
      box(0.8, 3, 0, 2.7, 4, 2) +
      box(3.6, 3, 0, 2.7, 4, 4.4, AMBER) +
      box(6.4, 3, 0, 2.7, 4, 6.8)
    );
  },
};

/** Inline SVG for a service icon. Decorative: the card's heading names it. */
export function icon(name) {
  const body = draw[name]?.();
  if (!body) throw new Error(`No icon named "${name}"`);
  return `<svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true" focusable="false">${body}</svg>`;
}

export const iconNames = Object.keys(draw);
