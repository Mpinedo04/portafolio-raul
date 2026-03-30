export default {
  name: 'settings',
  title: 'Configuraciones Generales',
  type: 'document',
  groups: [
    { name: 'header', title: 'CABECERA (HEADER)' },
    { name: 'footer', title: 'PIE DE PÁGINA (FOOTER)' },
    { name: 'design', title: 'UNIVERSO VISUAL (DISEÑO)' },
  ],
  fields: [
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
      name: 'contactEmail',
      title: 'Email de Contacto (Público)',
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
      title: 'Ubicación (Ciudad/País)',
      type: 'string',
      group: 'footer',
    },
    {
      title: 'Diseño y Colores (Modo Wix)',
      name: 'theme',
      type: 'object',
      group: 'design',
      fields: [
        { name: 'backgroundColor', title: 'Color de Fondo Global', type: 'string', initialValue: '#0A0A0A' },
        { name: 'primaryColor', title: 'Color de Acento Principal (Botones)', type: 'string', initialValue: '#1FB3B3' },
        { name: 'secondaryColor', title: 'Color de Acento Secundario', type: 'string', initialValue: '#D48C45' },
        { name: 'textColor', title: 'Color de Texto Principal', type: 'string', initialValue: '#EDEDED' },
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
