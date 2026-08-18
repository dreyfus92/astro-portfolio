import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getSortedBlogPosts } from '@utils/posts-collection'

export const prerender = true

export const GET: APIRoute = async (context) => {
  const posts = await getSortedBlogPosts()
  return rss({
    title: "Paul Valladares' Blog",
    description:
      'Coding quirks, tech discoveries, historical mysteries and occasional life musings.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
    })),
  })
}
