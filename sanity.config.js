import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Raúl García Portfolio CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    deskTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
