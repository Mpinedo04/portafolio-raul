import { defineLocations } from 'sanity/presentation';

export const resolve = {
  locations: {
    settings: defineLocations({
      message: 'Configuración Global (Cabecera, Pie de Página, Colores)',
      resolve: () => ({
        locations: [
          { title: 'Home', href: '/' },
          { title: 'Portfolio', href: '/portfolio' },
          { title: 'Sobre Mí', href: '/sobre-mi' },
          { title: 'Equipo', href: '/equipo' },
          { title: 'Habilidades', href: '/habilidades' },
          { title: 'Contacto', href: '/contacto' },
        ],
      }),
    }),
    home: defineLocations({
      message: 'Esta es la Portada principal de la web.',
      resolve: () => ({
        locations: [{ title: 'Home', href: '/' }],
      }),
    }),
    about: defineLocations({
      message: 'Tu Biografía y Fotos de Rodaje.',
      resolve: () => ({
        locations: [{ title: 'Sobre Mí', href: '/sobre-mi' }],
      }),
    }),
    contact: defineLocations({
      message: 'Tus datos de comunicación y formulario.',
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
    skill: defineLocations({
      resolve: () => ({
        locations: [{ title: 'Habilidades', href: '/habilidades' }],
      }),
    }),
  },
};
