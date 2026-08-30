# Auditoria Tecnica Actual

Revision de solo lectura realizada sobre el estado actual del repositorio. No se han ejecutado migraciones, no se ha publicado nada en Sanity y no se ha modificado contenido remoto.

## Diagnostico Rapido

La web esta bien encaminada para un portfolio visual, pero hay varios puntos que pueden explicar que "vaya petada" en momentos concretos:

- Demasiadas lecturas frescas a Sanity.
- Cache desactivada en rutas importantes.
- Imagenes sin optimizacion de Next.
- Iframes de video cargados directamente.
- Efectos globales que trabajan en scroll, mousemove y cambios del DOM.
- Swiper cargado desde el layout global.
- Documentacion antigua desalineada con el codigo real.

## Hallazgos Prioritarios

### 1. Sanity Sin CDN En Produccion

Archivo: `src/sanity/lib/client.js`

El cliente usa:

```js
useCdn: false
```

Esto evita el CDN de Sanity. Es util para editar y ver datos frescos, pero en produccion aumenta latencia y carga sobre Sanity.

Recomendacion:

- Usar CDN para paginas publicas publicadas.
- Mantener `useCdn: false` solo para preview/draft mode o desarrollo.

### 2. Rutas Dinamicas Con Cache Desactivada

Archivos:

- `src/app/(website)/portfolio/propios/page.js`
- `src/app/(website)/portfolio/externos/page.js`
- `src/app/(website)/equipo/page.js`

Usan:

```js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

Esto fuerza render dinamico y evita ISR. Puede estar justificado durante una fase de edicion intensa, pero penaliza rendimiento publico.

Recomendacion:

- Volver a ISR (`revalidate = 30`, `60` o similar) en paginas publicas.
- Usar webhook de Sanity + `revalidateTag`/`revalidatePath` para refrescar tras publicar.

### 3. Consultas Secuenciales Repetidas

Ejemplo: `src/app/(website)/page.js`

La home consulta `home`, `settings`, `about` y `projects` de forma secuencial. El layout tambien consulta `settings`.

Recomendacion:

- Agrupar consultas independientes con `Promise.all`.
- Crear helpers cacheados para `settings`.
- Reducir campos pedidos a los realmente usados.

### 4. Imagenes Sin `next/image`

Hay muchas imagenes renderizadas con `<img>`.

Ejemplos:

- Home.
- Sobre mi.
- Equipo.
- Estudios.
- Portfolio.
- Galerias.

Recomendacion:

- Migrar imagenes principales a `next/image`.
- Definir `sizes`.
- Usar `priority` solo para la imagen LCP.
- Pedir a Sanity dimensiones concretas con `width`, `height`, `fit`, `auto=format` y calidad razonable.

### 5. Videos Cargados Como Iframe Desde El Inicio

Archivo: `src/components/VideoEmbed.jsx`

Cada video YouTube/Vimeo inserta un iframe inmediatamente.

Recomendacion:

- Mostrar miniatura primero.
- Cargar iframe solo al hacer click.
- Como minimo, anadir `loading="lazy"` al iframe.

### 6. Efectos Globales Potencialmente Caros

Archivos:

- `src/components/MouseEffect.jsx`
- `src/components/ScrollProgress.jsx`
- `src/app/(website)/globals.css`
- `src/components/PageBanner.module.css`

Riesgos:

- `mousemove` actualiza variables CSS continuamente.
- `MutationObserver` observa todo el body.
- `scroll` actualiza estado React en cada evento.
- `background-attachment: fixed`, blur y pseudo-elementos fijos pueden afectar a movil.

Recomendacion:

- Usar `requestAnimationFrame` para mouse/scroll.
- Evitar `MutationObserver` global si no es imprescindible.
- Desactivar efectos pesados en `prefers-reduced-motion` y pantallas tactiles.
- Revisar `background-attachment: fixed`.

### 7. Swiper En El Layout Global

Archivo: `src/app/(website)/layout.js`

Los CSS de Swiper se importan globalmente, aunque la galeria con Swiper solo se usa en Sobre Mi.

Recomendacion:

- Mover CSS/imports de Swiper al componente o pagina que lo necesita.
- Valorar import dinamico de `ActionGallery`.

### 8. Fuentes Dinamicas Desde Google Fonts

Archivo: `src/app/(website)/layout.js`

Se construye un link dinamico con varias familias y pesos.

Recomendacion:

- Reducir pesos cargados.
- Limitar familias simultaneas.
- Valorar `next/font` si se estabiliza la seleccion tipografica.

### 9. Ruta De Revalidacion Muy General

Archivo: `src/app/api/revalidate/route.js`

Actualmente revalida el layout completo con:

```js
revalidatePath('/', 'layout')
```

Recomendacion:

- Revalidar rutas o tags segun `_type`.
- Usar tags coherentes en consultas Sanity.

## Plan Recomendado De Optimizacion

1. Separar cliente Sanity publico y cliente preview.
2. Reactivar ISR en rutas publicas.
3. Optimizar videos con click-to-play.
4. Migrar imagenes clave a `next/image`.
5. Reducir efectos globales en movil y con `prefers-reduced-motion`.
6. Mover Swiper fuera del layout global.
7. Consolidar consultas y cachear `settings`.

## Nota De Seguridad

Cambiar archivos locales no modifica Sanity. Lo que modifica el contenido online es editar documentos desde `/admin` y pulsar `Publish`, porque el Studio apunta al dataset `production`.
