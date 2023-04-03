// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import readingTime from "reading-time";
// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        draft: z.boolean(),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        })
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
};