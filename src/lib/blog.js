/** Shared helpers for the blog listing and post pages. */
import { getCollection } from 'astro:content';

/** Published posts, newest first. Drafts never ship. */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date - a.data.date);
}

/** Reading time from the raw markdown, at 200 words a minute. */
export const readingTime = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const formatDate = (date) =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
