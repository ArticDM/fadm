/* =============================================================
   CONTENIDO DEL SITIO
   -------------------------------------------------------------
   Este es el único archivo que necesitas editar para agregar
   o cambiar contenido. No hace falta tocar el HTML ni el CSS.

   Cada sección tiene "entradas". Una entrada se ve así:

   {
     titulo:   "Mi primer óleo",
     fecha:    "2026-09-12",              // AAAA-MM-DD
     tipo:     "galeria",                  // "galeria" (imágenes) o "blog" (texto)
     imagenes: ["img/pintura/oleo-1.jpg"], // rutas a tus fotos (opcional)
     resumen:  "Una frase corta que aparece en la tarjeta.",
     texto:    "Texto largo. Puedes separar párrafos con\n\nuna línea en blanco.",
     etiquetas: ["óleo", "paisaje"]        // opcional
   }

   Si una sección no tiene entradas, el sitio muestra tarjetas
   de ejemplo para que veas cómo se verá.
   ============================================================= */

const SITIO = {
  nombre: "Art DM",
  lema: "Pinto, escribo, miro las estrellas y construyo cosas.",
  presentacion:
    "Este es mi rincón más personal, un proyecto con el objetivo de conocerme a mi mismo, encontrarme nuevamente: un archivo vivo de lo que me interesa, lo que me gusta y lo que me ha formado. \n\nEste soy yo.",
  correo: "francis.del@hotmail.com",
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/pakuoski/" },
    { nombre: "GitHub", url: "https://github.com/ArticDM" }
  ]
};

const GRUPOS = [
  {
    id: "intereses",
    nombre: "Intereses",
    intro: "Tengo una gran cantidad de intereses, a veces me cuesta trabajo enfocarme en una sola cosa. Me doy cuenta también que la mayoría tiene relación de una forma u otra con el arte",
    secciones: [
      {
        id: "pintura", nombre: "Pintura", aspecto: "cuadrado",
        descripcion: "Acrílicos, óleos, acuarelas... miniaturas",
        entradas: [
          {
            titulo: "Ejemplo de entrada real",
            fecha: "2026-09-29",
            tipo: "galeria",
            imagenes: [],
            resumen: "Así se ve una entrada escrita en contenido.js. Cambia este texto por el tuyo.",
            texto: "Aquí va la historia detrás de la pieza: materiales, tiempo, lo que salió bien y lo que no.\n\nCuando tengas fotos, ponlas en la carpeta img/ y agrega sus rutas en \"imagenes\".",
            etiquetas: ["acrílico", "ejemplo"]
          }
        ]
      },
      { id: "dibujo", nombre: "Dibujo", aspecto: "retrato", descripcion: "Bocetos, sketchbooks y estudios a lápiz o tinta.", entradas: [] },
      { id: "escritura", nombre: "Escritura", aspecto: "texto", descripcion: "Cuentos, poemas y notas sueltas.", entradas: [] },
      { id: "fotografia", nombre: "Fotografía", aspecto: "paisaje", descripcion: "Aún aprendiendo. Mi objetivo es tomarte al menos una foto que te guste.", entradas: [] },
      { id: "astronomia", nombre: "Astronomía", aspecto: "paisaje", descripcion: "El espacio siempre me ha fascinado... y atemorizado.", entradas: [] },
      { id: "tecnologia", nombre: "Tecnología", aspecto: "paisaje", descripcion: "Esta es mi carrera, y no podría sentirme más principiante.", entradas: [] },
      { id: "cosplay", nombre: "Cosplay", aspecto: "retrato", descripcion: "Disfraces para halloween, y tal vez algún día una convención.", entradas: [] },
      { id: "ttrpgs", nombre: "TTRPGs", aspecto: "cuadrado", descripcion: "Dungeon Master y algún día jugador.", entradas: [] },
      { id: "manualidades", nombre: "Manualidades", aspecto: "cuadrado", descripcion: "Papel, pegamento, tijeras, lo que sea que pueda hacer yo mismo.", entradas: [] }
    ]
  },
  {
    id: "gustos",
    nombre: "Gustos",
    intro: "Lo que escucho, veo y disfruto.",
    secciones: [
      { id: "musica", nombre: "Música", aspecto: "cuadrado", descripcion: "Álbumes, artistas y canciones que me definen de una u otra forma.", entradas: [] },
      { id: "videojuegos", nombre: "Videojuegos", aspecto: "poster", descripcion: "Hay muchos juegos que me han marcado. Probablemente la categoría que integra la mayoría de mis gustos.", entradas: [] },
      { id: "peliculas", nombre: "Películas", aspecto: "poster", descripcion: "Las que vuelvo a ver y las que me cambiaron para siempre.", entradas: [] },
      { id: "series", nombre: "Series", aspecto: "poster", descripcion: "Live action, caricaturas, animes, todo lo que me encanta ver.", entradas: [] },
      { id: "animales", nombre: "Animales", aspecto: "cuadrado", descripcion: "Amo a todos los animales, me gusta pensar que les suelo agradar yo a ellos.", entradas: [] },
      { id: "hobbys", nombre: "Hobbys", aspecto: "cuadrado", descripcion: "Pasatiempos, colecciones, todo lo que hago para entretenerme.", entradas: [] }
    ]
  },
  {
    id: "influencias",
    nombre: "Influencias",
    intro: "Personas, obras e ideas que me han dado forma. Desconocidos que con su trabajo me inspiro. Notablemente personas importantes en mi vida que han dejado una parte suya conmigo.",
    secciones: [
      { id: "artisticas", nombre: "Artísticas", aspecto: "retrato", descripcion: "Artistas y obras que moldean mi visión y mi manera de crear.", entradas: [] },
      { id: "profesionales", nombre: "Profesionales", aspecto: "retrato", descripcion: "Mentores, referentes y formas de trabajar que admiro.", entradas: [] },
      { id: "personales", nombre: "Personales", aspecto: "retrato", descripcion: "Gente valiosa, momentos que me hicieron ser quien sea que soy.", entradas: [] }
    ]
  }
];
