export default {
  name: 'about',
  title: 'Página Sobre Mí',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO de Sobre Mí',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Título SEO', type: 'string' },
        { name: 'metaDescription', title: 'Descripción SEO', type: 'text', rows: 3 },
      ],
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
