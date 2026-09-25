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

/* --- small concept icons, used beside capabilities, standards and facts --- */

Object.assign(draw, {
  lock() {
    const body = B(2.2, 3, 0, 5.6, 4, 4.6);
    return (
      box(3.4, 4.6, 4.6, 0.8, 0.8, 2.6) +
      box(6, 4.6, 4.6, 0.8, 0.8, 2.6) +
      box(3.4, 4.6, 7.2, 3.4, 0.8, 0.8) +
      box(...body) +
      on('left', body, 2.2, 1.4, 3.4, 3, AMBER.left)
    );
  },

  coins() {
    const c = (z, col) => box(2.5, 2.5, z, 5, 5, 1.1, col);
    const top = B(2.5, 2.5, 3.9, 5, 5, 1.1);
    return c(0, NAVY) + c(1.3, NAVY) + c(2.6, NAVY) + box(...top, AMBER) + on('top', top, 1.6, 1.6, 3.4, 3.4, '#fff3dc');
  },

  sheet() {
    const board = B(1, 1, 0, 8, 8, 0.6);
    let cells = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      cells += on('top', board, 0.8 + c * 2.3, 0.8 + r * 2.3, 2.6 + c * 2.3, 2.6 + r * 2.3, r === 1 && c === 2 ? AMBER.top : LIGHT);
    }
    return box(...board) + cells;
  },

  users() {
    return (
      box(1.4, 4, 0, 2.6, 2.6, 3.6) + box(1.9, 4.5, 3.9, 1.6, 1.6, 1.6) +
      box(5.2, 4, 0, 2.6, 2.6, 4.6, AMBER) + box(5.7, 4.5, 4.9, 1.6, 1.6, 1.6, AMBER)
    );
  },

  store() {
    const body = B(2, 3, 0, 6, 4.5, 4);
    return (
      box(...body) +
      on('left', body, 2.2, 0, 3.8, 2.6, LIGHT) +
      on('left', body, 0.6, 1.4, 1.6, 2.6, LIGHT_DIM) +
      on('left', body, 4.4, 1.4, 5.4, 2.6, LIGHT_DIM) +
      box(1.6, 2.6, 4, 6.8, 5.6, 0.9, AMBER)
    );
  },

  calendar() {
    const pad = B(1.5, 3.5, 0, 7, 1, 7);
    let cells = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      cells += on('left', pad, 0.8 + c * 2, 0.7 + r * 1.6, 2.2 + c * 2, 1.8 + r * 1.6, r === 1 && c === 1 ? AMBER.left : LIGHT);
    }
    return box(...pad) + on('left', pad, 0.5, 5.6, 6.5, 6.4, '#0e2a52') + cells;
  },

  gauge() {
    return (
      box(1, 5, 0, 1.8, 1.8, 1.6) +
      box(3.4, 4.2, 0, 1.8, 1.8, 3.4) +
      box(5.8, 3.4, 0, 1.8, 1.8, 5.6, AMBER)
    );
  },

  launch() {
    const flag = B(3.2, 4.6, 5, 4.4, 0.5, 3);
    return box(2.4, 4.4, 0, 0.8, 0.8, 8.4) + box(...flag, AMBER) + box(1.6, 3.6, 0, 2.4, 2.4, 0.5);
  },
});

/* --- hero scenes: several objects on one platform ------------------------
   Each object is its own <g class="part"> so the page can drop the pieces
   into place one after another — the building metaphor, once, on load. */

const PLATFORM = { top: '#eef2f8', left: '#d5deeb', right: '#c3cfe0' };
const part = (svg) => `<g class="part">${svg}</g>`;

