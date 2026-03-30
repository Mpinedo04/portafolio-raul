export default {
  name: 'equipment',
  title: 'Equipo Técnico',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Categoría de Material',
      type: 'string',
      options: {
        list: [
          { title: 'Cámaras', value: 'camaras' },
          { title: 'Objetivos', value: 'objetivos' },
          { title: 'Iluminación', value: 'iluminacion' },
          { title: 'Audio', value: 'audio' },
          { title: 'Accesorios', value: 'accesorios' },
          { title: 'PC Specs / Hardware', value: 'hardware' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Lista de Materiales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre / Modelo', type: 'string' },
            { name: 'specs', title: 'Especificaciones', type: 'string' },
          ],
        },
      ],
    },
  ],
};
