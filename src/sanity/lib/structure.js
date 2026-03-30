import { 
  Home, 
  Briefcase, 
  Camera, 
  GraduationCap, 
  Layout, 
  PanelBottom, 
  Palette,
  User
} from 'lucide-react';

export const myStructure = (S) =>
  S.list()
    .title('CENTRO DE MANDO 🎬')
    .items([
      // 🏠 PÁGINA DE INICIO
      S.listItem()
        .title('PÁGINA DE INICIO')
        .icon(Home)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Diseño de Portada')
        ),

      // 👤 SOBRE MÍ / BIO
      S.listItem()
        .title('SOBRE MÍ / BIO')
        .icon(User)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Tu Historia')
        ),

      S.divider(),

      // 🎬 PÁGINA DE PORTFOLIO
      S.listItem()
        .title('PÁGINA DE PORTFOLIO')
        .icon(Briefcase)
        .child(
          S.documentTypeList('project')
            .title('Gestión de Proyectos')
        ),

      // 🎥 PÁGINA DE EQUIPO
      S.listItem()
        .title('PÁGINA DE EQUIPO')
        .icon(Camera)
        .child(
          S.documentTypeList('equipment')
            .title('Cámaras y Hardware')
        ),

      // 🎓 PÁGINA DE HABILIDADES
      S.listItem()
        .title('PÁGINA DE HABILIDADES')
        .icon(GraduationCap)
        .child(
          S.documentTypeList('skill')
            .title('Formación y Software')
        ),

      S.divider(),

      // 🏢 CABECERA (HEADER)
      S.listItem()
        .title('CABECERA (HEADER)')
        .icon(Layout)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Ajustes de Cabecera')
        ),

      // ⚓ PIE DE PÁGINA (FOOTER)
      S.listItem()
        .title('PIE DE PÁGINA (FOOTER)')
        .icon(PanelBottom)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Ajustes de Pie de Página')
        ),

      // 🎨 UNIVERSO VISUAL
      S.listItem()
        .title('UNIVERSO VISUAL')
        .icon(Palette)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Colores y Tipografía')
        ),
    ]);
