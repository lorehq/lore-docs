import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reference = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/reference" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const explanation = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/explanation" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { reference, explanation };
