import {
  Home,
  Briefcase,
  Camera,
  Monitor,
  GraduationCap,
  User,
  Mail,
  Cog,
} from 'lucide-react';

const API_VERSION = '2024-06-01';
const PROJECT_ORDER = [{ field: 'orderRank', direction: 'asc' }];
const EQUIPMENT_ORDER = [{ field: 'orderRank', direction: 'asc' }];

const projectListItem = (S, title, filter) =>
  S.listItem()
    .title(title)
    .icon(Briefcase)
    .child(
      S.documentList()
        .title(title)
        .apiVersion(API_VERSION)
        .schemaType('project')
        .filter(filter)
        .defaultOrdering(PROJECT_ORDER)
    );

const equipmentListItem = (S, title, filter = '_type == "equipment"') =>
  S.listItem()
    .title(title)
    .icon(Briefcase)
    .child(
      S.documentList()
        .title(title)
        .apiVersion(API_VERSION)
        .schemaType('equipment')
        .filter(filter)
        .defaultOrdering(EQUIPMENT_ORDER)
    );

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
        .title('2. PROYECTOS')
        .icon(Briefcase)
        .child(
          S.list()
            .title('2. PROYECTOS')
            .items([
              projectListItem(
                S,
                'Todos los proyectos',
                '_type == "project"'
              ),
              projectListItem(
                S,
                'Proyectos propios',
                '_type == "project" && category == "propio"'
              ),
              projectListItem(
                S,
                'Trabajos externos',
                '_type == "project" && category == "externo"'
              ),
              S.divider(),
              projectListItem(
                S,
                'Destacados en Inicio',
                '_type == "project" && featured == true'
              ),
            ])
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
            .title('4. EQUIPO')
            .items([
              equipmentListItem(S, 'Inventario completo'),
              S.listItem()
                .title('Estación de edición')
                .icon(Monitor)
                .child(
                  S.document()
                    .schemaType('workstation')
                    .documentId('workstation')
                    .title('Estación de edición y cabecera de /equipo')
                ),
            ])
        ),

      // 5. ESTUDIOS Y CONOCIMIENTOS
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

      // 7. CONFIGURACIÓN GLOBAL
      S.listItem()
        .title('7. CONFIGURACIÓN GLOBAL')
        .icon(Cog)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Configuración global y banners de Proyectos')
        ),
    ]);