const scenes = {
  website() {
    const panel = B(1, 1.6, 0.6, 6.4, 0.7, 5.6);
    const card = B(1.2, 5, 0.6, 3.6, 2.8, 0.5);
    const phone = B(6.6, 5.6, 0.6, 2.4, 0.6, 4.2);
    return (
      part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
      part(
        box(...panel) +
        on('left', panel, 0.4, 4.6, 6, 5.2, AMBER.left) +
        on('left', panel, 0.4, 0.5, 3, 4, LIGHT) +
        on('left', panel, 3.5, 3.3, 6, 3.8, LIGHT_DIM) +
        on('left', panel, 3.5, 2.3, 6, 2.8, LIGHT_DIM) +
        on('left', panel, 3.5, 1.3, 5, 1.8, LIGHT_DIM),
      ) +
      part(box(...card, AMBER) + on('top', card, 0.5, 0.5, 2.6, 1.1, '#fff3dc')) +
      part(
        box(...phone) +
        on('left', phone, 0.2, 0.5, 2.2, 3.8, LIGHT) +
        on('left', phone, 0.4, 2.8, 2, 3.4, AMBER.left),
      )
    );
  },

  software() {
    const board = B(1, 1, 0.6, 5.6, 5.6, 0.4);
    return (
      part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
      part(box(6.8, 1, 0.6, 2.4, 2.4, 6) +
        [4.6, 3.2, 1.8].map((v) => on('left', B(6.8, 1, 0.6, 2.4, 2.4, 6), 0.4, v, 2, v + 0.5, AMBER.left)).join('')) +
      part(box(...board) + on('top', board, 0.6, 0.6, 3.4, 1.2, LIGHT) + on('top', board, 0.6, 1.8, 2.4, 2.3, LIGHT_DIM)) +
      part(box(1.6, 4.4, 1, 1.1, 1.1, 1.6) + box(3.2, 4.4, 1, 1.1, 1.1, 2.8) + box(4.8, 4.4, 1, 1.1, 1.1, 4.2, AMBER)) +
      part(box(1.4, 7.4, 0.6, 3.2, 1.8, 0.4, AMBER) + box(5.2, 7.4, 0.6, 3.2, 1.8, 0.4))
    );
  },

  app() {
    const phone = B(2.6, 4, 0.6, 4.4, 0.9, 8);
    const toast = B(7.2, 1.8, 5.4, 2.6, 2.4, 0.6);
    return (
      part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
      part(box(1, 1, 0.6, 2.8, 2.8, 1.2) + box(1.4, 1.4, 1.8, 2, 2, 1.2, AMBER)) +
      part(
        box(...phone) +
        on('left', phone, 0.3, 0.8, 4.1, 7.4, LIGHT) +
        on('left', phone, 0.7, 5.6, 3.7, 6.8, AMBER.left) +
        on('left', phone, 0.7, 4.4, 3.7, 4.9, LIGHT_DIM) +
        on('left', phone, 0.7, 3.4, 2.8, 3.9, LIGHT_DIM) +
        on('left', phone, 0.7, 1.4, 3.7, 2.9, LIGHT_DIM),
      ) +
      part(box(...toast, AMBER) + on('top', toast, 0.5, 0.6, 2.8, 1.1, '#fff3dc')) +
      part(box(1.2, 6.8, 0.6, 3.4, 2.2, 0.5) + on('top', B(1.2, 6.8, 0.6, 3.4, 2.2, 0.5), 0.5, 0.5, 2.6, 1, LIGHT))
    );
  },
};

scenes.grow = () => {
  const board = B(1.2, 1.4, 3.2, 5.4, 0.6, 3.8);
  const phone = B(6.6, 5.4, 0.6, 2.4, 0.6, 4.2);
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(
      box(2, 1.6, 0.6, 0.5, 0.5, 2.6) + box(5.4, 1.6, 0.6, 0.5, 0.5, 2.6) +
      box(...board) +
      on('left', board, 0.4, 0.5, 2.6, 3.2, AMBER.left) +
      on('left', board, 3, 2.3, 5, 2.8, LIGHT) +
      on('left', board, 3, 1.4, 5, 1.9, LIGHT_DIM) +
      on('left', board, 3, 0.5, 4.2, 1, LIGHT_DIM),
    ) +
    part(box(1.4, 5.6, 0.6, 1.2, 1.2, 1.4) + box(3, 5.6, 0.6, 1.2, 1.2, 2.6) + box(4.6, 5.6, 0.6, 1.2, 1.2, 4, AMBER)) +
    part(
      box(...phone) +
      on('left', phone, 0.2, 0.5, 2.2, 3.8, LIGHT) +
      on('left', phone, 0.35, 2.3, 1.15, 3.1, AMBER.left) +
      on('left', phone, 1.25, 2.3, 2.05, 3.1, LIGHT_DIM) +
      on('left', phone, 0.35, 1.2, 1.15, 2, LIGHT_DIM) +
      on('left', phone, 1.25, 1.2, 2.05, 2, AMBER.left),
    )
  );
};

scenes.seo = () => {
  const card = (z) => B(1, 3.4, z, 4.6, 3.6, 0.5);
  const top = card(4.2);
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(box(7, 0.8, 0.6, 1.3, 1.3, 4.8, AMBER) + box(7, 2.2, 0.6, 1.3, 1.3, 3.4) + box(7, 3.6, 0.6, 1.3, 1.3, 2)) +
    part(box(...card(0.6)) + on('top', card(0.6), 0.5, 0.6, 3.2, 1.1, LIGHT_DIM)) +
    part(box(...card(2.4)) + on('top', card(2.4), 0.5, 0.6, 3.2, 1.1, LIGHT_DIM)) +
    part(box(...top, AMBER) + on('top', top, 0.5, 0.6, 3.6, 1.2, '#fff3dc') + on('top', top, 0.5, 1.8, 2.4, 2.3, '#ffe0a8'))
  );
};

scenes.social = () => {
  const phone = B(3.4, 4.2, 0.6, 3.6, 0.8, 7);
  const tile = (x, y, z, col) => box(x, y, z, 2, 2, 0.5, col);
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(
      box(...phone) +
      on('left', phone, 0.3, 0.8, 3.3, 6.4, LIGHT) +
      on('left', phone, 0.55, 3.8, 1.8, 5.8, AMBER.left) +
      on('left', phone, 2, 3.8, 3.05, 5.8, LIGHT_DIM) +
      on('left', phone, 0.55, 1.2, 1.8, 3.4, LIGHT_DIM) +
      on('left', phone, 2, 1.2, 3.05, 3.4, AMBER.left),
    ) +
    part(tile(0.4, 4.4, 5.2) + tile(1, 6.8, 2.4, AMBER)) +
    part(box(7.4, 1.6, 5, 2.2, 1.6, 1.2) + on('left', B(7.4, 1.6, 5, 2.2, 1.6, 1.2), 0.4, 0.4, 0.8, 0.8, AMBER.left) + on('left', B(7.4, 1.6, 5, 2.2, 1.6, 1.2), 1, 0.4, 1.4, 0.8, AMBER.left))
  );
};

