# Cuaderno personal

Sitio estático (HTML + CSS + JS, sin instalación) con tres grupos: **Intereses**, **Gustos** e **Influencias**. Cada sección funciona como galería o blog.

## Archivos
- `contenido.js`: **el único archivo que necesitas editar**: tu nombre, presentación, redes y las entradas de cada sección.
- `index.html`, `estilos.css`, `app.js`: estructura, diseño y lógica.
- `img/`: pon aquí tus fotos (por ejemplo `img/pintura/oleo-1.jpg`).

## Agregar una entrada
En `contenido.js`, dentro de `entradas: [ ... ]` de la sección que quieras:

```js
{
  titulo: "Nebulosa de Orión",
  fecha: "2026-09-20",
  tipo: "galeria",               // o "blog"
  imagenes: ["img/astronomia/orion.jpg"],
  resumen: "Mi primera astrofoto decente.",
  texto: "Párrafo uno.\n\nPárrafo dos.",
  etiquetas: ["astrofoto"]
}
```

Las secciones sin entradas muestran tarjetas de ejemplo hasta que agregues las tuyas.

## Verlo / publicarlo
- Local: abre `index.html` con doble clic.
- GitHub Pages: sube el repo, luego *Settings → Pages → Deploy from branch → main / root*.
