# Informe de cambios — limpieza y rendimiento/SEO

**Repositorio:** `Mpinedo04/portafolio-raul`  
**Rama:** `main`  
**Fecha:** 15 de noviembre de 2026

Este documento resume los dos commits de mantenimiento aplicados al portafolio:

1. `34b3731` — `chore: elimina restos de pruebas y dependencias sin uso`
2. `perf: cachea Sanity y mejora SEO, metadatos y carga de vídeo` (este commit)

---

## 1. Commit de limpieza (`34b3731`)

### Archivos eliminados

| Archivo | Motivo |
| --- | --- |
| `CLEANUP_REPORT.md` | Informe antiguo y desfasado. |
| `test-sanity.mjs` | Script suelto de pruebas, sin uso. |
| `src/sanity/components/FontSelector.jsx` | Componente muerto: no se importaba en ningún sitio. |

### Dependencias

- **Eliminado `@sanity/color-input`:** no se registraba en `sanity.config.js`.
- **Añadido `@sanity/image-url` como dependencia directa:** el proyecto lo usaba a través de una dependencia transitiva de `next-sanity`.

### Restos de depuración

- `equipo/page.js`: la etiqueta de respaldo ya no muestra `DEBUG_v4: [...]`; ahora usa el nombre de la categoría o `Otros`.
- `estudios/page.js`: eliminado el atributo `data-debug-grouped="true"`.
- `Hero.jsx` y `Footer.jsx`: eliminados los atributos `data-sanity`, que no consumía nadie.

### Correcciones puntuales

- `settings.js`: eliminadas las cuatro opciones de degradado duplicadas (Carbón, Obsidiana, Humo y Medianoche).
- `layout.js`: eliminado el import `swiper/css/navigation`, que no se usaba.
- `next.config.mjs`: eliminado `remotePatterns` de `cdn.sanity.io`, innecesario porque el proyecto no usa `next/image`.
- `.gitignore`: añadida la excepción `!.env.example`.
- `.env.example`: nueva plantilla de variables de entorno.
- `README.md`: corregidas las referencias a `public/`, al carrusel Swiper de `BtsGallery`, a `@sanity/color-input` y a `SANITY_API_READ_TOKEN`.

**Balance:** 15 archivos modificados, 35 líneas añadidas y 280 eliminadas.

---

## 2. Commit de rendimiento y SEO

### 2.1. Dependencias y seguridad

- **Next.js `16.2.1` → `16.4.6`** y `eslint-config-next` a la misma versión.
  - Corrige la vulnerabilidad crítica de denegación de servicio en Server Components.
  - `npm audit --omit=dev` pasa de **50 a 48 vulnerabilidades** y de **2 a 1 crítica** (la restante, `tar`, pertenece al árbol de herramientas de Sanity Studio).

### 2.2. Caché de Sanity

- `src/sanity/lib/client.js`: `useCdn: true`. Las lecturas públicas se sirven desde el CDN de Sanity.
- `src/sanity/lib/settings.js`: nuevo helper `getSiteSettings()` con `cache()` de React y la etiqueta `settings`.
  - El layout y las páginas comparten una única consulta de ajustes por petición.
  - El webhook puede revalidar la etiqueta `settings`.
- Se eliminaron las consultas de `settings` duplicadas de las 8 páginas públicas.
- Se eliminaron `next: { revalidate: 0 }`, `dynamic = 'force-dynamic'` y `revalidate = 0` que impedían el cacheo.

### 2.3. Layout y renderizado

- `src/app/(website)/layout.js`: `revalidate = 300` (ISR de 5 minutos).
- `Header` y `Footer` se renderizan una sola vez desde el layout, no en cada página.
- El layout conserva `draftMode()` para que Sanity Presentation siga funcionando.
- Resultado del build: **todas las páginas públicas pasan a estáticas (`○`) con revalidación de 5 minutos**. Antes eran dinámicas (`ƒ`) en cada visita.

### 2.4. SEO y metadatos

- `src/lib/seo.js`: helper `buildMetadata()` con título, descripción, canonical, Open Graph y Twitter Card.
- `src/lib/site.js`: URL, nombre y textos por defecto del sitio.
- `metadataBase` configurado con `NEXT_PUBLIC_SITE_URL`.
- Metadatos propios en las 8 páginas:
  - `/` — Raúl García | Filmmaker & Editor de Vídeo
  - `/portfolio` — Proyectos
  - `/portfolio/propios` — Proyectos propios
  - `/portfolio/externos` — Trabajos externos
  - `/sobre-mi` — Sobre mí
  - `/equipo` — Equipo técnico
  - `/estudios` — Estudios y formación
  - `/contacto` — Contacto
- Imagen social por defecto: hero de la portada recortado a 1200×630 desde Sanity.
- `src/app/robots.js`: genera `/robots.txt` y bloquea `/admin` y `/api/`.
- `src/app/sitemap.js`: genera `/sitemap.xml` con las 8 rutas públicas.
- `(admin)/layout.js`: `noindex, nofollow, nocache` para el panel de Sanity.

### 2.5. Vídeo e imágenes

