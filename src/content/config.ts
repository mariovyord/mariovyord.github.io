import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z
      .enum(["seedling", "growing", "evergreen"])
      .default("evergreen"),
  }),
});

const books = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    addedDate: z.coerce.date(),
    finishedDate: z.coerce.date().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(["reading", "want-to-read", "read"]),
    link: z.string().url().optional(),
  }),
});

export const collections = { notes, books };
