/**
 * Blog posts. One markdown file per post in src/content/blog/. To publish a
 * new one, add a file with the frontmatter below; nothing else needs editing.
 * Set `draft: true` to keep a post out of the build.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['AI', 'Costs', 'Buying advice', 'Payments', 'Sectors', 'Automation', 'Search visibility']),
    art: z.enum(['website', 'software', 'app', 'services', 'grow', 'automate', 'support', 'payments', 'process', 'seo']),
    takeaways: z.array(z.string()).min(2).max(5),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    service: z.object({ label: z.string(), href: z.string() }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
