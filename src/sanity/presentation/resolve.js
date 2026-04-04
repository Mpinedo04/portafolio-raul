import { defineLocations } from 'sanity/presentation';

export const resolve = {
  locations: {
    settings: defineLocations({
      message: 'Configuración Global (Cabecera, Pie de Página)',
      resolve: () => ({
        locations: [
          { title: 'Home', href: '/' },
          { title: 'Proyectos', href: '/portfolio' },
          { title: 'Sobre Mí', href: '/sobre-mi' },
          { title: 'Equipo', href: '/equipo' },
          { title: 'Estudios', href: '/estudios' },
          { title: 'Contacto', href: '/contacto' },
        ],
      }),
    }),
    home: defineLocations({
      message: 'Portada principal de la web.',
      resolve: () => ({
        locations: [{ title: 'Home', href: '/' }],
      }),
    }),
    about: defineLocations({
      message: 'Biografía, Timeline y Fotos.',
      resolve: () => ({
        locations: [{ title: 'Sobre Mí', href: '/sobre-mi' }],
      }),
    }),
    contact: defineLocations({
      message: 'Datos de contacto y formulario.',
      resolve: () => ({
        locations: [{ title: 'Contacto', href: '/contacto' }],
      }),
    }),
    project: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: `Proyecto: ${doc?.title || 'Sin Título'}`, href: '/portfolio' },
        ],
      }),
    }),
    equipment: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Equipo Técnico', href: '/equipo' }],
      }),
    }),
    studies: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Estudios y Conocimientos', href: '/estudios' }],
      }),
    }),
    workstation: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Estación de Edición', href: '/equipo' }],
      }),
    }),
  },
};
