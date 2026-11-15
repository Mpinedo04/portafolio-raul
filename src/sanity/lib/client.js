import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true, // CDN de Sanity: cachea las lecturas públicas y baja la latencia
  perspective: 'published', // Show only published content by default (SAFER)
  stega: {
    enabled: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANITY_STEGA === 'true',
    studioUrl: '/admin',
  },
});
