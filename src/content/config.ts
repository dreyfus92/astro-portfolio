// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      draft: z.boolean(),
      cover: image(),
      coverAlt: z.string(),
    }),
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
