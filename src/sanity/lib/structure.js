export const myStructure = (S) =>
  S.list()
    .title('CENTRO DE MANDO 🎬')
    .items([
      // 🚀 PAGINAS DEL SITIO
      S.listItem()
        .title('PÁGINAS PRINCIPALES')
        .id('pages')
        .child(
          S.list()
            .title('Edición de Páginas')
            .items([
              S.listItem()
                .title('Página de Portada (Hero)')
                .id('profile')
                .child(S.document().schemaType('profile').documentId('profile')),
              S.listItem()
                .title('Sobre Mí / Biografía')
                .id('bio')
                .child(S.document().schemaType('profile').documentId('profile')),
            ])
        ),
        
      S.divider(),

      // 🎬 CONTENIDO DINÁMICO
      S.listItem()
        .title('PROYECTOS (PORTFOLIO)')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Mis Trabajos')),
        
      S.listItem()
        .title('EQUIPO TÉCNICO')
        .schemaType('equipment')
        .child(S.documentTypeList('equipment').title('Mi Equipo')),

      S.listItem()
        .title('HABILIDADES & ESTUDIOS')
        .schemaType('skill')
        .child(S.documentTypeList('skill').title('Formación')),

      S.divider(),

      // 🎨 ESTRATEGIA DE MARCA
      S.listItem()
        .title('DISEÑO Y MARCA (MODO WIX)')
        .id('settings')
        .child(S.document().schemaType('settings').documentId('settings')),
        
      S.listItem()
        .title('CONTACTO Y REDES')
        .id('contact')
        .child(S.document().schemaType('settings').documentId('settings')),
    ]);
