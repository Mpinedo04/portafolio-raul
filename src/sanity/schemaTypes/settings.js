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
      name: 'contactEmail',
      title: 'Email Global (Footer / Contacto)',
      type: 'string',
      group: 'footer',
      description: 'Este email aparecerá en el pie de página de toda la web.',
    },
    {
      name: 'socialLinks',
      title: 'Redes Sociales Globales',
      type: 'array',
      group: 'header',
      description: 'Se mostrarán tanto en la cabecera como en el pie de página.',
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
        { name: 'panelBackgroundColor', title: 'Color de Fondo Paneles (Grandes)', type: 'color', description: 'Color para las franjas anchas como Acerca de mí, Habilidades o Mi Trabajo.' },
        { name: 'cardBackgroundColor', title: 'Color de Fondo Cajas (Tarjetas)', type: 'color', description: 'Color para elementos individuales como tarjetas de proyecto, equipos o formularios.' },
        { name: 'navBackgroundColor', title: 'Color de Fondo Navegación (Header / Footer)', type: 'color', description: 'Color independiente para la cabecera y el pie de página.' },
        { name: 'primaryColor', title: 'Color de Acento Principal (Botones)', type: 'color' },
        { name: 'secondaryColor', title: 'Color de Acento Secundario', type: 'color' },
        { name: 'textColor', title: 'Color de Texto Principal', type: 'color' },
      ],
    },
  ],
};
