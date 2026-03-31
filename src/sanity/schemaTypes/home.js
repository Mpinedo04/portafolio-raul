export default {
  name: 'home',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO de la Página de Inicio',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Título para Google', type: 'string' },
        { name: 'metaDescription', title: 'Descripción para Google', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'name',
      title: 'Nombre en Portada (Logo Central)',
      type: 'string',
      initialValue: 'RAÚL GARCÍA',
    },
    {
      name: 'subHeadline',
      title: 'Antetítulo (Texto sobre el nombre)',
      type: 'string',
      initialValue: 'CREANDO HISTORIAS A TRAVÉS DEL VISOR',
    },
    {
      name: 'headline',
      title: 'Titular de Portada',
      type: 'string',
      initialValue: 'Filmmaker & Editor de Vídeo',
    },
    {
      name: 'heroImage',
      title: 'Imagen de Fondo (Hero)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'heroButtons',
      title: 'Botones de Acción',
      type: 'object',
      fields: [
        { name: 'primaryText', title: 'Texto Botón 1', type: 'string', initialValue: 'Ver Proyectos' },
        { name: 'primaryUrl', title: 'Enlace Botón 1', type: 'string', initialValue: '/portfolio' },
        { name: 'secondaryText', title: 'Texto Botón 2', type: 'string', initialValue: 'Trabajemos Juntos' },
        { name: 'secondaryUrl', title: 'Enlace Botón 2', type: 'string', initialValue: '/contacto' },
      ],
    },
  ],
};
