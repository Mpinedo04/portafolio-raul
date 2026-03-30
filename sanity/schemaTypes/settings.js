export default {
  name: 'settings',
  title: 'Configuración de Marca y Diseño',
  type: 'document',
  fields: [
    {
      name: 'brandName',
      title: 'Nombre de la Marca (Logo)',
      type: 'string',
      initialValue: 'RAÚL GARCÍA',
    },
    {
      name: 'email',
      title: 'Email de Contacto (Destinatario)',
      type: 'string',
    },
    {
      title: 'Diseño y Colores',
      name: 'theme',
      type: 'object',
      fields: [
        { name: 'backgroundColor', title: 'Color de Fondo Global', type: 'string', initialValue: '#0A0A0A' },
        { name: 'primaryColor', title: 'Color de Acento Principal (Teal)', type: 'string', initialValue: '#1FB3B3' },
        { name: 'secondaryColor', title: 'Color de Acento Secundario (Naranja)', type: 'string', initialValue: '#D48C45' },
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
      title: 'Iconos de Cabecera (Arriba a la derecha)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icono (Nombre de Lucide)', type: 'string', description: 'Ej: Play, Camera, Mail, Youtube, Instagram' },
            { name: 'url', title: 'Enlace', type: 'url' },
          ],
        },
      ],
    },
  ],
};
