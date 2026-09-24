/**
 * Build-time brand assets: favicons, app icons, the web manifest and the
 * 1200x630 Open Graph card. Runs before every `astro build` (npm prebuild).
 *
 * Sources are the founder-supplied brand files, cleaned and optimised by
 * scripts/prepare-brand.mjs:
 *   - avatar-social-navy-bg.svg -> every icon (it is the only square lockup, and
 *                                the only one that stays legible at 32px)
 *   - og.svg                  -> the share card, composed by scripts/build-og.py
 *                                from logo-wordmark-white.svg and logo-symbol-white.svg
 * sharp writes no EXIF, so every output is clean.
 */
import sharp from 'sharp';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';

const OUT = 'public';
await mkdir(OUT, { recursive: true });

const symbol = 'assets/brand/avatar-social-navy-bg.svg';

const icons = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon-180.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
];

for (const { file, size } of icons) {
  await sharp(symbol, { density: 600 })
    .resize(size, size)
    .png({ compressionLevel: 9, palette: size <= 192 })
    .toFile(`${OUT}/${file}`);
}

await copyFile(symbol, `${OUT}/favicon.svg`);

await sharp('assets/brand/og.svg', { density: 300 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/og.png`);

await writeFile(
  `${OUT}/manifest.webmanifest`,
  JSON.stringify(
    {
      name: 'Nine Technology',
      short_name: 'Nine Tech',
      description: 'Websites, software and AI automation for businesses in Kathmandu.',
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#123566',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2,
  ) + '\n',
);

console.log('brand assets: favicons, og.png and manifest written to public/');
