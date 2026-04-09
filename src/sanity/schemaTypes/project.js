export default {
  name: 'project',
  title: 'Catálogo de Proyectos',
  type: 'document',
  // Icono visual en el panel
  icon: () => '🎬',
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
      description: 'Número más bajo = aparece primero. Usa 10, 20, 30... para poder intercalar después.',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      description: 'Ej: "Parodia musical de Espresso", "Documental urbano"',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
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
      description: 'Texto libre para el recuadrito. Ej: "YouTube", "Estudios", "Cliente", "Empresa"',
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal / Miniatura',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: 'URL del Vídeo (YouTube/Vimeo)',
      type: 'url',
      description: 'Enlace al vídeo para incrustar',
    },
    {
      name: 'gallery',
      title: 'Galería de Fotos',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'audioUrl',
      title: 'Enlace de Audio',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Descripción del Proyecto',
      type: 'text',
      rows: 5,
    },
    {
      name: 'role',
      title: 'Mi Rol / Tareas',
      type: 'string',
      description: 'Ej: Director de Fotografía, Montador, etc.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Año de Producción',
      type: 'number',
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'featured',
      title: '🎥 Destacar en Página de Inicio',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO Personalizado para este Proyecto',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Título SEO', type: 'string' },
        { name: 'metaDescription', title: 'Descripción SEO', type: 'text', rows: 3 },
      ],
    },
  ],
};
