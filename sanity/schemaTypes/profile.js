export default {
  name: 'profile',
  title: 'Sobre Mí / Biografía',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Titular / Breve Descripción',
      type: 'string',
      description: 'Ej: Filmmaker & Montador Audiovisual',
    },
    {
      name: 'bio',
      title: 'Trayectoria / Evolución',
      type: 'text',
      rows: 10,
    },
    {
      name: 'profileImage',
      title: 'Foto de Perfil Principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'actionPhotos',
      title: 'Fotos en Acción (Rodajes, etc.)',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'email',
      title: 'Email Profesional',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plataforma', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icono (Lucide name)', type: 'string' },
          ],
        },
      ],
    },
  ],
};
