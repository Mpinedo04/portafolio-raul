export default {
  name: 'skill',
  title: 'Habilidades y Formación',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
            { title: 'Software de Edición', value: 'video' },
            { title: 'Software de Sonido', value: 'audio' },
            { title: 'Formación Académica', value: 'educacion' },
            { title: 'Especialización / Áreas Técnicas', value: 'especializacion' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Nombre de Habilidad o Estudio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Nivel (1-100)',
      type: 'number',
      description: 'Solo para Software',
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: 'period',
      title: 'Periodo / Fecha',
      type: 'string',
      description: 'Solo para Formación',
    },
    {
      name: 'institution',
      title: 'Institución / Centro',
      type: 'string',
      description: 'Solo para Formación',
    },
  ],
};
