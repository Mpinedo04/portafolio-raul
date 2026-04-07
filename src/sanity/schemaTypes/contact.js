export default {
  name: 'contact',
  title: 'Página de Contacto',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Contenido' },
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
      title: 'Título Principal',
      type: 'string',
      initialValue: 'TRABAJEMOS JUNTOS',
      group: 'content',
    },
    {
      name: 'bannerImage',
      title: 'Imagen de Fondo del Banner',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      description: 'Foto que aparecerá de fondo en la cabecera.',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: '¿Tienes un proyecto en mente? Cuéntame los detalles y hagámoslo realidad.',
      group: 'content',
    },
    {
      name: 'contactLocation',
      title: 'Disponibilidad / Ubicación',
      type: 'string',
      initialValue: 'Proyectos nacionales e internacionales.',
      group: 'content',
    },
    {
      name: 'formspreeId',
      title: 'ID de Formspree (Formulario)',
      type: 'string',
      group: 'content',
      description: 'El identificador de tu formulario en Formspree.io',
    },
  ],
};
