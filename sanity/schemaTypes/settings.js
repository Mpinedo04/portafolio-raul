export default {
  name: 'settings',
  title: 'Configuración Global y Contacto',
  type: 'document',
  fields: [
    {
      name: 'brandName',
      title: 'Nombre de la Marca (Logo)',
      type: 'string',
      initialValue: 'RAÚL GARCÍA',
    },
    {
      name: 'contactEmail',
      title: 'Email de Contacto (Público)',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
    },
    {
      name: 'contactLocation',
      title: 'Ubicación (Ciudad/País)',
      type: 'string',
    },
    {
      title: 'Diseño y Colores (Modo Wix)',
      name: 'theme',
      type: 'object',
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
    {
      name: 'headerIcons',
      title: 'Iconos de Cabecera y Redes Sociales',
      type: 'array',
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
  ],
};
