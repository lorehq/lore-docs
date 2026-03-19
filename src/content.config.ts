import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  navGroup: z.string().optional(),
  navLabel: z.string().optional(),
  order: z.number().optional(),
});

const gettingStarted = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/getting-started" }),
  schema: pageSchema,
});

const concepts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/concepts" }),
  schema: pageSchema,
});

export const collections = { gettingStarted, concepts };
