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

      // 🎬 2. PORTFOLIO SEGMENTADO
      S.listItem()
        .title('2. PORTFOLIO (Propios)')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Proyectos Propios (Individuales / Estudio)')
            .filter('_type == "project" && category == "propio"')
        ),

      S.listItem()
        .title('2. PORTFOLIO (Externos)')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Trabajos Externos (Clientes / Colaboraciones)')
            .filter('_type == "project" && category == "externo"')
        ),

      // 👤 3. SOBRE MÍ (Incluye Habilidades)
      S.listItem()
        .title('3. SOBRE MÍ')
        .icon(User)
        .child(
          S.list()
            .title('Sección Sobre Mí')
            .items([
              S.listItem()
                .title('Biografía y Fotos Personal')
                .icon(User)
                .child(
                  S.document()
                    .schemaType('about')
                    .documentId('about')
                    .title('Bio / Trayectoria')
                ),
              S.listItem()
                .title('Gestión de HABILIDADES')
                .icon(GraduationCap)
                .child(
                  S.documentTypeList('skill')
                    .title('Software, Estudios y Áreas Técnicas')
                ),
            ])
        ),

      S.divider(),

      // 🎥 4. EQUIPO
      S.listItem()
        .title('4. EQUIPO')
        .icon(Camera)
        .child(
          S.list()
            .title('Gestión de EQUIPO')
            .items([
              S.listItem()
                .title('Inventario (Cámaras, Lentes...)')
                .icon(Briefcase)
                .child(S.documentTypeList('equipment').title('Inventario Completo')),
              S.listItem()
                .title('Workstation (PC)')
                .icon(Monitor)
                .child(
                  S.document()
                    .schemaType('equipment')
                    .documentId('workstation-specs')
                    .title('Especificaciones del PC')
                ),
            ])
        ),

      // 📞 5. CONTACTO
      S.listItem()
        .title('5. CONTACTO')
        .icon(Mail) 
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
            .title('Página de CONTACTO')
        ),

      S.divider(),

      // 🏢 6. GLOBAL (HEADER, FOOTER, DISEÑO)
      S.listItem()
        .title('6. GLOBAL (HEADER / FOOTER / SEO)')
        .icon(Layout)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Ajustes Globales y Diseño')
        ),
    ]);
