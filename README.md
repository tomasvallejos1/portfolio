# Portfolio — Tomás Vallejos

Portfolio estático, responsive y sin dependencias externas. Está construido con HTML, CSS y JavaScript puro para priorizar velocidad, accesibilidad y facilidad de despliegue.

Además del home, cada proyecto tiene su **página de caso de estudio**: qué problema resuelve, cómo nació, con qué se construyó, qué patrones de diseño se aplicaron, por qué se tomó cada decisión y capturas reales de las pantallas, con el link para entrar al producto.

## Ejecutar localmente

Hace falta un servidor estático (abrir `index.html` con doble clic rompe las rutas relativas entre el home y `proyectos/`):

```bash
python serve.py
```

Luego visitá `http://localhost:4173`.

`serve.py` es `python -m http.server` con la caché desactivada. Con el servidor estándar, el navegador guarda `content.js` y después de editarlo sigue mostrando la versión vieja hasta que se fuerza la recarga (Ctrl+Shift+R).

## Estructura

```
index.html              Home
proyectos/<slug>.html   Una página por proyecto (sólo metadatos + layout)
content.js              TODO el contenido del sitio
script.js               Render del home
proyecto.js             Render de la página de caso
ui.js                   Comportamiento compartido (menú, scroll, revelados)
styles.css              Sistema visual y home
proyecto.css            Página de caso
assets/proyectos/<slug>/*.webp   Capturas reales de cada proyecto
```

## Editar el contenido

Todo vive en [`content.js`](./content.js). No hace falta tocar HTML ni CSS para actualizar el portfolio:

- `person`: datos de contacto. El sitio los inyecta en los enlaces marcados con `data-person-link`.
- `projects`: cada proyecto tiene los datos de la tarjeta del home y un objeto `case` con el caso completo.
- `experience`, `education`, `certifications`, `skills`.

### Estructura de un proyecto

| Campo | Para qué |
| --- | --- |
| `slug` | Debe coincidir con `proyectos/<slug>.html` y con la carpeta de capturas. |
| `cover` / `coverAlt` | Captura que se ve en la tarjeta del home. |
| `coverDevice` | `'mobile'` muestra la captura como teléfono flotando sobre el panel; si se omite, va dentro de una ventana de navegador. |
| `accent` | Color del proyecto: tiñe la tarjeta, los botones y los detalles del caso. |
| `status` | Chip que aparece sobre la captura (`En producción`, `Beta pública`…). |
| `href` / `source` | Sitio en vivo y repositorio. |
| `case.tagline` | Una frase que resume el proyecto. |
| `case.facts` | Rol, equipo, estado, fecha. |
| `case.problem` | Contexto, con `lead`, `paragraphs` y `bullets`. |
| `case.origin` | Cómo nació, como línea de tiempo (un paso por párrafo). |
| `case.solves` | Qué resuelve, en tarjetas. |
| `case.stack` | Tecnologías agrupadas, cada una con su **por qué**. |
| `case.performance` | Decisiones de rendimiento y su efecto en la experiencia. |
| `case.patterns` | Patrones de diseño: nombre, dónde se aplica y por qué. |
| `case.decisions` | Decisiones difíciles: qué se hizo, por qué y qué se resignó. |
| `case.learned` | Cierre. |
| `case.screens` | Capturas reales con su epígrafe. `device: 'mobile'` las muestra como celular; `deviceFrame: true` avisa que la imagen ya trae el marco del teléfono, así el sitio no le dibuja uno encima. |
| `case.links` | Botones del encabezado (`kind: 'primary'` o `'secondary'`). |

Las secciones vacías o ausentes simplemente no se dibujan, y la numeración del índice se recalcula sola.

## Agregar un proyecto

1. Sumá el objeto a `projects` en `content.js` con su `slug`.
2. Copiá `proyectos/mangofi.html` a `proyectos/<slug>.html` y actualizá el `<title>`, la descripción, las metaetiquetas `og:`/`twitter:`, el JSON-LD y el atributo `data-project` del `<body>`.
3. Poné las capturas en `assets/proyectos/<slug>/`.

## Capturas

Están en WebP: las de escritorio a 1600 px de ancho y las de celular a 560 px. Para reemplazar una alcanza con dejar un archivo con el mismo nombre; el `alt` y el epígrafe se editan en `content.js`.

Los mockups de teléfono (`app-*.webp` de MangoFi) están recortados y con las esquinas transparentes, para que el chasis se recorte contra cualquier fondo. Si sumás uno nuevo, guardalo con transparencia y marcá la entrada con `deviceFrame: true`.

`assets/proyectos/mangofi/og.png` es la imagen para compartir el caso (1200×630): si cambia la captura de Inicio, conviene regenerarla.

Las pantallas que están detrás de un login y no tengas capturadas simplemente no aparecen: para sumarlas, poné la imagen en la carpeta del proyecto y agregá una entrada en `case.screens`.

## Despliegue

Es una carpeta estática sin build: cualquier hosting que sirva archivos tal cual (Vercel, Netlify, Cloudflare Pages, GitHub Pages) alcanza. El punto de entrada es `index.html`.

Las metaetiquetas `og:image`, `twitter:image`, `og:url` y `canonical` ya usan `https://tomasvallejos.tech` en las cuatro páginas. Si el dominio cambia, hay que reemplazarlo ahí (y en `robots.txt` / `sitemap.xml`).

### Vercel (recomendado)

1. Subí este repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importá el repo.
3. Framework Preset: **Other**. No hace falta build command ni output directory: la raíz del repo ya es lo que se sirve.
4. Deploy. Con eso queda publicado en un subdominio `*.vercel.app`.
5. En el proyecto → **Settings → Domains** → agregá `tomasvallejos.tech` (y `www.tomasvallejos.tech` si lo querés).
6. Vercel muestra los registros DNS exactos a cargar en el panel del dominio: normalmente un registro **A** apuntando al dominio raíz y un **CNAME** para `www`. Se cargan en el proveedor donde está registrado el dominio, no en Vercel.
7. La propagación puede tardar de minutos a un par de horas; el certificado HTTPS lo emite Vercel solo, una vez que el DNS resuelve.

Con el repo conectado, cada `git push` a la rama principal redespliega solo.

### Otras opciones

- **Cloudflare Pages**: mismo flujo (conectar repo, sin build), y si el dominio ya usa Cloudflare como DNS la conexión es más directa.
- **GitHub Pages**: gratis, pero para dominio propio hace falta un archivo `CNAME` en la raíz con el dominio adentro, y en GitHub Pages sólo se puede apuntar la raíz del sitio a un usuario/repo por vez.

### Antes de publicar

`.gitignore` excluye del repo los archivos que quedaron sueltos en la carpeta y no usa ninguna página (el borrador viejo del CV, dos capturas de referencia, `desktop.ini`). Si en algún momento estas ediciones dejan de aplicar, conviene revisar que no haya quedado nada personal sin querer expuesto: todo lo que esté en la carpeta del repo queda accesible por URL una vez desplegado.
