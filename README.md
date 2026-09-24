# Raúl García · Portafolio Audiovisual & Filmmaking

Sitio web y plataforma de portafolio audiovisual para **Raúl García** (Director, Filmmaker & Creador Audiovisual), construido con arquitectura headless sobre **Next.js** y **Sanity CMS**.

El proyecto permite gestionar de forma centralizada proyectos audiovisuales, inventario de equipo técnico, formación académica, biografía y configuraciones globales de diseño mediante un panel de control personalizado en Sanity Studio.

---

## 🌐 Sitio Web Oficial

- **URL en Producción:** [https://portafolio-raul-sigma.vercel.app/](https://portafolio-raul-sigma.vercel.app/)
- **Panel de Administración (CMS):** `https://portafolio-raul-sigma.vercel.app/admin`
- **Infraestructura:** Desplegado de forma continua en la red Edge de [Vercel](https://vercel.com).

---

## ✨ Características y Funcionalidades

### 1. Gestión de Contenido Headless (Sanity Studio v5)
- **Centro de mando integrado (`/admin`):** Acceso al CMS embebido dentro de la propia aplicación Next.js mediante `sanity/structure`.
- **Visual Editing & Draft Mode (`/api/draft`):** Integración con Sanity Presentation Tool para previsualizar cambios en vivo sobre el diseño en tiempo real antes de publicar.
- **Revalidación instantánea bajo demanda (`/api/revalidate`):** Webhook seguro de revalidación para actualizar el contenido en Vercel al instante sin reconstruir el proyecto completo.
- **Documentos Singleton protegidos:** Esquemas únicos (`home`, `about`, `contact`, `studies`, `workstation`, `settings`) blindados contra duplicaciones accidentales.

### 2. Portafolio Audiovisual Especializado
- **Hub de proyectos segmentado:**
  - `/portfolio/propios`: Obras de autor, cortometrajes y piezas personales.
  - `/portfolio/externos`: Trabajos comerciales, corporativos y colaboraciones.
- **Reproductor de vídeo integrado (`VideoEmbed`):** Integración fluida para visualización de piezas audiovisuales (Vimeo / YouTube / CDN).
- **Metadatos cinematográficos:** Badges dinámicos de año de producción, rol técnico, sinopsis y ficha técnica.

### 3. Experiencia Interactiva y Componentes Visuales
- **Galería interactiva Behind The Scenes (`BtsGallery`):** Carrusel fotográfico potenciado por **Swiper** con soporte gestual en móviles, transiciones fluidas y posicionamiento focal (*hotspot*) de Sanity en alta resolución (2400px Q90).
- **Matriz de dominio de software (`/estudios`):** Indicadores visuales de nivel (escala segmentada 1 a 5) ordenados por áreas técnicas (Vídeo, Audio, VFX, Diseño) con etiquetas emergentes en hover.
- **Catálogo de equipo técnico (`/equipo`):** Desglose categorizado y normalizado del inventario de cámaras, iluminación, ópticas y sonido.
- **Línea de tiempo profesional (`/sobre-mi`):** Hitos y trayectoria profesional, junto con botón para descarga directa del CV editable desde el panel.
- **Micro-interacciones:**
  - Efecto dinámico de iluminación de cursor (`MouseEffect`).
  - Barra de progreso de lectura superior (`ScrollProgress`).
  - Cabeceras unificadas con banners personalizables (`PageBanner`).

### 4. Personalización Global desde el CMS (`settings`)
- **Configurador de estética:** Selector de tipografías y 4 temas de degradados de fondo gestionados desde el propio Sanity.
- **Control de banners y textos:** Personalización independiente de titulares, subtítulos y mensajes por página.
- **SEO Global y Social:** Títulos meta, descripciones y Open Graph configurables por el usuario.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Framework Web** | [Next.js](https://nextjs.org/) (App Router, Server & Client Components) |
| **Biblioteca UI** | [React](https://react.dev/) |
| **CMS Headless** | [Sanity](https://www.sanity.io/) Studio v5 & `@sanity/presentation` (Visual Editing) |
| **Integración CMS** | `next-sanity`, `@sanity/image-url`, `@sanity/color-input` |
| **Estilos** | CSS Modules modernos, CSS Custom Properties y Glassmorphism |
| **Componentes e Iconos** | [Lucide React](https://lucide.dev/) |
| **Carruseles y Sliders** | [Swiper](https://swiperjs.com/) |
| **Despliegue** | [Vercel](https://vercel.com) |

---

## 📁 Estructura del Proyecto

    portafolio-raul/
    ├── public/                                 # Recursos estáticos públicos y favicon
    ├── src/
    │   ├── app/
    │   │   ├── (admin)/                        # Ruta aislada para el panel de administración
    │   │   │   └── admin/[[...index]]/         # Sanity Studio embebido
    │   │   ├── (website)/                      # Aplicación web pública
    │   │   │   ├── contacto/                   # Página y formulario de contacto
    │   │   │   ├── equipo/                     # Inventario y desglose de equipo técnico
    │   │   │   ├── estudios/                   # Formación y matriz de software (1-5)
    │   │   │   ├── portfolio/                  # Hub general de proyectos
    │   │   │   │   ├── externos/               # Proyectos comerciales/externos
    │   │   │   │   └── propios/                # Proyectos propios/de autor
    │   │   │   ├── sobre-mi/                   # Biografía, timeline y descarga de CV
    │   │   │   ├── globals.css                 # Estilos globales y variables de tema
    │   │   │   ├── layout.js                   # Layout principal de la web pública
    │   │   │   └── page.js                     # Portada (Hero, destacados y presentación)
    │   │   └── api/
    │   │       ├── draft/                      # Endpoint para activar el modo borrador / live preview
    │   │       └── revalidate/                 # Webhook para revalidación bajo demanda (ISR)
    │   ├── components/                         # Componentes reutilizables de UI
    │   │   ├── ActionGallery.jsx               # Galería de fotogramas de acción
    │   │   ├── BtsGallery.jsx                  # Carrusel Swiper "Detrás de cámaras"
    │   │   ├── EmptyState.jsx                  # Estado vacío para colecciones sin datos
    │   │   ├── Footer.jsx                      # Pie de página y enlaces sociales
    │   │   ├── Header.jsx                      # Cabecera, navegación y menú móvil
    │   │   ├── Hero.jsx                        # Portada con título adaptable y CTA
    │   │   ├── MouseEffect.jsx                 # Efecto interactivo de cursor/luz
    │   │   ├── PageBanner.jsx                  # Banner unificado de títulos por página
    │   │   ├── ScrollProgress.jsx              # Barra de progreso de lectura
    │   │   └── VideoEmbed.jsx                  # Embed accesible para reproductores de vídeo
    │   ├── lib/                                # Utilidades y mapa de iconos
    │   └── sanity/
    │       ├── components/                     # Componentes personalizados del Studio (ej. FontSelector)
    │       ├── lib/                            # Clientes Sanity, generador de URLs y estructura
    │       ├── presentation/                   # Configuración del Visual Editing
    │       └── schemaTypes/                    # Esquemas de datos de Sanity
    │           ├── about.js                    # Esquema de biografía, CV y timeline
    │           ├── contact.js                  # Esquema de información de contacto
    │           ├── equipment.js                # Esquema de equipo técnico
    │           ├── home.js                     # Esquema de la página de inicio
    │           ├── project.js                  # Esquema de proyectos y vídeos
    │           ├── settings.js                 # Esquema de estilos, banners y SEO
    │           ├── studies.js                  # Esquema de estudios y software
    │           └── workstation.js              # Esquema de estación de trabajo/setup
    ├── next.config.mjs                         # Configuración de Next.js (imágenes remotas de Sanity CDN)
    ├── sanity.config.js                        # Configuración principal de Sanity Studio
    └── package.json                            # Scripts y dependencias

---

## 🗺️ Mapa de Rutas

| Ruta | Propósito |
| :--- | :--- |
| `/` | Portada con Hero, proyectos destacados y propuesta visual |
| `/sobre-mi` | Perfil profesional, trayectoria en timeline y descarga de CV |
| `/portfolio` | Hub central del portafolio |
| `/portfolio/propios` | Proyectos de autor y piezas propias |
| `/portfolio/externos` | Trabajos comerciales, colaboraciones y encargos |
| `/equipo` | Inventario técnico de material audiovisual |
| `/estudios` | Formación académica y escala de dominio de herramientas |
| `/contacto` | Canales directos de contacto profesional |
| `/admin` | Panel de gestión de contenidos (Sanity Studio) |
| `/api/draft` | Activación de visualización en vivo (Draft Mode) |
| `/api/revalidate` | Endpoint de revalidación bajo demanda vía Webhook |

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto para conectar la aplicación con tu proyecto de Sanity:

    # ID del proyecto en Sanity (requerido)
    NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id

    # Dataset de Sanity (generalmente "production")
    NEXT_PUBLIC_SANITY_DATASET=production

    # Token con permisos de lectura para previsualizaciones en vivo y Draft Mode
    SANITY_API_READ_TOKEN=tu_read_token

    # Secreto para autenticar las peticiones del webhook de revalidación bajo demanda
    SANITY_REVALIDATE_SECRET=tu_secreto_de_revalidacion

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Mpinedo04/portafolio-raul.git
    cd portafolio-raul
    ```

2. **Instalar dependencias:**
    ```bash
    npm install
    ```

3. **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en el navegador. Para acceder a Sanity Studio visita [http://localhost:3000/admin](http://localhost:3000/admin).

4. **Compilación para producción:**
    ```bash
    npm run build
    npm run start
    ```

5. **Comprobación de código:**
    ```bash
    npm run lint
    ```
