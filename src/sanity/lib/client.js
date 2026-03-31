import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // Set to false to ensure fresh data during editing phase
  perspective: 'published', // Show only published content by default (SAFER)
  stega: {
    enabled: true,
    studioUrl: '/admin',
  },
});
