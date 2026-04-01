export default {
  name: 'pageTheme',
  title: 'Diseño Específico de la Página',
  type: 'object',
  fields: [
    {
      name: 'panelBackgroundColor',
      title: 'Color de Fondo Paneles (Grandes)',
      type: 'color',
      description: 'Color para las franjas anchas como Acerca de mí, Habilidades o Mi Trabajo.'
    },
    {
      name: 'cardBackgroundColor',
      title: 'Color de Fondo Cajas (Tarjetas)',
      type: 'color',
      description: 'Color para elementos individuales como tarjetas de proyecto, equipos o formularios.'
    },
    {
      name: 'navBackgroundColor',
      title: 'Color de Fondo Navegación (Header / Footer)',
      type: 'color',
      description: 'Color independiente para la cabecera y el pie de página en esta sección satisfactoriamente.'
    },
    {
      name: 'primaryColor',
      title: 'Color de Acento Principal (Botones)',
      type: 'color'
    },
    {
      name: 'secondaryColor',
      title: 'Color de Acento Secundario',
      type: 'color'
    },
    {
      name: 'textColor',
      title: 'Color de Texto Principal',
      type: 'color'
    },
    {
      name: 'secondaryTextColor',
      title: 'Color de Texto Secundario (Párrafos)',
      type: 'color',
      description: 'Color para descripciones, párrafos y textos de apoyo satisfactoriamente.'
    },
    {
      name: 'borderColor',
      title: 'Color de Bordes y Divisores',
      type: 'color',
      description: 'Color para los bordes de tarjetas, menús y líneas decorativas satisfactoriamente.'
    },
    {
      name: 'buttonTextColor',
      title: 'Color de Texto en Botón Principal',
      type: 'color',
      description: 'Color específico para el texto que va dentro de los botones de acción satisfactoriamente.'
    },
    {
      name: 'heroOverlayColor',
      title: 'Color del Filtro del Hero (Imagen Principal)',
      type: 'color',
      description: 'Controla el tinte de la imagen del Hero en esta página sección satisfactoriamente.'
    },
  ],
};
