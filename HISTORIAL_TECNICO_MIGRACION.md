# Historial Tecnico

## Estado Registrado En Esta Revision

Fecha de revision local: 2026-06-01.

Acciones realizadas:

- Se descargo el repositorio `Mpinedo04/portafolio-raul`.
- Se inspecciono la estructura del proyecto.
- Se revisaron dependencias, rutas, cliente Sanity, paginas publicas y componentes principales.
- No se ejecutaron scripts de escritura.
- No se modifico contenido de Sanity.
- No se inicio Sanity Studio.
- No se publico nada en el dataset `production`.

## Correccion De Documentacion

La documentacion anterior mencionaba piezas que no existen actualmente en el codigo:

- `SectionTheme.jsx`
- `getColor.js`
- `pageTheme.js`
- `portfolioPage.js`
- `DynamicFont.jsx`
- Lazy-load completo en `VideoEmbed.jsx`

Estas referencias se han retirado de la documentacion tecnica para evitar decisiones basadas en una arquitectura que no esta presente en el repositorio actual.

## Arquitectura Actual Confirmada

- Next.js 16.2.1.
- React 19.2.4.
- Sanity 5.18.0.
- `next-sanity` 12.2.1.
- Sanity Studio embebido en `/admin`.
- Dataset por defecto: `production`.
- Cliente Sanity con `useCdn: false`.
- Varias paginas con ISR de 10 segundos.
- Varias paginas con render dinamico forzado y `revalidate = 0`.

## Riesgos Detectados

- Rendimiento afectado por cache desactivada.
- Carga pesada por iframes de video directos.
- Imagenes sin optimizacion con `next/image`.
- Efectos globales de scroll/mouse/DOM.
- Swiper cargado globalmente.
- Fuentes Google dinamicas con varios pesos.

## Siguiente Paso Recomendado

Antes de cambiar comportamiento, conviene hacer una rama y aplicar mejoras en orden:

1. Ajustar cache/Sanity sin romper preview.
2. Hacer videos click-to-play.
3. Optimizar imagenes principales.
4. Reducir efectos globales pesados.
5. Mover Swiper fuera del layout global.
