// Full-page screenshot by rendering at a very tall viewport, then slicing the
// result into readable panels. Avoids needing a CDP client.
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [path, width, name, sliceH = '900'] = process.argv.slice(2);
const OUT = process.env.SHOT_DIR;
const tall = mkdtempSync(join(tmpdir(), 'shot-'));
const raw = join(tall, 'raw.png');

execFileSync('google-chrome', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--force-prefers-reduced-motion',
  `--window-size=${width},16000`,
  `--screenshot=${raw}`,
  `http://127.0.0.1:4321${path}`,
], { stdio: 'ignore' });

// Trim the blank tail left by the oversized viewport.
const img = sharp(raw);
const { height } = await img.metadata();
const buf = await img.raw().toBuffer({ resolveWithObject: true });
const { data, info } = buf;
let last = 0;
for (let y = 0; y < info.height; y++) {
  // Only scan the left side: the fixed WhatsApp button pins itself to the
  // bottom of the (very tall) viewport and would otherwise defeat the trim.
  for (let x = 0; x < info.width * 0.6; x += 7) {
    const i = (y * info.width + x) * info.channels;
    // anything that is not the white page background counts as content
    if (data[i] < 248 || data[i + 1] < 248 || data[i + 2] < 248) { last = y; break; }
  }
}
const contentH = Math.min(height, last + 40);
const h = Number(sliceH);
const panels = Math.ceil(contentH / h);
for (let i = 0; i < panels; i++) {
  const top = i * h;
  await sharp(raw)
    .extract({ left: 0, top, width: Number(width), height: Math.min(h, contentH - top) })
    .png()
    .toFile(`${OUT}/${name}-${String(i + 1).padStart(2, '0')}.png`);
}
console.log(`${name}: ${contentH}px tall -> ${panels} panels`);
