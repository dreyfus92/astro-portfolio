import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

/**
 * Same rule as post routes: drafts only appear in dev.
 * Keeps getStaticPaths, listing, and prev/next navigation in sync.
 */
export function postCollectionFilter(
  entry: CollectionEntry<'posts'>,
): boolean {
  return import.meta.env.PROD ? !entry.data.draft : true
}

export async function getSortedBlogPosts(): Promise<
  CollectionEntry<'posts'>[]
> {
  const posts = await getCollection('posts', postCollectionFilter)
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}
