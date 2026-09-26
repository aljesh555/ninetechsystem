/**
 * Turns the founder-supplied brand files into production assets.
 *
 * Sources live in assets/brand/source/ exactly as delivered and are never
 * edited. Outputs go to assets/brand/. Run after replacing a source file:
 *
 *   node scripts/prepare-brand.mjs
 *
 * What it does, and why each step is needed:
 *
 *  1. Strips the C2PA "content credentials" manifest. It is 8-12 KB of base64
 *     per file — roughly three quarters of each file — and it carries tool and
 *     document identifiers that have no business being served to the public.
 *  2. Removes the opaque navy background rectangle from wordmark-white.svg.
 *     Left in, it paints a navy box wherever the logo sits, which is visible
 *     against the footer's deeper navy.
 *  3. Crops the wordmark viewBox to the artwork. As delivered it has ~20% empty
 *     margin, which would make the header logo look undersized for no reason.
 *  4. Drops width/height so CSS controls the size, and marks the art decorative
 *     — every place these are used already supplies its own accessible name.
 *  5. Runs svgo. The supplied artwork is auto-traced — the 9 alone is 189 path
 *     commands at two decimal places — and these files are inlined into the
 *     HTML, so the saving is page weight on every request.
 *  6. Emits symbol-mono.svg, a currentColor copy used for image placeholders.
 */

// Geometry only. Nothing here may touch fills, viewBox or the aria attributes
// added below, because those are load-bearing.
const svgo = (svg, name) =>
  optimize(svg, {
    path: name,
    multipass: true,
    plugins: [
      { name: 'preset-default', params: { overrides: {
        convertPathData: { floatPrecision: 1, transformPrecision: 3 },
        cleanupNumericValues: { floatPrecision: 1 },
      } } },
      { name: 'convertStyleToAttrs' },
    ],
  }).data;
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { optimize } from 'svgo';

const SRC = 'assets/brand/source';
const OUT = 'assets/brand';

// Measured from the rendered artwork; see DECISIONS.md.
const TIGHT_WORDMARK = '91 88 608 259';
const TIGHT_FULL = '23 23 665 294';

// As delivered, the gap between the 9 and the wordmark is 114 units against a
// symbol 201 wide — 57% of the symbol's own width, so the two halves read as
// two marks rather than one lockup. Closing it by 54 units brings the gap to
// roughly 22% of the symbol, which is where a lockup holds together. The
// artwork itself is untouched: the wordmark is moved, not redrawn, and
// TIGHT_FULL above loses the same 54 units of width.
const LOCKUP_CLOSE = 70;

const clean = (svg) =>
  svg
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
    .replace(/ xmlns:c2pa="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();

const decorative = (svg) =>
  svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ');

let total = 0;
for (const name of (await readdir(SRC)).filter((f) => f.endsWith('.svg')).sort()) {
  const raw = await readFile(join(SRC, name), 'utf8');
  let svg = clean(raw);

  if (name === 'logo-full-white.svg') {
    // The delivered white lockup left the 9 navy while recolouring everything
    // else, so the symbol all but disappears on a navy ground. The symbol is
    // the first fill in the file; recolour exactly that one.
    const before = svg;
    svg = svg.replace(/fill="#123566"/, 'fill="#FFFFFF"');
    if (svg === before) console.warn(`  ! ${name}: expected a navy fill to recolour, none found`);
    else if (svg.includes('#123566')) console.warn(`  ! ${name}: navy still present after recolour`);
    else console.log('    (recoloured the 9 from navy to white — see DECISIONS.md)');
  }

  if (name === 'logo-wordmark-white.svg') {
    // The full-canvas navy backdrop. Matched by its exact dimensions so a
    // future file without it, or with a different shape, is left alone.
    const before = svg;
    svg = svg.replace(/<rect x="0" y="0" width="787\.912" height="435\.000" fill="#123566"\/>/, '');
    if (svg === before) console.warn(`  ! ${name}: expected background rect not found, left as-is`);
  }

  if (name.startsWith('logo-wordmark') || name.startsWith('logo-full')) {
    const box = name.startsWith('logo-full') ? TIGHT_FULL : TIGHT_WORDMARK;
    svg = svg
      .replace(/ width="[\d.]+" height="[\d.]+"/, '')
      .replace(/viewBox="[^"]*"/, `viewBox="${box}"`);
  }

  svg = svgo(svg, name);

  if (name.startsWith('logo-full')) {
    // Applied after svgo, which is what reduces the delivered fifteen paths in
    // nested groups to a symbol followed by the wordmark. The symbol is the
    // first path; everything after it, the full stop included, moves together.
    const parts = svg.match(/<path[^>]*\/>/g) ?? [];
    if (parts.length < 2) {
      console.warn(`  ! ${name}: expected a symbol then a wordmark, found ${parts.length} paths`);
    } else {
      const [symbol, ...word] = parts;
      svg = svg.replace(
        /<path[\s\S]*<\/svg>/,
        `${symbol}<g transform="translate(-${LOCKUP_CLOSE} 0)">${word.join('')}</g></svg>`,
      );
    }
  }

  svg = decorative(svg) + '\n';
  await writeFile(join(OUT, name), svg);
  total += svg.length;
  console.log(`  ${name.padEnd(30)} ${String(raw.length).padStart(6)} -> ${String(svg.length).padStart(5)} bytes`);
}

// A single-colour copy for empty image slots, tinted by CSS `color`.
const mono = decorative(svgo(clean(await readFile(join(SRC, 'logo-symbol-navy.svg'), 'utf8')), 'logo-symbol-mono.svg'))
  .replace(/fill="#123566"/g, 'fill="currentColor"');
await writeFile(join(OUT, 'logo-symbol-mono.svg'), mono + '\n');
console.log(`  ${'logo-symbol-mono.svg'.padEnd(30)} ${''.padStart(6)}    ${mono.length} bytes (currentColor)`);
console.log(`\n  total ${(total / 1024).toFixed(1)} KB across ${(await readdir(OUT)).filter((f) => f.endsWith('.svg')).length} files\n`);
