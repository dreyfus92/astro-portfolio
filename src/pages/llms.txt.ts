import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    const posts = await getCollection("posts");
    const content = `# Paul Valladares' Blog\n
    ${posts
            .map(
                (post) =>
                    `# ${post.data.title}\n\n
                https://www.paulvall.dev/posts/${post.id}.mdx \n
                ${post.data.description} \n
                  ${post.body}
                }`
            )
            .join("\n\n")}`;
    return new Response(content, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};