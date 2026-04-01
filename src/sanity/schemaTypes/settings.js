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
      description: 'Este email aparecerá en el pie de página y en la página de contacto automáticamente.',
    },
    {
      name: 'footerDescription',
      title: 'Descripción Corta para el Pie de Página',
      type: 'text',
      rows: 2,
      group: 'footer',
      initialValue: 'Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.',
      description: 'El párrafo que aparece debajo de tu nombre en el footer.',
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
          title: 'Tipografía Principal (Títulos)',
          type: 'string',
          description: 'Selecciona el estilo de fuente para tus títulos satisfactoriamente.',
          options: {
            list: [
              { title: 'Bebas Neue (Cine - Impacto)', value: "'Bebas Neue', sans-serif" },
              { title: 'Syncopate (Diseño Tech)', value: "'Syncopate', sans-serif" },
              { title: 'Syne (Arte Vanguardia)', value: "'Syne', sans-serif" },
              { title: 'Michroma (Audiovisual)', value: "'Michroma', sans-serif" },
              { title: 'Outfit (Moderno Limpio)', value: "'Outfit', sans-serif" },
              { title: 'Playfair Display (Elegante)', value: "'Playfair Display', serif" },
              { title: 'Inter (Profesional)', value: "'Inter', sans-serif" },
              { title: 'Montserrat (Publicidad)', value: "'Montserrat', sans-serif" },
              { title: 'Oswald (Titulares)', value: "'Oswald', sans-serif" },
              { title: 'Raleway (Estilizado)', value: "'Raleway', sans-serif" },
              { title: 'Poppins (Geométrico)', value: "'Poppins', sans-serif" },
              { title: 'Nunito (Suave)', value: "'Nunito', sans-serif" },
              { title: 'Merriweather (Lectura)', value: "'Merriweather', serif" },
              { title: 'Ubuntu (Moderno)', value: "'Ubuntu', sans-serif" },
              { title: 'Lora (Literatura)', value: "'Lora', serif" },
              { title: 'Rubik (Amigable)', value: "'Rubik', sans-serif" },
              { title: 'Kanit (Deportivo)', value: "'Kanit', sans-serif" },
              { title: 'Heebo (Rígido)', value: "'Heebo', sans-serif" },
              { title: 'Anton (Cartelera Cine)', value: "'Anton', sans-serif" },
              { title: 'Josefin Sans (Retro)', value: "'Josefin Sans', sans-serif" },
              { title: 'Quicksand (Redondeado)', value: "'Quicksand', sans-serif" },
              { title: 'Archivo Black (Industrial)', value: "'Archivo Black', sans-serif" },
              { title: 'Space Grotesk (Sci-Fi)', value: "'Space Grotesk', sans-serif" },
              { title: 'Work Sans (Funcional)', value: "'Work Sans', sans-serif" },
              { title: 'Cinzel (Épico / Oro)', value: "'Cinzel', serif" },
            ]
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
        { name: 'secondaryTextColor', title: 'Color de Texto Secundario (Párrafos)', type: 'color', description: 'Color para descripciones, párrafos y textos de apoyo satisfactoriamente.' },
        { name: 'borderColor', title: 'Color de Bordes y Divisores', type: 'color', description: 'Color para los bordes de tarjetas, menús y líneas decorativas satisfactoriamente.' },
        { name: 'buttonTextColor', title: 'Color de Texto en Botón Principal', type: 'color', description: 'Color específico para el texto que va dentro de los botones de acción satisfactoriamente.' },
        { 
          name: 'heroOverlayColor', 
          title: 'Color del Filtro del Hero (Imagen Principal)', 
          type: 'color',
          description: 'Controla el tinte de la imagen del Hero. Úsalo para mejorar la legibilidad del texto satisfactoriamente.'
        },
        { 
          name: 'glassBlur', 
          title: 'Intensidad de Desenfoque (Header/Footer)', 
          type: 'number', 
          description: 'Define qué tan "borroso" es el fondo satinado (Glassmorphism). Recomendado: entre 10 y 40 satisfactoriamente.',
          initialValue: 20
        },
      ],
    },
  ],
};
