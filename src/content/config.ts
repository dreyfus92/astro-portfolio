// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        minutesRead: z.string().optional(),
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
};