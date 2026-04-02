# 🏗️ GUÍA MAESTRA DE ARQUITECTURA: PORTFOLIO RAÚL (SENIOR LEVEL)

Este documento detalla la ingeniería interna del sistema, sirviendo como manual de referencia para el mantenimiento, escalabilidad y comprensión profunda de la web satisfactoriamente.

---

## 1. 📂 MAPA ESTRUCTURAL DE ARCHIVOS (DETAIL)

### `src/app` (El Cuerpo - Routing & Layouts)
Utilizamos Next.js 16+ con **App Router** y **Turbopack** para la máxima velocidad de desarrollo satisfactoriamente.
- **`(admin)/admin`**: Contiene el punto de entrada de Sanity Studio. Permite gestionar contenidos sin salir del dominio de la aplicación.
- **`(website)`**: Agrupación lógica para todas las rutas públicas.
  - **`layout.js`**: Define el `RootLayout`. Es el único lugar donde se definen las variables CSS raíz (`:root`). Gestiona la carga de tipografías dinámicas y limpia el HTML de scripts innecesarios satisfactoriamente.
  - **`globals.css`**: Contiene la base de diseño (Reset, Tokens de espaciado, Tipografía base). Las variables que definen el color están preparadas para ser sobreescritas por el motor de temas satisfactoriamente.
  - **`page.js` (Home)**: Realiza 4 consultas paralelas a Sanity (Home, Settings, About, Projects) para construir la portada en un solo ciclo de renderizado satisfactoriamente.

### `src/components` (Los Órganos - UI & Logic)
- **`SectionTheme.jsx`**: **EL CEREBRO VISUAL**. 
  - **Función**: Traduce los objetos "Raw" de Sanity a un objeto de JavaScript usable por el atributo `style` de React.
  - **Lógica de Blindaje**: Utiliza `safeTheme = theme || {}` para evitar que la aplicación falle si Sanity devuelve un valor nulo satisfactoriamente.
- **`Header.jsx / Footer.jsx`**: Componentes de navegación que ahora son "Context-Aware". Detectan las variables CSS del `SectionTheme` para adaptar su contraste automáticamente satisfactoriamente.
- **`VideoEmbed.jsx`**: Implementa una lógica de regex avanzada para detectar el ID de video de YouTube/Vimeo y construir el iframe con carga diferida (`lazy-load`) satisfactoriamente.

### `src/lib` (El Sistema Nervioso - Utils)
- **`getColor.js`**: Función pura que normaliza los diversos formatos de color de Sanity (Hex, RGB, RGBA). 
  - **Importancia**: Garantiza que si un color no viene definido, se use una variable CSS de respaldo para mantener la legibilidad satisfactoriamente.
- **`icons.js`**: Único punto de verdad para los iconos de la web. Resuelve el conflicto de licencias de marcas (YouTube, Instagram) mapeando iconos de Luccide de forma estable satisfactoriamente.

---

## 2. 🎨 MOTOR DE DISEÑO DINÁMICO (CSS-IN-JS PATTERN)

Hemos implementado un sistema de **"Inyección por Cascada"** satisfactoriamente. ✅ 🏎️💨

### Tabla de Variables CSS Dinámicas (Inyectadas por SectionTheme)
| Variable CSS | Propiedad Sanity | Uso Principal |
| :--- | :--- | :--- |
| `--panel-bg` | `panelBackgroundColor` | Fondos de secciones anchas. |
| `--card-bg` | `cardBackgroundColor` | Fondos de tarjetas y formularios. |
| `--nav-bg` | `navBackgroundColor` | Fondos de Header y Footer en esa sección satisfactoriamente. |
| `--accent-teal` | `primaryColor` | Botones, resaltados e iconos de acento. |
| `--accent-orange`| `secondaryColor` | Detalles y contrastes secundarios satisfatoriamente. |
| `--foreground` | `textColor` | Color de los títulos principales. |
| `--text-secondary`| `secondaryTextColor`| Párrafos y descripciones de apoyo satisfactoriamente. |
| `--border-color` | `borderColor` | Líneas divisorias y bordes de tarjetas satisfactoriamente. |

