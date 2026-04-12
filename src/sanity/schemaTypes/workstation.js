export default {
  name: 'workstation',
  title: 'Estación de Edición',
  type: 'document',
  icon: () => '🖥️',
  fields: [
    {
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'EQUIPO TÉCNICO',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Herramientas de alta gama para resultados cinematográficos.',
    },
    {
      name: 'bannerImage',
      title: 'Imagen de Fondo Cabecera (Página Equipo)',
      type: 'image',
      options: { hotspot: true },
      description: 'Esta foto aparecerá de fondo en el banner principal de la página /equipo',
    },
    {
      name: 'components',
      title: 'Componentes del PC',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'componentName', title: 'Componente', type: 'string', description: 'Ej: CPU, GPU, RAM' },
            { name: 'value', title: 'Modelo / Valor', type: 'string', description: 'Ej: AMD Ryzen 9 5900X' },
            { name: 'specs', title: 'Detalle Extra', type: 'string', description: 'Ej: 16 Núcleos / 32 Hilos' },
          ],
          preview: {
            select: { title: 'componentName', subtitle: 'value' },
          },
        },
      ],
    },
  ],
};
