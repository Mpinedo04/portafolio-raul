# Portfolio Raul

Portfolio audiovisual construido con Next.js App Router y Sanity Studio.

## Estado Actual

- Framework: Next.js 16.2.1 con React 19.
- CMS: Sanity 5 integrado en la ruta `/admin`.
- Contenido publico: se lee desde el dataset `production` de Sanity.
- Rutas publicas principales:
  - `/`
  - `/portfolio`
  - `/portfolio/propios`
  - `/portfolio/externos`
  - `/sobre-mi`
  - `/equipo`
  - `/estudios`
  - `/contacto`
- Ruta de administracion:
  - `/admin`

## Aviso Sobre Sanity

Editar archivos del proyecto en local no modifica la base de datos online.

Lo que si puede cambiar el contenido online es entrar en Sanity Studio, editar documentos y pulsar `Publish`, porque el proyecto apunta por defecto a:

- `projectId`: `xa9cwnu5`
- `dataset`: `production`

Antes de hacer pruebas peligrosas conviene usar otro dataset o un proyecto Sanity de pruebas.

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Variables De Entorno

El codigo tiene valores por defecto, pero en produccion conviene definir:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=xa9cwnu5
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=...
```

## Documentacion Del Proyecto

- `GUIA_ARQUITECTURA_TECNICA.md`: mapa tecnico real del codigo actual.
- `GUIA_USUARIO.md`: guia para editar contenido desde Sanity sin tocar codigo.
- `AUDITORIA_EXPERTA.md`: auditoria de rendimiento y riesgos.
- `HISTORIAL_TECNICO_MIGRACION.md`: registro de estado y decisiones.
