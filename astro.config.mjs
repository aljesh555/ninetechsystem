// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ninetechsystem.com',

  // One URL form. `format: 'file'` emits /services.html, which Cloudflare Pages
  // serves at /services and redirects /services/ to, so there is never a
  // trailing-slash duplicate to canonicalise.
  trailingSlash: 'never',

  build: {
    format: 'file',
    // The whole stylesheet is ~5 KB gzipped. Inlining it removes the only
    // render-blocking request on the page and satisfies "critical CSS inlined".
    inlineStylesheets: 'always',
  },

  compressHTML: true,

  image: {
    // sharp strips EXIF/GPS from every generated variant.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  devToolbar: { enabled: false },
});
