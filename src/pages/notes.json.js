import { getCollection } from "astro:content";

export async function GET() {
  const notes = await getCollection("notes");
  const data = notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      slug: post.slug,
      tags: post.data.tags ?? [],
      status: post.data.status,
      pubDate: post.data.pubDate,
      body: post.body,
    }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
