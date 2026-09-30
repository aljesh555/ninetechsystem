/**
 * The home hero's field: a precise grid of points, some of which leave the
 * grid on load and assemble into the 9 of the logo. Afterwards the mark
 * breathes by about a pixel and gives way softly under the pointer, returning
 * on a critically damped spring (no overshoot).
 *
 * Canvas 2D only, no dependencies. The mark is sampled from the fallback SVG
 * already in the page, so the path is not shipped twice. Nothing here touches
 * an inline style: the canvas is sized through its width/height attributes.
 * The loop only runs while there is something to draw, the hero is on screen
 * and the tab is visible. Under reduced motion the finished mark is drawn once.
 */

const AMBER = '255,149,0';
const WHITE = '255,255,255';
const TAU = Math.PI * 2;

// Expo ease-out with a soft start: no jump on the first frame, long settle.
const ease = (t) => (t >= 1 ? 1 : (1 - 2 ** (-10 * t ** 1.5)) / (1 - 2 ** -10));
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function field() {
  const hero = document.querySelector('.hero');
  const canvas = hero?.querySelector('canvas.field');
  const path = hero?.querySelector('.hero-mark path');
  if (!canvas || !path || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const shape = new Path2D(path.getAttribute('d'));
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  let W = 0, H = 0, dpr = 1;
  let dots = [];       // flat records, see build()
  let grid = null;     // offscreen layer with the static grid
  let box = null;      // dirty rectangle once assembled
  let t0 = 0;          // intro start (ms)
  let introEnd = 0;    // seconds after t0 at which the last dot lands
  let assembled = false;
  let raf = 0, onScreen = true, lastDraw = 0, lastPointer = -1e9;
  const pointer = { x: -1e4, y: -1e4, on: false };

  /* ---- geometry --------------------------------------------------------- */

  function layout() {
    const hr = hero.getBoundingClientRect();
    const svg = hero.querySelector('.hero-mark .mark');
    const sr = svg?.getBoundingClientRect();
    W = Math.round(hr.width); H = Math.round(hr.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const small = !sr || sr.width < 10;
    let mh, cx, cy;
    if (small) {
      // Phones: a larger mark set behind the top of the copy, off the edge.
      mh = Math.min(W * 0.78, 320);
      cx = W - mh * 0.2;
      cy = mh * 0.5 + 12;
    } else {
      mh = sr.height;
      cx = sr.left - hr.left + sr.width / 2;
      cy = sr.top - hr.top + sr.height / 2;
    }
    const mw = mh * (711 / 1016);
    return { cx, cy, mw, mh, small };
  }

  function build() {
    const g = layout();
    const rows = g.small ? 46 : 70;
    const p = g.mh / rows;                 // point pitch
    const gp = p * 2;                      // grid pitch, aligned to it
    const scale = g.mh / 1016;
    const left = g.cx - g.mw / 2, top = g.cy - g.mh / 2;

    // Rasterise the mark at 2x and read its coverage back.
    const k = 2;
    const off = document.createElement('canvas');
    off.width = Math.ceil(g.mw * k); off.height = Math.ceil(g.mh * k);
    const oc = off.getContext('2d', { willReadFrequently: true });
    oc.scale(scale * k, scale * k);
    oc.fillStyle = '#fff';
    oc.fill(shape, 'evenodd');
    const px = oc.getImageData(0, 0, off.width, off.height).data;
    const alphaAt = (x, y) => {
      const ix = Math.round((x - left) * k), iy = Math.round((y - top) * k);
      if (ix < 0 || iy < 0 || ix >= off.width || iy >= off.height) return 0;
      return px[(iy * off.width + ix) * 4 + 3] / 255;
    };

    const r0 = g.small ? 1.25 : 1.2;
    const reach = g.mh * (g.small ? 0.8 : 0.95);   // how far the field extends
    const next = [];
    const i0 = Math.floor(-g.mw / 2 / p) - 1, i1 = -i0;
    const j0 = Math.floor(-g.mh / 2 / p) - 1, j1 = -j0;
    const q = p * 0.3;
    let maxTrip = 1;
    const cells = [];
    let iMax = -1e9, jMax = -1e9;
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const x = g.cx + i * p, y = g.cy + j * p;
        const cov = (alphaAt(x, y) * 2 + alphaAt(x - q, y) + alphaAt(x + q, y) + alphaAt(x, y - q) + alphaAt(x, y + q)) / 6;
        if (cov < 0.4) continue;
        cells.push([x, y, cov, false]);
        if (i > iMax) iMax = i;
        if (j > jMax) jMax = j;
      }
    }
    // The full stop: a small amber square set on the baseline after the 9,
    // as in the wordmark and at the end of the headline.
    const side = g.small ? 3 : 4;
    for (let j = jMax - side + 1; j <= jMax; j++) {
      for (let i = iMax + 2; i < iMax + 2 + side; i++) cells.push([g.cx + i * p, g.cy + j * p, 1, true]);
    }
    for (const [x, y, cov, core] of cells) {
      // Where it starts: a cell of the grid further out along roughly the
      // same bearing, so the assembly reads as a gathering, not a swarm.
      const dx = x - g.cx, dy = y - g.cy;
      const rt = Math.hypot(dx, dy);
      const th = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.3;
      const rs = Math.min(reach, rt * (1.3 + 0.55 * Math.random()) + gp * (1 + 3 * Math.random()));
      const sx = g.cx + Math.round((Math.cos(th) * rs) / gp) * gp;
      const sy = g.cy + Math.round((Math.sin(th) * rs) / gp) * gp;
      const trip = Math.hypot(sx - x, sy - y);
      if (trip > maxTrip) maxTrip = trip;
      next.push({
        tx: x, ty: y, sx, sy, trip, core,
        r: core ? r0 * 1.1 : r0 * (0.7 + 0.3 * cov),
        a: core ? 1 : 0.62,
        ph: x * 0.021 + y * 0.013,
        ox: 0, oy: 0, vx: 0, vy: 0, d: 0, x, y,
      });
    }
    // Stagger by distance travelled; the amber stop lands last.
    introEnd = 0;
    for (const d of next) {
      d.d = (d.trip / maxTrip) * 0.42 + Math.random() * 0.08 + (d.core ? 0.34 : 0);
      introEnd = Math.max(introEnd, d.d + 1.9);
    }
    dots = next;

    // The grid: drawn once, fading out with distance from the mark.
    grid = document.createElement('canvas');
    grid.width = canvas.width; grid.height = canvas.height;
    const gc = grid.getContext('2d');
    gc.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.ceil(reach / gp) + 1;
    for (let j = -n; j <= n; j++) {
      for (let i = -n; i <= n; i++) {
        const x = g.cx + i * gp, y = g.cy + j * gp;
        if (x < 0 || y < 0 || x > W || y > H) continue;
        const f = 1 - Math.hypot(x - g.cx, y - g.cy) / reach;
        if (f <= 0) continue;
        const a = 0.16 * f * f * (3 - 2 * f);
        gc.fillStyle = `rgba(${WHITE},${a.toFixed(3)})`;
        gc.beginPath(); gc.arc(x, y, 0.85, 0, TAU); gc.fill();
      }
    }
    const pad = 36;
    box = {
      x: Math.max(0, Math.floor(g.cx - g.mw / 2 - pad)), y: Math.max(0, Math.floor(g.cy - g.mh / 2 - pad)),
    };
    box.w = Math.min(W, Math.ceil(g.cx + g.mw / 2 + pad)) - box.x;
    box.h = Math.min(H, Math.ceil(g.cy + g.mh / 2 + pad)) - box.y;
  }

  /* ---- drawing ---------------------------------------------------------- */

  const buckets = [[], [], [], [], [], [], [], []];
  const bucketsAmber = [[], [], [], [], [], [], [], []];

  function draw(now) {
    const t = (now - t0) / 1000;
    const dt = Math.min((now - (lastDraw || now)) / 1000, 1 / 30);
    lastDraw = now;
    const live = assembled && !still;
    const push = live && pointer.on;
    let moving = false;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (assembled) {
      const bx = box.x * dpr, by = box.y * dpr, bw = box.w * dpr, bh = box.h * dpr;
      ctx.clearRect(bx, by, bw, bh);
      ctx.drawImage(grid, bx, by, bw, bh, bx, by, bw, bh);
      ctx.save();
      ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.clip();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = clamp01(t / 0.6);   // the field fades up, never pops
      ctx.drawImage(grid, 0, 0);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (const b of buckets) b.length = 0;
    for (const b of bucketsAmber) b.length = 0;

    const R = 96, K = 110, C = 2 * Math.sqrt(K);   // critical damping
    for (const d of dots) {
      let x, y, a, r;
      if (!assembled) {
        const e = ease(clamp01((t - d.d) / 1.9));
        x = d.sx + (d.tx - d.sx) * e;
        y = d.sy + (d.ty - d.sy) * e;
        a = 0.2 + (d.a - 0.2) * e;
        r = 0.85 + (d.r - 0.85) * e;
      } else {
        x = d.tx; y = d.ty; a = d.a; r = d.r;
        if (live) {
          // Breathe: a slow, spatially coherent drift of about a pixel.
          x += Math.sin(t * 0.55 + d.ph) * 0.9;
          y += Math.cos(t * 0.47 + d.ph * 1.3) * 0.9;
          let fx = -K * d.ox - C * d.vx, fy = -K * d.oy - C * d.vy;
          if (push) {
            const dx = x + d.ox - pointer.x, dy = y + d.oy - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < R && dist > 0.01) {
              const f = (1 - dist / R) ** 2 * 1900;
              fx += (dx / dist) * f; fy += (dy / dist) * f;
            }
          }
          d.vx += fx * dt; d.vy += fy * dt;
          d.ox += d.vx * dt; d.oy += d.vy * dt;
          if (Math.abs(d.ox) + Math.abs(d.oy) + Math.abs(d.vx) + Math.abs(d.vy) > 0.02) moving = true;
          else { d.ox = d.oy = d.vx = d.vy = 0; }
          x += d.ox; y += d.oy;
        }
      }
      d.x = x; d.y = y; d.rr = r;
      const bi = Math.min(7, Math.round(a * 7));
      (d.core ? bucketsAmber : buckets)[bi].push(d);
    }

    paint(buckets, WHITE);
    paint(bucketsAmber, AMBER);
    if (assembled) ctx.restore();
    ctx.globalAlpha = 1;

    if (!assembled && t > introEnd) {
      assembled = true;
      for (const d of dots) { d.x = d.tx; d.y = d.ty; }
    }
    return !assembled || moving || push;
  }

  function paint(set, rgb) {
    for (let i = 1; i < set.length; i++) {
      const list = set[i];
      if (!list.length) continue;
      ctx.fillStyle = `rgba(${rgb},${(i / 7).toFixed(3)})`;
      ctx.beginPath();
      for (const d of list) { ctx.moveTo(d.x + d.rr, d.y); ctx.arc(d.x, d.y, d.rr, 0, TAU); }
      ctx.fill();
    }
  }

  /* ---- the loop --------------------------------------------------------- */

  function frame(now) {
    raf = 0;
    if (!onScreen || document.hidden) { lastDraw = 0; return; }
    const busy = draw(now);
    // Busy (assembling, or springing under the pointer): every frame. At
    // rest: the breathe at ~30fps, and after half a minute untouched, stop.
    if (busy) { raf = requestAnimationFrame(frame); return; }
    if (now - lastPointer > 30000 && now - t0 > (introEnd + 30) * 1000) return;
    raf = requestAnimationFrame((n) => requestAnimationFrame(frame));
  }
  const wake = () => { if (!raf && !still) raf = requestAnimationFrame(frame); };

  function start() {
    build();
    if (still) {
      assembled = true;
      draw(performance.now());
      return;
    }
    t0 = performance.now();
    wake();

    new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) wake();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });

    if (finePointer) {
      hero.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true;
        lastPointer = performance.now();
        wake();
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { pointer.on = false; wake(); });
    }
  }

  // Resizes rebuild the field in place; the assembly never replays.
  let rt = 0, lastW = 0;
  new ResizeObserver(() => {
    const w = hero.clientWidth;
    if (w === lastW) return;
    const first = !lastW;
    lastW = w;
    if (first) return;
    clearTimeout(rt);
    rt = setTimeout(() => {
      build();
      assembled = true;
      lastDraw = 0;
      draw(performance.now());
      wake();
    }, 120);
  }).observe(hero);

  // After first paint, so the canvas never competes with the headline.
  const go = () => requestAnimationFrame(() => setTimeout(start, 60));
  if (document.readyState === 'complete') go();
  else addEventListener('load', go, { once: true });
}
