import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './sanity/schemaTypes';
import { resolve } from './src/sanity/presentation/resolve';
import { myStructure } from './sanity/lib/structure';

// Definimos qué documentos son ÚNICOS (Singletons)
const singletonTypes = new Set(['settings', 'profile']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

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
    // Ocultamos los singletons del menú "Crear nuevo" (botón +)
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filtramos las acciones para que no se puedan borrar ni duplicar los singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
