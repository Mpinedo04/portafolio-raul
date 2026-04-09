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
      name: 'logoFont',
      title: '✏️ Tipografía del LOGO / Marca',
      type: 'string',
      group: 'typography',
      description: 'Fuente para "RAÚL GARCÍA" en la cabecera y el pie de página.',
      options: {
        list: [
          { title: 'Poppins (Llamativa y con cuerpo)', value: 'Poppins' },
          { title: 'Bebas Neue (Alta y cinematográfica)', value: 'Bebas+Neue' },
          { title: 'Oswald (Condensada e impactante)', value: 'Oswald' },
          { title: 'Playfair Display (Elegante, con serifa)', value: 'Playfair+Display' },
          { title: 'Raleway (Fina y sofisticada)', value: 'Raleway' },
          { title: 'Inter (Limpia y moderna)', value: 'Inter' },
        ]
      },
      initialValue: 'Poppins',
    },
    {
      name: 'headingFont',
      title: '🔠 Tipografía TÍTULOS Principales',
      type: 'string',
      group: 'typography',
      description: 'Para títulos grandes de sección: "EQUIPO TÉCNICO", "FORMACIÓN ACADÉMICA", banners...',
      options: {
        list: [
          { title: 'Poppins (Llamativa y con cuerpo)', value: 'Poppins' },
          { title: 'Oswald (Condensada e impactante)', value: 'Oswald' },
          { title: 'Raleway (Fina y sofisticada)', value: 'Raleway' },
          { title: 'Inter (Limpia y moderna)', value: 'Inter' },
          { title: 'Helvetica (Clásica y neutra)', value: 'Helvetica' },
        ]
      },
      initialValue: 'Poppins',
    },
    {
      name: 'subtitleFont',
      title: '🔡 Tipografía SUBTÍTULOS / Nombres',
      type: 'string',
      group: 'typography',
      description: 'Para nombres de proyecto, software, equipos, subtítulos de tarjetas...',
      options: {
        list: [
          { title: 'Poppins (Llamativa y con cuerpo)', value: 'Poppins' },
          { title: 'Inter (Limpia y moderna)', value: 'Inter' },
          { title: 'Montserrat (Moderna y limpia)', value: 'Montserrat' },
          { title: 'Raleway (Fina y sofisticada)', value: 'Raleway' },
          { title: 'Helvetica (Clásica y neutra)', value: 'Helvetica' },
        ]
      },
      initialValue: 'Poppins',
    },
    {
      name: 'bodyFont',
      title: '📝 Tipografía CUERPO de Texto',
      type: 'string',
      group: 'typography',
      description: 'Para descripciones, bio, párrafos, badges, navegación y textos generales.',
      options: {
        list: [
          { title: 'Montserrat (Moderna y limpia)', value: 'Montserrat' },
          { title: 'Lato (Amigable y redondeada)', value: 'Lato' },
          { title: 'Open Sans (Tradicional y neutra)', value: 'Open+Sans' },
          { title: 'Nunito (Fresca y actual)', value: 'Nunito' },
          { title: 'Inter (Limpia y moderna)', value: 'Inter' },
        ]
      },
      initialValue: 'Montserrat',
    },
    {
      name: 'backgroundGradient',
      title: 'Fondo de la Web (Degradado)',
      type: 'string',
      group: 'typography',
      options: {
        list: [
          { title: 'Gris Premium', value: 'gris-premium' },
          { title: 'Azul Oscuro', value: 'azul-oscuro' },
          { title: 'Negro Puro', value: 'negro-puro' },
          { title: 'Grafito', value: 'grafito' },
        ]
      },
      initialValue: 'gris-premium',
      description: 'Elige el degradado de fondo para toda la web.',
    },
  ],
};
