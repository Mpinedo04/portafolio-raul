export default {
  name: 'about',
  title: 'Sobre Mí',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Contenido' },
    { name: 'timeline', title: '📖 Timeline / Etapas' },
    { name: 'seo', title: '⚙️ SEO' },
  ],
  fields: [
    {
      name: 'seo',
      title: 'SEO de la Página',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título para Google', type: 'string' },
        { name: 'metaDescription', title: 'Descripción para Google', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'BIO & TRAYECTORIA',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'La evolución de un apasionado por el séptimo arte.',
      group: 'content',
    },
    {
      name: 'bannerImage',
      title: 'Imagen de Fondo del Banner',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      description: 'Foto que aparecerá de fondo en la cabecera de la página.',
    },
    {
      name: 'storyTitle',
      title: 'Título de la Historia',
      type: 'string',
      initialValue: 'CÓMO LLEGUÉ AQUÍ',
      group: 'content',
    },
    {
      name: 'bio',
      title: 'Biografía Principal',
      type: 'text',
      rows: 10,
      group: 'content',
    },
    {
      name: 'profileImage',
      title: 'Foto de Perfil Principal',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    },
    {
      name: 'cvFile',
      title: 'Archivo CV (PDF)',
      type: 'file',
      group: 'content',
      description: 'Sube tu currículum en formato PDF para descarga.',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'stages',
      title: 'Etapas de Vida (Timeline)',
      type: 'array',
      group: 'timeline',
      description: 'Cada etapa se mostrará alternando imagen/texto en un timeline visual.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stageTitle', title: 'Título de la Etapa', type: 'string', description: 'Ej: "Los inicios", "La formación"' },
            { name: 'stageText', title: 'Descripción', type: 'text', rows: 4 },
            { name: 'stageImage', title: 'Foto de la Época', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'stageTitle' },
          },
        },
      ],
    },
  ],
};
