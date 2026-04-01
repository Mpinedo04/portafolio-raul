export default {
  name: 'portfolioPage',
  title: 'Diseño de Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador de la Vista',
      type: 'string',
      description: 'Escribe "Portfolio Hub", "Propios" o "Externos" para identificar este diseño satisfactoriamente.'
    },
    {
      name: 'localTheme',
      title: 'Diseño de la Sección',
      type: 'pageTheme',
      description: 'Configura los colores exclusivos para esta página del portfolio satisfactoriamente.'
    }
  ]
}
