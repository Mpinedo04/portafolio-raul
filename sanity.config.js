import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { resolve } from './src/sanity/presentation/resolve';

export default defineConfig({
  name: 'default',
  title: 'Raúl García Portfolio CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
