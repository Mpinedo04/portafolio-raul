export default {
  name: 'studies',
  title: 'Estudios y Conocimientos',
  type: 'document',
  icon: () => '🎓',
  fields: [
    {
      name: 'bannerImage',
      title: 'Imagen de Fondo del Banner',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'ESTUDIOS Y CONOCIMIENTOS',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Formación continua para perfeccionar el arte audiovisual.',
    },
    {
      name: 'education',
      title: 'Formación Académica',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'institution', title: 'Centro / Universidad', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'degree', title: 'Título / Grado', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'year', title: 'Año / Periodo', type: 'string' },
            { name: 'grade', title: 'Nota / Expediente', type: 'string' },
            { name: 'logo', title: 'Logo de la Institución', type: 'image' },
          ],
          preview: {
            select: { title: 'degree', subtitle: 'institution' },
          },
        },
      ],
    },
    {
      name: 'courses',
      title: 'Cursos y Certificaciones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'courseName', title: 'Nombre del Curso', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'institution', title: 'Plataforma / Centro', type: 'string' },
            { name: 'year', title: 'Año', type: 'string' },
            { name: 'description', title: 'Descripción del Curso', type: 'text', rows: 2, description: 'Explica brevemente de qué trataba la formación.' },
            { name: 'certificateFile', title: 'Archivo de Certificado (PDF)', type: 'file', options: { accept: '.pdf' } },
          ],
          preview: {
            select: { title: 'courseName', subtitle: 'institution' },
          },
        },
      ],
    },
    {
      name: 'software',
      title: 'Software y Programas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'softwareName', title: 'Nombre del Software', type: 'string', validation: (Rule) => Rule.required() },
            { 
              name: 'category', 
              title: 'Categoría', 
              type: 'string',
              options: {
                list: [
                  { title: 'Edición de Vídeo', value: 'video' },
                  { title: 'Audio / Sonido', value: 'audio' },
                  { title: 'Edición Fotográfica / Diseño', value: 'design' },
                  { title: 'Efectos Visuales / Animación', value: 'vfx' },
                  { title: 'Otros', value: 'other' },
                ],
              },
            },
            { 
              name: 'level', 
              title: 'Nivel de Dominio (1-5)', 
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
              description: '1 = Básico, 5 = Experto',
            },
            { name: 'icon', title: 'Icono / Logo del Software', type: 'image' },
            { 
              name: 'briefDescription', 
              title: 'Breve Descripción', 
              type: 'text', 
              rows: 2,
              description: 'Ej: "Control total de montaje y corrección de color" o "Animaciones básicas y textos"',
            },
          ],
          preview: {
            select: { title: 'softwareName', subtitle: 'category' },
          },
        },
      ],
    },
  ],
};
