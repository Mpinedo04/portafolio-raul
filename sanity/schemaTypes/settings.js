export default {
  name: 'settings',
  title: 'Configuración Global',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Web',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email de Contacto (Destinatario)',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Redes Sociales Globales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plataforma', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
  ],
};
