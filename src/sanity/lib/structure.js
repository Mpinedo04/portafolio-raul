import { 
  Home, 
  Briefcase, 
  Camera, 
  Monitor,
  GraduationCap, 
  Layout, 
  PanelBottom, 
  Palette,
  User,
  Mail
} from 'lucide-react';

export const myStructure = (S) =>
  S.list()
    .title('CENTRO DE MANDO 🎬')
    .items([
      // 🏠 PÁGINA DE INICIO
      S.listItem()
      .title('1. INICIO')
      .icon(Home)
      .child(
        S.document()
          .schemaType('home')
          .documentId('home')
          .title('Configuración de Portada')
      ),

      // 👤 SOBRE MÍ
      S.listItem()
        .title('2. SOBRE MÍ')
        .icon(User)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('Biografía y Fotos Personal')
        ),

      S.divider(),

      // 🎬 PORTFOLIO
      S.listItem()
        .title('3. PORTFOLIO')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Todos tus trabajos')
        ),

      // 🎥 EQUIPO
      S.listItem()
        .title('4. MI EQUIPO')
        .icon(Camera)
        .child(
          S.list()
            .title('Gestión de Equipo')
            .items([
              S.listItem()
                .title('Mi Inventario (Cámaras, Lentes...)')
                .icon(Briefcase)
                .child(S.documentTypeList('equipment').title('Inventario Completo')),
              S.listItem()
                .title('Tu PC / Workstation')
                .icon(Monitor)
                .child(
                  S.document()
                    .schemaType('equipment')
                    .documentId('workstation-specs')
                    .title('Especificaciones del PC')
                ),
            ])
        ),

      // 🎓 HABILIDADES
      S.listItem()
        .title('5. HABILIDADES')
        .icon(GraduationCap)
        .child(
          S.documentTypeList('skill')
            .title('Software y Formación')
        ),

      // 📞 CONTACTO
      S.listItem()
        .title('6. CONTACTO')
        .icon(Mail) 
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
            .title('Datos de Contacto y Formspree')
        ),

      S.divider(),

      // 🏢 GLOBAL (HEADER, FOOTER, DISEÑO)
      S.listItem()
        .title('7. GLOBAL (HEADER / FOOTER)')
        .icon(Layout)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Ajustes Globales y Diseño')
        ),
    ]);
