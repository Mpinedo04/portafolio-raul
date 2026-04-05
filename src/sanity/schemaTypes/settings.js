export default {
  name: 'settings',
  title: 'Configuraciones Generales',
  type: 'document',
  groups: [
    { name: 'header', title: 'CABECERA (HEADER)' },
    { name: 'footer', title: 'PIE DE PÁGINA (FOOTER)' },
    { name: 'pages', title: 'BANNERS DE PÁGINA' },
    { name: 'typography', title: 'TIPOGRAFÍA Y ESTILO' },
    { name: 'seo', title: 'SEO (GOOGLE / SOCIAL)' },
  ],
  fields: [
    {
      name: 'locale',
      title: 'Idioma',
      type: 'string',
      initialValue: 'es',
      hidden: true,
    },
    {
      name: 'seo',
      title: 'SEO Global y Metadatos',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título para Google', type: 'string', description: 'Ej: Raúl García | Filmmaker & Director' },
        { name: 'metaDescription', title: 'Descripción para Google', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'brandName',
      title: 'Nombre de la Marca (Logo)',
      type: 'string',
      group: 'header',
      initialValue: 'RAÚL GARCÍA',
    },
    {
      name: 'portfolioBanner',
      title: 'Banner Hub Proyectos',
      type: 'image',
      group: 'pages',
      options: { hotspot: true },
      description: 'Imagen de cabecera para la página principal de /portfolio',
    },
    {
      name: 'propiosBanner',
      title: 'Banner Proyectos Propios',
      type: 'image',
      group: 'pages',
      options: { hotspot: true },
      description: 'Imagen de cabecera para la página de /portfolio/propios',
    },
    {
      name: 'externosBanner',
      title: 'Banner Trabajos Externos',
      type: 'image',
      group: 'pages',
      options: { hotspot: true },
      description: 'Imagen de cabecera para la página de /portfolio/externos',
    },
    {
      name: 'contactEmail',
      title: 'Email Global (Footer / Contacto)',
      type: 'string',
      group: 'footer',
    },
    {
      name: 'contactPhone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
      group: 'footer',
    },
    {
      name: 'contactLocation',
      title: 'Ubicación / Disponibilidad',
      type: 'string',
      group: 'footer',
    },
    {
      name: 'footerDescription',
      title: 'Descripción Corta para el Pie de Página',
      type: 'text',
      rows: 2,
      group: 'footer',
      initialValue: 'Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.',
    },
    {
      name: 'socialLinks',
      title: 'Redes Sociales Globales',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'platform', 
              title: 'Plataforma', 
              type: 'string',
              options: {
                list: [
                  { title: 'YouTube', value: 'Youtube' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'Vimeo', value: 'Video' },
                  { title: 'Gmail / Correo', value: 'Mail' },
                ]
              }
            },
            { name: 'url', title: 'URL Completa', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'headingFont',
      title: 'Tipografía para Títulos',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Helvetica (Clásica y neutra)', value: 'Helvetica' },
          { title: 'Inter (Moderna y muy legible)', value: 'Inter' },
          { title: 'Poppins (Llamativa y con cuerpo)', value: 'Poppins' },
        ]
      },
      initialValue: 'Poppins',
    },
    {
      name: 'bodyFont',
      title: 'Tipografía para Textos',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Montserrat (Moderna y limpia)', value: 'Montserrat' },
          { title: 'Lato (Amigable y redondeada)', value: 'Lato' },
          { title: 'Open Sans (Tradicional y neutra)', value: 'Open+Sans' },
          { title: 'Nunito (Fresca y actual)', value: 'Nunito' },
        ]
      },
      initialValue: 'Montserrat',
    },
  ],
};
