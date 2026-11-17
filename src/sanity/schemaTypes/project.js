export default {
  name: 'project',
  title: 'Catálogo de Proyectos',
  type: 'document',
  // Icono visual en el panel
  icon: () => '🎬',
  groups: [
    { name: 'general', title: '📌 General', default: true },
    { name: 'media', title: '🖼️ Medios' },
    { name: 'details', title: '📝 Detalles' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  orderings: [
    {
      title: 'Orden Manual',
      name: 'orderRankAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'orderRank',
      title: '📌 Orden de Aparición',
      type: 'number',
      group: 'general',
      description: 'Número más bajo = aparece primero. Usa 10, 20, 30... para poder intercalar después.',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo / Frase Corta',
      type: 'string',
      group: 'general',
      description: 'Ej: "Parodia musical de Espresso", "Documental urbano"',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Proyecto Propio', value: 'propio' },
          { title: 'Proyecto Externo', value: 'externo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customLabel',
      title: 'Etiqueta Visible (Badge)',
      type: 'string',
      group: 'general',
      description: 'Texto libre para el recuadrito. Ej: "YouTube", "Estudios", "Cliente", "Empresa"',
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal / Miniatura',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: 'URL del Vídeo (YouTube/Vimeo)',
      type: 'url',
      group: 'media',
      description: 'Enlace al vídeo para incrustar',
    },
    {
      name: 'behindTheScenes',
      title: 'Making Of / BTS (Fotos y Vídeos)',
      type: 'array',
      group: 'media',
      of: [
        { type: 'image', options: { hotspot: true }, title: 'Imagen directa' },
        {
          type: 'object',
          name: 'youtubeVideo',
          title: 'Vídeo de YouTube / Vimeo',
          fields: [
            { name: 'url', title: 'Enlace del Video', type: 'url' }
          ],
          preview: {
            select: { subtitle: 'url' },
            prepare(selection) {
              return { title: '🎥 Vídeo BTS', subtitle: selection.subtitle }
            }
          }
        }
      ],
      description: 'Añade fotos o pega la URL a vídeos de tomas falsas u otros momentos.',
    },
    {
      name: 'audioUrl',
      title: 'Enlace de Audio',
      type: 'url',
      group: 'media',
    },
    {
      name: 'description',
      title: 'Descripción del Proyecto',
      type: 'text',
      group: 'details',
      rows: 5,
    },
    {
      name: 'role',
      title: 'Mi Rol / Tareas',
      type: 'string',
      group: 'details',
      description: 'Ej: Director de Fotografía, Montador, etc.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Año de Producción',
      type: 'number',
      group: 'details',
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'featured',
      title: '🎥 Destacar en Página de Inicio',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO Personalizado para este Proyecto',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título SEO', type: 'string' },
        { name: 'metaDescription', title: 'Descripción SEO', type: 'text', rows: 3 },
      ],
    },
  ],
};
