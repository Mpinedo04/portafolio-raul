# Portafolio Raul

Portfolio audiovisual desarrollado con **Next.js** y **Sanity CMS**.

El proyecto permite presentar el perfil profesional de Raul, sus proyectos, equipo tecnico, estudios y datos de contacto. El contenido se gestiona desde Sanity Studio y la web publica esta desplegada en Vercel.

## Demo

[https://portafolio-raul-sigma.vercel.app/](https://portafolio-raul-sigma.vercel.app/)

## Tecnologias

- Next.js
- React
- Sanity CMS
- CSS Modules
- Vercel

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estructura principal

```text
.
+-- src/
|   +-- app/
|   |   +-- (website)/
|   |   +-- (admin)/
|   |   +-- api/
|   +-- components/
|   +-- sanity/
+-- public/
+-- package.json
+-- sanity.config.js
+-- next.config.mjs
```

## Rutas principales

- `/`: pagina principal.
- `/sobre-mi`: perfil y biografia.
- `/portfolio`: hub de portfolio.
- `/portfolio/propios`: proyectos propios.
- `/portfolio/externos`: proyectos externos.
- `/equipo`: equipo tecnico.
- `/estudios`: formacion y estudios.
- `/contacto`: pagina de contacto.
- `/admin`: Sanity Studio.

## Variables de entorno

El proyecto usa Sanity. Revisa estas variables si necesitas cambiar proyecto o dataset:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

## Notas de mantenimiento

- El contenido editable vive en Sanity.
- Los esquemas estan en `src/sanity/schemaTypes`.
- La estructura del panel de Sanity esta en `src/sanity/lib/structure.js`.
- Las paginas publicas estan bajo `src/app/(website)`.
- El panel de administracion esta bajo `src/app/(admin)`.