- `VideoEmbed.jsx`: fachada *click-to-play*.
  - Antes se cargaban todos los iframes de YouTube/Vimeo al abrir la página.
  - Ahora solo se carga la miniatura y el iframe se crea al pulsar play.
  - Se usa la miniatura de YouTube como respaldo cuando Sanity no aporta una.
  - `/portfolio/propios` pasa de 5 iframes en el HTML inicial a 0.
- Imágenes de equipo, estudios, portada y sobre mí: añadidos `loading="lazy"` y `decoding="async"` donde faltaban.

### 2.6. JavaScript en cliente

- `MouseEffect.jsx`: eliminado el `MutationObserver` que recorría todo el DOM en cada cambio. El efecto de aparición se aplica en una sola pasada y el brillo del cursor se limita a un `requestAnimationFrame`.
- `Header.jsx`: el listener de scroll pasa a `passive: true`.
- El menú móvil se cierra con `Escape`.

### 2.7. Accesibilidad

- `ContactForm.jsx`:
  - Todos los `<label>` están asociados a su campo con `htmlFor`/`id`.
  - Añadidos `autoComplete` y una región `role="status"` con `aria-live`.
  - Si falta el ID de Formspree ya no se simula un envío correcto: se avisa de que el formulario no está configurado.
- `Header.jsx`:
  - `aria-label` en los enlaces sociales.
  - `aria-expanded`, `aria-controls` y etiqueta dinámica en el botón móvil.
  - El desplegable de proyectos se abre también con foco de teclado y se cierra con `Escape`.
- `BtsGallery.jsx`:
  - El lightbox es `role="dialog"` con `aria-modal` y etiqueta.
  - Botones de cerrar, anterior y siguiente con `aria-label`.
  - Las miniaturas pasan de `<div>` a `<button>`.
  - El foco entra en el diálogo al abrirlo y vuelve al botón al cerrarlo.
- `Footer.jsx`: eliminada la prop `socialLinks`, que se recibía pero no se renderizaba.

### 2.8. Documentación

- `README.md`: actualizadas las características, la estructura del proyecto y las variables de entorno.
- `docs/INFORME-CAMBIOS.md`: este informe.

---

## 3. Verificación

| Comprobación | Resultado |
| --- | --- |
| `npx eslint .` | 0 errores, 24 avisos (todos por `<img>` en lugar de `next/image`). |
| `npm run build` | Correcto con Next.js 16.4.6. |
| Rutas públicas | Estáticas (`○`) con revalidación de 5 minutos. |
| `/robots.txt` | 200, con `Sitemap` y bloqueo de `/admin` y `/api/`. |
| `/sitemap.xml` | 200, con las 8 rutas públicas. |
| `/admin` | 200 y `noindex, nofollow, nocache`. |
| Metadatos | Título, descripción, canonical y Open Graph correctos en las 8 páginas. |
| Iframes iniciales | 0 en `/` y `/portfolio/propios` antes de pulsar play. |
| Servidor local | `x-nextjs-cache: HIT` en todas las páginas públicas. |

---

## 4. Pendientes y recomendaciones

### Contenido en Sanity

- Los campos SEO de Sanity siguen con textos de prueba o erratas:
  - `/contacto`: descripción `"dsdsa"`.
  - `/sobre-mi`: título `"mi trayecoria como filmaker"`.
  - Varias páginas comparten `"Portafolio Raúl García"`.
- No se han modificado porque no hay token de escritura. El código usa metadatos curados; cuando se corrijan en el Studio se pueden volver a enlazar.
- Conviene configurar el webhook de Sanity hacia `/api/revalidate` con `SANITY_REVALIDATE_SECRET` y definir `NEXT_PUBLIC_SITE_URL` en Vercel.

### Seguridad

- `/api/draft` no valida ningún secreto: cualquiera puede activar el modo borrador.
- `/api/revalidate` recibe el secreto por query string (`?secret=`), lo que puede quedar en logs, y devuelve `err.message` al cliente.
- `SANITY_API_READ_TOKEN` sigue documentado pero sin uso: la vista previa de borradores no puede leer contenido no publicado.

### Rendimiento e imágenes

- Quedan 24 avisos de ESLint por usar `<img>`. Migrar a `next/image` (o añadir `width`/`height` y `srcset`) eliminaría el CLS y aprovecharía la optimización de Vercel.
- El enlace del CV se construye reemplazando texto en `_ref` (`file-` → vacío, `-pdf` → `.pdf`); se romperá con archivos que no sean PDF.

### Repositorio

- La rama `vercel/install-vercel-web-analytics-m173le` sigue abandonada (1 commit por delante y 6 por detrás de `main`).
- El campo **Website** del repositorio en GitHub apunta a `https://portafolio-raul-kappa.vercel.app`, un deployment antiguo. Debe cambiarse a `https://portafolio-raul-sigma.vercel.app` desde la configuración del repositorio.

---

## 5. Cómo revertir

Cada commit es independiente:

```bash
# Revertir solo rendimiento/SEO
git revert <sha-del-commit-de-rendimiento>

# Revertir solo limpieza
git revert 34b3731
```

Para volver a una versión anterior completa:

```bash
git checkout ab2250c
```
