export default {
  name: 'home',
  title: 'Página de Inicio',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Contenido' },
    { name: 'seo', title: '⚙️ SEO' },
  ],
  fields: [
    {
      name: 'locale',
      title: 'Idioma',
      type: 'string',
      initialValue: 'es',
      hidden: true,
    },
    {
      name: 'seo',
      title: 'SEO de la Página de Inicio',
      type: 'object',
      group: 'seo',
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
      group: 'content',
    },
    {
      name: 'subHeadline',
      title: 'Antetítulo (Texto sobre el nombre)',
      type: 'string',
      initialValue: 'CREANDO HISTORIAS A TRAVÉS DEL VISOR',
      group: 'content',
    },
    {
      name: 'headline',
      title: 'Titular de Portada',
      type: 'string',
      initialValue: 'Filmmaker & Editor de Vídeo',
      group: 'content',
    },
    {
      name: 'heroImage',
      title: 'Imagen de Fondo (Hero)',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    },
    {
      name: 'heroButtons',
      title: 'Botones de Acción',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'primaryText', title: 'Texto Botón 1', type: 'string', initialValue: 'Ver Proyectos' },
        { name: 'primaryUrl', title: 'Enlace Botón 1', type: 'string', initialValue: '/proyectos' },
        { name: 'secondaryText', title: 'Texto Botón 2', type: 'string', initialValue: 'Trabajemos Juntos' },
        { name: 'secondaryUrl', title: 'Enlace Botón 2', type: 'string', initialValue: '/contacto' },
      ],
    },
  ],
};
