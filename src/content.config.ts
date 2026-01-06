import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ pattern: '**/_section.md', base: './src/content' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    order: z.number(),
    status: z.string().optional(),
    summary: z.string().optional(),
    heroImage: z.string().optional(),
    readTime: z.string().optional(),
    difficulty: z.string().optional(),
    author: z.string().optional(),
    reviewer: z.string().optional(),
    issue: z.string().optional(),
    jurisdiction: z.string().optional(),
    // Dictionary-specific fields
    pronunciation: z.string().optional(),
    wordType: z.string().optional(),
    jurisdictions: z.array(z.string()).optional(),
    relatedTerms: z.array(z.string()).optional(),
    relatedStory: z.string().optional(),
    // Question-specific fields
    group: z.string().optional(),
    quickAnswer: z.string().optional(),
    relatedGuides: z.array(z.string()).optional(),
    relatedChecklists: z.array(z.string()).optional(),
    // Story-specific fields
    featured: z.boolean().optional(),
  }),
});

export const collections = { categories, articles };