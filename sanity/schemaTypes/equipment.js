export default {
  name: 'equipment',
  title: 'Inventario de Equipo (Cámaras/Hardware)',
  type: 'document',
  icon: () => '🎥',
  fields: [
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: '🎥 Cámaras', value: 'camaras' },
          { title: '🔦 Iluminación', value: 'iluminacion' },
          { title: '🎤 Audio', value: 'audio' },
          { title: '🔍 Objetivos', value: 'objetivos' },
          { title: '🛠 Accesorios', value: 'accesorios' },
          { title: '💻 Hardware / Workstation', value: 'hardware' },
        ],
      },
    },
    {
      name: 'items',
      title: 'Equipamiento de esta Categoría',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Modelo / Componente', type: 'string' },
            { name: 'specs', title: 'Especificaciones Clave', type: 'string' },
          ],
        },
      ],
    },
  ],
};
