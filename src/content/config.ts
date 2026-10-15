import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.string(),
    type: z.enum(['CORTE', 'BARBA', 'PAQUETE', 'PRODUCTO', 'TRATAMIENTO']),
    discountPercent: z.number().optional(),
    duration: z.string().optional(),
    popular: z.boolean().optional(),
  }),
});

export const collections = { posts };
