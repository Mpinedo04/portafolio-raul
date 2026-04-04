import { 
  Home, 
  Briefcase, 
  Camera, 
  Monitor,
  GraduationCap, 
  Layout, 
  User,
  Mail
} from 'lucide-react';

export const myStructure = (S) =>
  S.list()
    .title('CENTRO DE MANDO 🎬')
    .items([
      // 1. INICIO
      S.listItem()
      .title('1. INICIO')
      .icon(Home)
      .child(
        S.document()
          .schemaType('home')
          .documentId('home')
          .title('Configuración de Portada')
      ),

      // 2. PROYECTOS
      S.listItem()
        .title('2. PROYECTOS (Propios)')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Proyectos Propios')
            .filter('_type == "project" && category == "propio"')
        ),

      S.listItem()
        .title('2. PROYECTOS (Externos)')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Trabajos Externos')
            .filter('_type == "project" && category == "externo"')
        ),

      // 3. SOBRE MÍ
      S.listItem()
        .title('3. SOBRE MÍ')
        .icon(User)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('Bio / Trayectoria / Timeline')
        ),

      // 4. EQUIPO
      S.listItem()
        .title('4. EQUIPO')
        .icon(Camera)
        .child(
          S.list()
            .title('Gestión de EQUIPO')
            .items([
              S.listItem()
                .title('Inventario Completo')
                .icon(Briefcase)
                .child(S.documentTypeList('equipment').title('Todos los Equipos')),
              S.listItem()
                .title('Estación de Edición (PC)')
                .icon(Monitor)
                .child(
                  S.document()
                    .schemaType('workstation')
                    .documentId('workstation')
                    .title('Especificaciones del PC')
                ),
            ])
        ),

      // 5. ESTUDIOS
      S.listItem()
        .title('5. ESTUDIOS Y CONOCIMIENTOS')
        .icon(GraduationCap)
        .child(
          S.document()
            .schemaType('studies')
            .documentId('studies')
            .title('Formación, Cursos y Software')
        ),

      // 6. CONTACTO
      S.listItem()
        .title('6. CONTACTO')
        .icon(Mail) 
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
            .title('Página de CONTACTO')
        ),

      S.divider(),

      // 7. GLOBAL
      S.listItem()
        .title('7. GLOBAL (HEADER / FOOTER / SEO)')
        .icon(Layout)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Ajustes Globales')
        ),
    ]);
