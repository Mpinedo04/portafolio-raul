import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './src/sanity/schemaTypes';
import { resolve } from './src/sanity/presentation/resolve';
import { myStructure } from './src/sanity/lib/structure';

const singletonTypes = new Set(['settings', 'home', 'about', 'contact', 'studies', 'workstation']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore', 'create']);

export default defineConfig({
  name: 'default',
  title: 'CENTRO DE MANDO 🎬',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
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
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