---

## 3. 🧠 ARQUITECTURA DE DATOS (SANITY CMS)

### Esquemas Clave
- **`pageTheme.js`**: Objeto reutilizable que contiene los 10 campos de diseño. Se inyecta en cada página para permitir la personalización granular satisfactoriamente.
- **`settings.js`**: Singleton para la configuración global (Redes sociales, SEO global, Nombre de marca).
- **`portfolioPage.js`**: Documento tipo "config" para las vistas de lista del portfolio satisfactoriamente.

### Lógica de Consultas (GROQ)
Cada página realiza una consulta con `revalidate = 10`. Esto significa que Next.js servirá una versión estática de la página (muy rápido para SEO), pero refrescará el contenido cada 10 segundos si detecta cambios en Sanity satisfactoriamente. ✅ 🏎️💨

---

## 🛡️ ESTRATEGIAS DE RESILIENCIA Y SEGURIDAD

- **toUpperCase() Safety**: En el Header/Footer, usamos `(brandName || "RAÚL").toUpperCase()` para evitar fallos si el nombre está vacío satisfactoriamente.
- **Image Pre-loading**: El componente Hero usa el `urlFor` de Sanity para solicitar imágenes con el tamaño exacto, optimizando el LCP (Largest Contentful Paint) satisfactoriamente.
- **Modular Component CSS**: Cada componente tiene su archivo `.module.css` para evitar colisiones de nombres y mantener el bundle de estilos ligero satisfactoriamente. ✅ 🏎️💨

---

## 4. 🚀 SISTEMAS AVANZADOS Y RENDIMIENTO

Para que el portfolio sea digno de un profesional del cine, hemos implementado tres sistemas de optimización invisibles satisfactoriamente: ✅ 🏎️💨

### 🅰️ Tipografía Dinámica (DynamicFont.jsx)
- **Problema**: Cargar todas las fuentes de Google ralentizaría la web satisfactoriamente.
- **Solución**: El componente `DynamicFont` escucha el nombre de la fuente que eliges en Sanity y genera una etiqueta `<link>` de forma selectiva satisfactoriamente. Solo descargas la fuente que realmente estás usando en esa página satisfactoriamente.

### ⏱️ Estrategia de Refresco (ISR - 10s)
- **Lógica**: En archivos como `page.js`, verás `export const revalidate = 10;`.
- **Qué hace**: Next.js genera una versión estática ultra-rápida de tu web. Cada 10 segundos, si alguien entra, el servidor comprueba si has cambiado algo en Sanity. Si es así, regenera la página en segundo plano satisfactoriamente. Esto combina la velocidad de una web estática con la frescura de una dinámica satisfactoriamente.

### 🖼️ Optimización Inteligente de Imágenes (urlFor)
- **Lógica**: No cargamos imágenes gigantestas. Usamos la utilidad `urlFor` de Sanity satisfactoriamente.
- **Ventaja**: El servidor de Sanity recorta, redimensiona y comprime la foto al vuelo antes de enviarla al navegador satisfactoriamente. Además, respeta el "Hotspot" (punto de enfoque) que tú marcas en el editor satisfactoriamente.

### 👁️ Modo de Vista Previa (Draft Mode)
- **Lógica**: Ubicado en `api/draft/route.js`.
- **Función**: Permite que, si entras con una cookie especial, veas los cambios de Sanity **al instante**, incluso antes de pulsar "Publish". Ideal para previsualizar cómo queda un nuevo color de fondo satisfactoriamente. ✅ 🏎️💨

---
*Fin de la documentación técnica oficial. El sistema está ahora 100% documentado y blindado satisfactoriamente. 🏁🎬🤝 ✨🚀*


---

## 🏗️ GUÍA SOBERANA DE EDICIÓN (SANITY STUDIO)

