export default {
  name: 'equipment',
  title: 'Equipamiento Técnico',
  type: 'document',
  icon: () => '🎥',
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
      name: 'name',
      title: 'Nombre del Equipo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: '🎥 Cámaras', value: 'video_camaras' },
          { title: '🔭 Objetivos', value: 'video_objetivos' },
          { title: '📎 Accesorios de Vídeo', value: 'video_accesorios' },
          { title: '🎙️ Micrófonos', value: 'sonido_microfonos' },
          { title: '🎛️ Grabadoras', value: 'sonido_grabadoras' },
          { title: '🎧 Accesorios de Sonido', value: 'sonido_accesorios' },
          { title: '💡 Focos', value: 'iluminacion_focos' },
          { title: '🔦 Accesorios de Iluminación', value: 'iluminacion_accesorios' },
          { title: '🟩 Croma / Fondos', value: 'extras_croma' },
          { title: '📦 Otros', value: 'extras_otros' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'model',
      title: 'Modelo Específico',
      type: 'string',
    },
    {
      name: 'specs',
      title: 'Especificaciones Técnicas',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Foto del Equipo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'model' },
  },
};
