export default {
  name: 'about',
  title: 'Página Sobre Mí',
  type: 'document',
  groups: [
    { name: 'seo', title: '⚙️ SEO' },
    { name: 'content', title: '📝 Contenido' },
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
      title: 'SEO de Sobre Mí',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título SEO (Pestaña Navegador)', type: 'string' },
        { name: 'metaDescription', title: 'Descripción SEO (Google)', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'title',
      title: 'Título de la Página',
      type: 'string',
      initialValue: 'BIO & TRAYECTORIA',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo / Introducción corta',
      type: 'string',
      initialValue: 'La evolución de un apasionado por el séptimo arte.',
      group: 'content',
    },
    {
      name: 'storyTitle',
      title: 'Título de la Sección Historia',
      type: 'string',
      initialValue: 'CÓMO LLEGUÉ AQUÍ',
      group: 'content',
    },
    {
      name: 'galleryTitle',
      title: 'Título de la Galería de Fotos',
      type: 'string',
      initialValue: 'EN ACCIÓN',
      group: 'content',
    },
    {
      name: 'bio',
      title: 'Biografía / Historia',
      type: 'text',
      rows: 10,
    },
    {
      name: 'profileImage',
      title: 'Foto de Perfil Principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'actionPhotos',
      title: 'Fotos en Acción (Rodajes)',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
};
