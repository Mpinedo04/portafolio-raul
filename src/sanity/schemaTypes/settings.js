export default {
  name: 'settings',
  title: 'Configuraciones Generales',
  type: 'document',
  groups: [
    { name: 'header', title: 'CABECERA (HEADER)' },
    { name: 'footer', title: 'PIE DE PÁGINA (FOOTER)' },
    { name: 'seo', title: 'SEO (GOOGLE / SOCIAL)' },
    { name: 'design', title: 'UNIVERSO VISUAL (DISEÑO)' },
  ],
  fields: [
    {
      name: 'seo',
      title: 'SEO Global y Metadatos',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Título para Google', type: 'string', description: 'Ej: Raúl García | Filmmaker & Director' },
        { name: 'metaDescription', title: 'Descripción para Google', type: 'text', rows: 3 },
        { name: 'ogImage', title: 'Imagen para Compartir (WhatsApp/Social)', type: 'image' },
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
      name: 'headerIcons',
      title: 'Iconos de Cabecera y Redes Sociales',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icono (Ej: Play, Youtube, Instagram, Mail)', type: 'string' },
            { name: 'url', title: 'Enlace Completo', type: 'url' },
          ],
        },
      ],
    },

    {
      title: 'Diseño y Colores (Modo Wix)',
      name: 'theme',
      type: 'object',
      group: 'design',
      fields: [
        {
          name: 'titleFont',
          title: 'Tipografía para Títulos',
          type: 'string',
          description: 'Elige un estilo para todos los títulos (H1, H2, H3) de la web de Raúl.',
          components: {
             input: require('../components/FontSelector').FontSelector
          },
          initialValue: "'Bebas Neue', sans-serif"
        },
        { name: 'backgroundColor', title: 'Color de Fondo Global', type: 'color' },
        { name: 'primaryColor', title: 'Color de Acento Principal (Botones)', type: 'color' },
        { name: 'secondaryColor', title: 'Color de Acento Secundario', type: 'color' },
        { name: 'textColor', title: 'Color de Texto Principal', type: 'color' },
        {
          name: 'headingFont',
          title: 'Fuente de Títulos',
          type: 'string',
          options: {
            list: [
              { title: 'Modern Sans (Outfit)', value: 'Outfit' },
              { title: 'Classic Serif (Playfair Display)', value: 'Playfair Display' },
              { title: 'Technical (Roboto Mono)', value: 'Roboto Mono' },
              { title: 'Elegant (Inter)', value: 'Inter' },
            ],
          },
          initialValue: 'Outfit',
        },
      ],
    },
  ],
};
