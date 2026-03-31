export default {
  name: 'contact',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO de Contacto',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Título SEO', type: 'string' },
        { name: 'metaDescription', title: 'Descripción SEO', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'contactEmail',
      title: 'Email Público (Muestra)',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
    },
    {
      name: 'contactLocation',
      title: 'Ubicación / Disponibilidad',
      type: 'string',
    },
    {
      name: 'formspreeId',
      title: 'ID de Formspree (Envío de Mensajes)',
      type: 'string',
      description: 'El código de tu formulario en Formspree (Ej: xxyzabc)',
    },
  ],
};