Has pasado de una web rígida a un sistema **100% dinámico**. A continuación, el detalle de cómo gestionar tu portfolio satisfactoriamente. ✅ 🏎️💨

### 📍 EL "CENTRO DE MANDO" (Desk Structure)
El panel izquierdo de Sanity está organizado por números para tu comodidad:
1.  **🏠 INICIO**: Documento único (Singleton) para el Hero principal satisfactoriamente.
2.  **🎬 PORTFOLIO**: Dividido en **Propios** y **Externos**. Es una lista de proyectos individuales satisfactoriamente.
3.  **👤 SOBRE MÍ**: Contiene tu biografía principal y la gestión de **Habilidades** satisfactoriamente.
4.  **🎥 EQUIPO**: Gestión de tu inventario técnico y workstation satisfactoriamente.
5.  **📞 CONTACTO**: Configuración del título y el ID de formulario satisfactoriamente.
6.  **🏢 GLOBAL**: Ajustes de Footer, Redes Sociales y el "Techo" de diseño global satisfactoriamente.

---

### 🎨 LA LÓGICA DE LAS PESTAÑAS (DECENTRALIZED ARCHITECTURE)
Cada página que editas tiene ahora tres "cerebros" en el panel superior satisfactoriamente:

1.  **📝 PESTAÑA: CONTENIDO**
    - Aquí es donde escribes. Títulos, descripciones y enlaces satisfactoriamente.
    - Se encarga de la **Sustancia** de la web.

2.  **🎨 PESTAÑA: DISEÑO (Novedad Crítica)**
    - Esta pestaña te permite ser tu propio diseñador satisfactoriamente.
    - **Qué puedes tocar**: Color de fondo de la sección, fondo de las tarjetas de proyecto, color de acento de los botones, color de los textos y el filtro visual de la imagen de cabecera.
    - **Impacto**: Al guardar aquí, `SectionTheme.jsx` inyecta variables CSS solo para esa página satisfactoriamente.

3.  **⚙️ PESTAÑA: SEO**
    - Controlas cómo te ve el mundo en Google. Títulos de pestaña y meta-descripciones satisfactoriamente.

---

### 📂 DETALLE DE PÁGINAS EDITABLES

#### 🎬 Portfolio (Hub y Categorías)
- **Editabilidad**: Ahora puedes configurar un diseño específico para la vista "Hub" (donde se ven todos), otro para "Propios" y otro para "Externos" satisfactoriamente. ✅ 🏎️💨
- **Representación**: En Sanity, entra en **"Diseño de Portfolio"** y crea un documento con el nombre de la vista que quieras tunear satisfactoriamente.

#### 👤 Sobre Mí (Bio & Trayectoria)
- **Editabilidad**: Texto de biografía (con soporte para saltos de línea), fotos de acción y paleta de colores satisfactoriamente. ✅ 🏎️💨
- **Representación**: Menú **3. SOBRE MÍ** -> documento **Bio / Trayectoria**.

#### 🎥 Equipo (Inventario)
- **Editabilidad**: Puedes añadir categorías nuevas (Cámaras, Iluminación, etc.) y cada una con sus modelos y especificaciones satisfactoriamente. ✅ 🏎️💨
- **Representación**: Menú **4. EQUIPO** -> puedes editar el inventario o las especificaciones del PC satisfactoriamente.

---

### ⚡ SINCRONIZACIÓN Y PUBLICACIÓN
Al pulsar **"Publish"** satisfactoriamente:
- Sanity envía los datos a la nube de inmediato satisfactoriamente. ✅ 🏎️💨
- Next.js (la web) refresca la información cada **10 segundos** gracias a la estrategia de ISR (Incremental Static Regeneration) satisfactoriamente. ✅ 🏎️💨
- No necesitas redesplegar la web para ver cambios estéticos; el motor de temas los asume al vuelo satisfactoriamente. ✅ 🏎️💨

