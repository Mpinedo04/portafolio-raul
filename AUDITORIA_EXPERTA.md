# Informe Técnico: Estado de Sincronía y Desafíos Recientes

Este documento es una hoja de ruta para la auditoría experta solicitada por Miguel y Raúl, detallando los puntos críticos de sincronía que se han abordado y aquellos que podrían requerir revisión adicional.

## 🔴 Desafíos Abordados (Resuelto/Sincronizado)

### 1. Incoherencia de Herencia de Color (CSS)
**Problema:** Diferentes páginas (Sobre Mí vs Portfolio) mostraban colores de texto inconsistentes (negro/blanco) operando bajo el mismo tema de Sanity.
**Causa:** Hardcoding de `color: #fff` y `#000` en archivos `.module.css` que sobreescribían el `--foreground` global.
**Solución Aplicada:** Refactorización de todos los módulos CSS para usar `color: inherit` o `var(--foreground)`. Se eliminó el "secuestro" de colores fijos.

### 2. Duplicidad de Datos (Email)
**Problema:** Inconsistencia en la dirección de correo entre el Footer y la página de Contacto.
**Causa:** Existencia de dos documentos independientes en Sanity (`settings` y `contact`) con campos de email solapados.
**Solución Aplicada:** Centralización del dato en `settings.contactEmail`. El componente `Footer.jsx` y la página `contacto/page.js` ahora beben de la misma fuente única de verdad.

### 3. "Dinamización Fallida" de Títulos
**Problema:** Raúl quería cambiar sus encabezados (ej: "BIO & TRAYECTORIA") y el panel de Sanity no se lo permitía.
**Causa:** Los títulos `<h1>` y `<h2>` estaban escritos como texto estático (Hardcoded) en el JSX.
**Solución Aplicada:** Expansión de los esquemas de Sanity con campos `title` y `subtitle` para cada página y actualización de la inyección de datos en el frontend.

### 4. Limitación de Formato de Color (RGBA vs Hex)
**Problema:** Al mover la barra de transparencia en Sanity, la web no aplicaba el cambio.
**Causa:** La función helper `getHex` solo procesaba strings hexadecimales simples, ignorando el objeto `rgba` de Sanity.
**Solución Aplicada:** Implementación de un procesador `getColor` en `layout.js` que detecta objetos RGB y genera el string `rgba(...)` para soportar opacidades dinámicas.
### 5. Sincronía Tipográfica Global (25 Fuentes Premium)
**Problema:** Al seleccionar una fuente en Sanity, la web no siempre aplicaba el cambio en todas las secciones.
**Causa:** Conflicto de herencia entre las variables de `:root` (estáticas) y las del `body` (dinámicas). Algunos módulos CSS tenían fuentes "pisadas" por defecto.
**Solución Aplicada:** Refactorización de la jerarquía de variables CSS. Se ha movido el motor de escucha al componente `RootLayout` y se ha forzado el bypass de caché para que los cambios de diseño sean reactivos.

### 6. Caos en la Gestión de Portfolio (Segmentación)
**Problema:** Los proyectos "Propios" y "Externos" estaban mezclados en una sola lista, dificultando la administración.
**Causa:** Falta de segmentación en los esquemas de Sanity y filtros de consulta (GROQ).
**Solución Aplicada:** Reestructuración completa del `structure.js` en Sanity Studio. Creación de filtros automáticos y páginas independientes (`/portfolio/propios` y `/portfolio/externos`) con un Hub de selección visual.

### 7. El "Bloqueo Fantasma" de Vercel (Caché Agresiva)
**Problema:** Los cambios realizados en Sanity no se reflejaban en la web de Vercel (aunque sí en Previsualización Local).
**Causa:** El Full Route Cache y el Data Cache de Next.js estaban configurados de forma estática por defecto en producción.
**Solución Aplicada:** Implementación de `export const dynamic = 'force-dynamic'` y bajada del `revalidate` a 10s para forzar la frescura de los datos.

### 8. Errores de Renderizado (Fallback de Imágenes)
**Problema:** La web mostraba errores 500 o pantallas en blanco si a un proyecto le faltaba una imagen o un slug en Sanity.
**Causa:** La función `urlFor` intentaba procesar objetos nulos o indefinidos.
**Solución Aplicada:** Implementación de un sistema de "Robustez Preventiva". Se añadieron chequeos de existencia (`if (!data) return...`) y imágenes por defecto para asegurar que la web siempre sea visible.

### 9. Inconsistencias Táctiles (UI Jitter)
**Problema:** El menú desplegable o los banners del Portfolio se sentían "nerviosos" o se descuadraban al interactuar.
**Causa:** Saltos de línea causados por paddings inconsistentes y falta de `align-items: center` en los contenedores de navegación.
**Solución Aplicada:** Normalización de la altura de línea (line-height) y alineación matemática de todos los elementos del Header en un solo eje.

## 🚧 Recomendaciones para el Experto

*   **ISR (Incremental Static Regeneration):** Se ha bajado la revalidación a **10-30 segundos** en puntos clave para una experiencia de edición más fluida (Modo Wix). Validar con el experto el impacto en peticiones a la API.
*   **Carga de Fuentes:** Hemos cargado 25 fuentes de Google. Validar si conviene usar `@next/font` para optimizar la carga y evitar el CLS (Cumulative Layout Shift) en la primera carga.
*   **Gestión de Errores (Fallbacks):** Hemos implementado fallbacks visuales (textos por defecto) para que la web no se rompa si Raúl deja un campo vacío. Habría que validar si el amigo experto prefiere un manejo de estados de carga más robusto.
*   **Arquitectura de Esquemas:** Validar si la separación entre `settings` y los documentos específicos de página es la ideal para la experiencia de usuario de Raúl (Modo Wix).

---
*Documento generado por Antigravity tras la fase de Sincronización Vertical Profunda.*