scenes.video = () => {
  const body = B(3, 3.4, 2.2, 3.6, 3, 2.6);
  const lens = B(6.6, 4.1, 2.8, 1.4, 1.6, 1.4);
  const panel = B(1, 1, 3.6, 2.4, 0.5, 2.6);
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(box(1.9, 1.1, 0.6, 0.5, 0.5, 3) + box(...panel, AMBER) + on('left', panel, 0.3, 0.3, 2.1, 2.3, '#ffd28a')) +
    part(box(4.4, 4.6, 0.6, 0.6, 0.6, 1.6) + box(3.8, 4, 0.6, 1.8, 1.8, 0.3)) +
    part(box(...body) + on('left', body, 0.4, 1.2, 1.4, 2, LIGHT_DIM) + box(...lens) + on('right', lens, 0.3, 0.3, 1.3, 1.1, LIGHT) + box(3.5, 3.9, 4.8, 0.9, 0.9, 0.4, AMBER))
  );
};

scenes.ads = () => {
  const board = B(1, 1.2, 3.4, 5.8, 0.6, 3.8);
  const coin = (z, col) => box(6.6, 5.6, z, 2.4, 2.4, 0.8, col);
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(
      box(1.8, 1.4, 0.6, 0.5, 0.5, 2.8) + box(5.4, 1.4, 0.6, 0.5, 0.5, 2.8) +
      box(...board) +
      on('left', board, 0.4, 0.5, 2.8, 3.2, AMBER.left) +
      on('left', board, 3.3, 2.3, 5.4, 2.8, LIGHT) +
      on('left', board, 3.3, 1.4, 5.4, 1.9, LIGHT_DIM) +
      on('left', board, 3.3, 0.5, 4.5, 1, LIGHT_DIM),
    ) +
    part(box(1.6, 5.6, 0.6, 3.4, 2.6, 0.5) + on('top', B(1.6, 5.6, 0.6, 3.4, 2.6, 0.5), 0.4, 0.5, 2.6, 1, LIGHT)) +
    part(coin(0.6, NAVY) + coin(1.5, NAVY) + coin(2.4, AMBER))
  );
};

scenes.automate = () => {
  const chip = B(3.4, 3.4, 0.6, 3.2, 3.2, 0.8);
  const bubble = B(0.8, 0.8, 4.4, 3.6, 2.4, 1.8);
  const pins = [3.9, 4.8, 5.7];
  return (
    part(box(0.2, 0.2, 0, 9.6, 9.6, 0.6, PLATFORM)) +
    part(box(7.4, 1.2, 0.6, 1.6, 1.6, 1.6) + box(7.9, 2.8, 0.6, 0.6, 1.6, 0.2, AMBER)) +
    part(
      box(...chip) +
      pins.map((a) => box(a, 6.6, 0.7, 0.5, 0.6, 0.3)).join('') +
      pins.map((a) => box(6.6, a, 0.7, 0.6, 0.5, 0.3)).join('') +
      on('top', chip, 0.4, 0.4, 2.8, 2.8, '#2a5189') +
      box(4.3, 4.3, 1.4, 1.4, 1.4, 0.8, AMBER),
    ) +
    part(box(6.8, 6.6, 0.6, 0.6, 1.2, 0.2, AMBER) + box(7.4, 7.2, 0.6, 1.6, 1.6, 1.6, AMBER)) +
    part(
      box(...bubble) + box(1.4, 3.2, 3.6, 0.9, 0.9, 0.9) +
      on('left', bubble, 0.6, 0.6, 1.2, 1.2, AMBER.left) +
      on('left', bubble, 1.5, 0.6, 2.1, 1.2, AMBER.left) +
      on('left', bubble, 2.4, 0.6, 3, 1.2, AMBER.left),
    )
  );
};

/** Inline SVG for a service or concept icon. Decorative: its heading names it. */
export function icon(name, size = 80) {
  const body = draw[name]?.();
  if (!body) throw new Error(`No icon named "${name}"`);
  return `<svg viewBox="0 0 80 80" width="${size}" height="${size}" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** A hero scene, drawn larger, with its pieces grouped for the drop-in. */
export function scene(name) {
  const body = scenes[name]?.();
  if (!body) throw new Error(`No scene named "${name}"`);
  return `<svg class="scene" viewBox="0 -4 80 84" width="320" height="336" aria-hidden="true" focusable="false">${body}</svg>`;
}

export const iconNames = Object.keys(draw);
export const sceneNames = Object.keys(scenes);
