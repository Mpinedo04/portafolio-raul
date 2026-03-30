import { defineLocations } from 'sanity/presentation';

export const resolve = {
  locations: {
    settings: defineLocations({
      message: 'Configuración Global (Logo, Colores, Redes)',
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
    profile: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: `Home (${doc?.name || 'Bio'})`, href: '/' },
          { title: 'Sobre Mí', href: '/sobre-mi' },
          { title: 'Portfolio (Footer)', href: '/portfolio' },
          { title: 'Equipo (Footer)', href: '/equipo' },
          { title: 'Contacto (Footer)', href: '/contacto' },
        ],
      }),
    }),
    project: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Proyecto', href: '/portfolio' },
          { title: 'Portfolio Index', href: '/portfolio' },
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
