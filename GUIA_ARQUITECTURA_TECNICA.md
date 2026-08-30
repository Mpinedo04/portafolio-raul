# Guia Tecnica Actual Del Portfolio De Raul

Documento actualizado contra el codigo actual del repositorio. Sustituye notas antiguas que mencionaban piezas que ya no existen en `src`, como `SectionTheme`, `getColor`, `pageTheme` o `DynamicFont`.

## Resumen

La aplicacion es un portfolio audiovisual con:

- Next.js App Router.
- Sanity Studio integrado en `/admin`.
- Paginas publicas bajo el grupo `src/app/(website)`.
- Panel de administracion bajo `src/app/(admin)/admin`.
- Componentes compartidos en `src/components`.
- Esquemas y utilidades de Sanity en `src/sanity`.

## Estructura Real

```text
src/app/(website)
  layout.js
  page.js
  portfolio/page.js
  portfolio/propios/page.js
  portfolio/externos/page.js
  sobre-mi/page.js
  equipo/page.js
  estudios/page.js
  contacto/page.js

src/app/(admin)
  admin/[[...index]]/page.jsx

src/app/api
  draft/route.js
  revalidate/route.js

src/components
  Header.jsx
  Footer.jsx
  Hero.jsx
  PageBanner.jsx
  VideoEmbed.jsx
  MouseEffect.jsx
  ScrollProgress.jsx
  ActionGallery.jsx
  BtsGallery.jsx
  EmptyState.jsx

src/sanity
  lib/client.js
  lib/image.js
  lib/structure.js
  schemaTypes/*.js
  presentation/resolve.js
```

## Sanity

El cliente esta en `src/sanity/lib/client.js`.

Configuracion actual:

- `projectId`: usa `NEXT_PUBLIC_SANITY_PROJECT_ID` o `xa9cwnu5`.
- `dataset`: usa `NEXT_PUBLIC_SANITY_DATASET` o `production`.
- `useCdn: false`.
- `perspective: published`.
- `stega.enabled: true`.

Esto prioriza ver datos frescos, pero penaliza rendimiento en produccion porque evita el CDN de Sanity.

El Studio esta embebido en `/admin` mediante `NextStudio`.

## Paginas Y Datos

### Layout Global

`src/app/(website)/layout.js`:

- Importa estilos globales.
- Carga estilos globales de Swiper.
- Consulta `settings` para metadatos.
- Consulta `settings` otra vez para fuentes y gradiente.
- Inyecta variables CSS en el `body`.
- Renderiza `ScrollProgress` y `MouseEffect` en todas las paginas.
- Activa `VisualEditing` solo cuando `draftMode` esta activo.

### Home

`src/app/(website)/page.js`:

- Consulta `home`.
- Consulta `settings`.
- Consulta `about`.
- Consulta proyectos destacados.
- Renderiza hero, intro y trabajos destacados.

### Portfolio

`portfolio/page.js`:

- Hub visual con enlaces a proyectos propios y externos.
- Usa datos de `settings` para banner y textos.

`portfolio/propios/page.js` y `portfolio/externos/page.js`:

- Estan marcadas como dinamicas con `dynamic = 'force-dynamic'`.
- Usan `revalidate = 0`.
- Consultan proyectos por `category`.
- Renderizan `VideoEmbed` o imagen.
- Pueden mostrar `BtsGallery`.

### Sobre Mi

`sobre-mi/page.js`:

- Consulta `about` y `settings`.
- Renderiza banner, bio, timeline, CV y galeria de accion.
- Usa `ActionGallery`, que depende de Swiper.

### Equipo

`equipo/page.js`:

- Esta marcada como dinamica con `dynamic = 'force-dynamic'`.
- Usa `revalidate = 0`.
- Consulta `equipment`, `workstation` y `settings`.
- Agrupa equipos en categorias definidas en el propio archivo.

### Estudios

`estudios/page.js`:

- Consulta `studies` y `settings`.
- Renderiza formacion, cursos, certificados y software.
- Tiene una consulta con `next: { revalidate: 0, tags: ['studies'] }`.

### Contacto

`contacto/page.js`:

- Consulta `contact` y `settings`.
- El formulario se envia a Formspree desde `ContactForm.jsx`.

## Imagenes

La utilidad `urlFor` esta en `src/sanity/lib/image.js`.

Estado actual:

- Muchas imagenes se renderizan con `<img>`.
- No se usa `next/image`.
- Varias imagenes se piden sin ancho/calidad/formato optimizados.
- Algunos fondos se aplican como `backgroundImage` inline.
- Sanity CDN esta permitido en `next.config.mjs`.

## Videos

`src/components/VideoEmbed.jsx`:

- Detecta YouTube y Vimeo por regex.
- Inserta iframe directamente.
- Si no reconoce el proveedor, muestra miniatura enlazada.

Este enfoque es simple, pero puede ser pesado si hay varios videos en una misma pagina.

## Efectos Globales

`MouseEffect.jsx`:

- Actualiza variables CSS segun el movimiento del raton.
- Aplica reveal global con `IntersectionObserver`.
- Usa `MutationObserver` sobre `document.body`.

`ScrollProgress.jsx`:

- Escucha `scroll`.
- Actualiza estado React en cada scroll.

Estos efectos dan dinamismo, pero son candidatos claros a optimizacion si la web se siente lenta.

## Cache Y Renderizado

Hay una mezcla de estrategias:

- Varias paginas usan `revalidate = 10`.
- Algunas paginas criticas usan `force-dynamic` y `revalidate = 0`.
- El cliente Sanity usa `useCdn: false`.
- La ruta `api/revalidate` existe, pero solo revalida `('/', 'layout')`.

Para mejorar rendimiento sin perder edicion comoda, lo ideal seria separar:

- Produccion publica: cache/CDN/ISR.
- Preview o draft mode: datos frescos sin cache.

## Estado De Documentacion Antigua

Las versiones anteriores hablaban de una arquitectura mas ambiciosa con temas por seccion, `SectionTheme`, `pageTheme`, `DynamicFont` y helpers de color. Esas piezas no existen en el arbol actual de `src`, por lo que no deben usarse como referencia tecnica hasta que se implementen de verdad.
