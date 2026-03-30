import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // CDN is false for real-time draft previews
  perspective: 'previewDrafts', // IMPORTANT: Show unsaved changes in preview
  token: process.env.SANITY_API_READ_TOKEN, // Needed for drafts
  stega: {
    enabled: true,
    studioUrl: '/admin',
  },
});
