import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/tutorials" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const howTo = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/how-to" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const reference = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/reference" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['rule', 'skill', 'agent', 'fieldnote', 'runbook']).optional(),
  }),
});

const explanation = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/explanation" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/changelog" }),
  schema: z.object({
    title: z.string(),
  }),
});

const evidence = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/explanation/evidence" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { tutorials, 'how-to': howTo, reference, explanation, changelog, evidence };
