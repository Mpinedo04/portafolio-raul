# 🎬 Manual de Usuario: Panel de Control del Portfolio (Sanity CMS)

¡Bienvenido al panel de control de tu nuevo portfolio audiovisual! 
Esta web está construida con la última tecnología: **Next.js** para el diseño rapidísimo y **Sanity Studio** para que puedas cambiar tus vídeos y fotos sin ser programador.

---

## 🛑 1. CONCEPTOS MUY IMPORTANTES: ¿Qué puedo cambiar y qué no?

Sanity es un gestor de **CONTENIDOS**, no un constructor visual (no es Wix ni Wordpress tradicional).

- **❌ LO QUE NO PUEDES CAMBIAR DESDE AQUÍ (El Diseño):**
  No puedes cambiar el fondo oscuro, no puedes hacer la letra más grande ni cambiar la posición de los botones. Eso está programado a medida en el *código puro* (`CSS` y `React`) para que la web sea cien veces más rápiday profesional que una plantilla normal. Solo un programador modificando el código fuente puede alterar el diseño o los colores.

- **✅ LO QUE SÍ PUEDES CAMBIAR (El Contenido):**
  Puedes cambiar absolutamente todos los textos, títulos, todas las fotos de perfil, los propios vídeos y portadas de tus cortos, subir o borrar los elementos de tu equipo (cámaras, micros), cambiar tus habilidades y el email donde quieres recibir los contactos. 

---

## 🔑 2. ¿Cómo Acceder y Empezar a Editar?

1. Ve a tu web oficial y añádele la coletilla `/admin` al final. 
   *(Ejemplo: `https://portafolio-raul.vercel.app/admin`)*
2. Inicia sesión con la cuenta de Google autorizada.
3. Te encontrarás con una interfaz oscura dividida en 3 grandes columnas.

### El Funcionamiento Básico de las Columnas:
- **Columna Izquierda (Secciones):** Elige qué parte de la web quieres tocar (Proyectos, Equipo, Biografía...).
- **Columna Central (Lista):** Verás la lista de las cosas que has creado dentro de esa categoría. Para crear algo nuevo **desde cero**, haz clic en el diminuto icono del **`+`** (crear documento) arriba de esta barra.
- **Columna Derecha (Editor):** Es tu mesa de trabajo. Aquí rellenas los formularios, subes las fotos y escribes la información.

---

## 📝 3. Las Secciones Principales

### 📸 Proyectos (Tus Cortos o Trabajos)
Para añadir un nuevo proyecto a la página principal:
1. Haz clic en **"Proyecto"** (izquierda) -> **Icono `+`** (centro).
2. Rellena el **Título** (ej: *"Catarsis - Cortometraje"*).
3. Introduce el enlace al vídeo en Youtube/Vimeo si lo tienes.
4. Sube una foto de portada potente en "Imagen Principal" (esta será la que vea todo el mundo en la galería).
5. **MUY IMPORTANTE:** Arriba a la derecha del todo del editor, debes de pulsar siempre el botón verde de **"Publish"** (Publicar) para que los cambios se suban a la web pública.

### 🎥 Equipo Técnico (Tus Cámaras, Luces y Sets)
Para fardar de arsenal técnico:
1. Pestaña **"Equipo Técnico"** -> **Icono `+`**.
2. Dale un título al bloque (ej: "Mis Cámaras Gafas").
3. Para poner un pequeño icono bonito al lado en la web, en el campo **Lucide Icon Name** tienes que usar nombres en inglés de esta inmensa librería: [lucide.dev/icons](https://lucide.dev/icons).
   *Ejemplos que funcionan perfectos para ti (recuerda la mayúscula inicial): `Camera`, `Video`, `Film`, `Mic`, `Monitor`, `Aperture`, `Play`, `Headphones`, `Settings`.*

### 🛠️ Configuración Global (Tu Contacto)
Aquí abajo del todo podrás establecer:
- El correo electrónico donde quieres recibir los mensajes.
- Tus links de Instagram, Linkedin, etc.

---

## 🚀 4. "He dado a Publish pero la web aún no se actualiza"

La tecnología moderna funciona con **Cachés (Memoria ultra rápida)**. 
Cuando das a *Publish*, Sanity guarda los datos al instante, pero **Vercel** (donde está alojada tu web) puede tardar un poco en darse cuenta de que la base de datos ha recibido fotos nuevas porque sirve la página desde la memoria para que cargue en 0.05 segundos a los visitantes. 
*A veces tarda un par de minutos, o requiere que fuerces a refrescar la memoria del navegador de forma profunda (`Ctrl + Shift + R`).*

¡Empieza rellenando lo básico de "Sobre Mí" y añadiendo tu primera gran película a "Proyectos"!
