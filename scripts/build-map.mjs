/**
 * Build the static map for the Contact page.
 *
 * Run once (`node scripts/build-map.mjs`); the result is committed to
 * src/images/. It is deliberately NOT part of `npm run build` so repeated
 * builds never re-fetch tiles from OpenStreetMap's servers.
 *
 * Tiles: openstreetmap.org, ODbL. Attribution is printed on the image and
 * repeated in the page caption, as the licence requires.
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const LAT = 27.724562, LON = 85.322562, Z = 17, TILE = 256;
const W = 1200, H = 675;
const NAVY = '#123566', AMBER = '#FF9500';

const n = 2 ** Z;
const cx = ((LON + 180) / 360) * n * TILE;
const latRad = (LAT * Math.PI) / 180;
const cy = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n * TILE;

// World-pixel bounds of the output image, and the tile range covering them.
const left = cx - W / 2, top = cy - H / 2;
const x0 = Math.floor(left / TILE), x1 = Math.floor((left + W) / TILE);
const y0 = Math.floor(top / TILE), y1 = Math.floor((top + H) / TILE);

const composites = [];
for (let x = x0; x <= x1; x++) {
  for (let y = y0; y <= y1; y++) {
    const url = `https://tile.openstreetmap.org/${Z}/${x}/${y}.png`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'NineTechnologyWebsiteBuild/1.0 (+https://ninetechsystem.com; info@ninetechsystem.com)' },
    });
    if (!res.ok) throw new Error(`tile ${x}/${y}: ${res.status}`);
    composites.push({
      input: Buffer.from(await res.arrayBuffer()),
      left: Math.round(x * TILE - left),
      top: Math.round(y * TILE - top),
    });
    await new Promise((r) => setTimeout(r, 120)); // be a polite tile client
  }
}
console.log(`fetched ${composites.length} tiles`);

// Marker, plus a desaturating wash so the brand-coloured pin is the only
// saturated thing on the image.
const mx = Math.round(W / 2), my = Math.round(H / 2);
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#F7F8FA" opacity="0.28"/>
  <circle cx="${mx}" cy="${my}" r="54" fill="${NAVY}" opacity="0.14"/>
  <path d="M${mx} ${my - 46}c-13.8 0-25 11.2-25 25 0 18.8 25 46 25 46s25-27.2 25-46c0-13.8-11.2-25-25-25z"
        fill="${NAVY}" stroke="#FFFFFF" stroke-width="4"/>
  <circle cx="${mx}" cy="${my - 21}" r="9" fill="${AMBER}"/>
  <rect x="0" y="${H - 34}" width="${W}" height="34" fill="#FFFFFF" opacity="0.82"/>
  <text x="16" y="${H - 12}" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#5A6B82">Map data © OpenStreetMap contributors</text>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: '#F7F8FA' } })
  .composite([...composites, { input: Buffer.from(overlay), left: 0, top: 0 }])
  .png({ compressionLevel: 9 })
  .toFile('src/images/map-lazimpat.png');

await writeFile('src/images/map-lazimpat.txt',
  'Static map of Lazimpat, Kathmandu centred on 27.724562, 85.322562.\n' +
  'Built by scripts/build-map.mjs from openstreetmap.org tiles.\n' +
  'Map data (c) OpenStreetMap contributors, ODbL: https://www.openstreetmap.org/copyright\n');

const { size } = await sharp('src/images/map-lazimpat.png').metadata();
console.log(`wrote src/images/map-lazimpat.png (${(size / 1024).toFixed(0)} KB source)`);
