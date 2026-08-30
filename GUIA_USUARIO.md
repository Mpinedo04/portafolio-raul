# Guia De Usuario: Panel Sanity Del Portfolio

Esta guia explica que se puede cambiar desde Sanity y que pertenece al codigo del proyecto.

## Aviso Importante

El panel `/admin` trabaja contra Sanity. En este proyecto, si no se configuran otras variables, apunta a:

- Proyecto: `xa9cwnu5`
- Dataset: `production`

Eso significa que si editas un documento y pulsas `Publish`, el cambio se guarda en la base de datos online y puede verse en la web publica.

Editar archivos del repositorio en local no cambia Sanity. Publicar desde el Studio si cambia Sanity.

## Como Entrar

1. Abre la web.
2. Anade `/admin` al final de la URL.
3. Inicia sesion con la cuenta autorizada.
4. Edita documentos desde el panel.
5. Pulsa `Publish` solo cuando quieras guardar el cambio real.

## Que Puedes Cambiar Desde Sanity

### Global

Documento `settings`:

- Nombre de marca.
- Redes sociales.
- Email de contacto.
- Texto del footer.
- SEO global.
- Fuentes seleccionadas.
- Gradiente de fondo.
- Banners y textos de algunas paginas de portfolio.

### Inicio

Documento `home`:

- Lineas del hero.
- Subtitulo.
- Texto principal.
- Imagen de fondo.
- Botones del hero.
- SEO.

### Sobre Mi

Documento `about`:

- Titulo y subtitulo.
- Bio.
- Imagen de perfil.
- Imagen de banner.
- Etapas de trayectoria.
- CV.
- Galeria de accion.
- Efecto de galeria.
- SEO.

### Portfolio

Documentos `project`:

- Titulo.
- Subtitulo.
- Etiqueta personalizada.
- Descripcion.
- Rol.
- Categoria: propio o externo.
- Video.
- Imagen principal.
- Material behind the scenes.
- Orden.
- Si aparece como destacado en la home.

### Equipo

Documentos `equipment`:

- Nombre.
- Modelo.
- Especificaciones.
- Categoria.
- Imagen.
- Orden.

Documento `workstation`:

- Titulo de la pagina.
- Subtitulo.
- Banner.
- Componentes de la estacion de edicion.

### Estudios

Documento `studies`:

- Banner.
- Titulos.
- Formacion.
- Cursos.
- Certificados.
- Software y nivel.

### Contacto

Documento `contact`:

- Titulo.
- Subtitulo.
- Banner.
- Ubicacion/disponibilidad.
- ID de Formspree.
- SEO.

El email principal se toma desde `settings.contactEmail`.

## Que No Conviene Cambiar Desde Sanity Sin Revisar

- No cambies categorias a valores inventados si la pagina espera valores concretos.
- No borres campos esenciales si una seccion depende de ellos.
- No publiques pruebas en `production` si solo quieres experimentar.
- No cambies el ID de Formspree si no sabes cual es el formulario correcto.

## Por Que A Veces No Se Ve Al Instante

La web mezcla paginas cacheadas con paginas dinamicas. Algunas partes pueden refrescar al momento y otras pueden tardar unos segundos o depender de la cache de Vercel/navegador.

Si has publicado y no ves el cambio:

1. Espera unos segundos.
2. Prueba `Ctrl + Shift + R`.
3. Comprueba que publicaste el documento correcto.
4. Comprueba que la pagina usa ese campo realmente.

## Regla De Oro

Si solo estas revisando rendimiento o codigo, no hace falta entrar en `/admin`. Para evitar sustos, trata `/admin` como el panel real de produccion.
