import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['Security', 'Self-hosting', 'Web', 'Tools & dotfiles', 'Games & mods'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    order: z.number(),
    featured: z.boolean().default(false),
    // Hidden from the build until set to false (school projects need instructor sign-off).
    draft: z.boolean().default(false),
    repo: z.url({ protocol: /^https?$/ }).optional(),
    live: z.url({ protocol: /^https?$/ }).optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { projects };
