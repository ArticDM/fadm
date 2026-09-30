/* Lógica del sitio. Normalmente no necesitas editar este archivo:
   el contenido vive en contenido.js */

(() => {
  const app = document.getElementById("app");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const modal = document.getElementById("modal");
  const modalCaja = document.getElementById("modalCaja");

  // Tonos para los placeholders (todos en la familia oliva / salvia / arena)
  const TONOS = [
    ["#e3e7cf", "#b6bf93", "#7d8a48", "#4a5526"],
    ["#efe6d2", "#d6c49c", "#a58a55", "#6b5a33"],
    ["#e4ebe0", "#aebfa6", "#6f8667", "#3f5239"],
    ["#f1e5d8", "#dcbf9f", "#b8794a", "#7b4f2c"],
    ["#e9ead9", "#c4c7a3", "#8f9362", "#5b5e36"],
    ["#e1e6d8", "#a9b388", "#6b7a3a", "#39421d"]
  ];
  const RATIOS = { cuadrado: "1", retrato: "4 / 5", paisaje: "4 / 3", poster: "2 / 3", texto: "3 / 2" };
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fechaBonita = f => {
    if (!f) return "";
    const [a, m, d] = f.split("-").map(Number);
    return `${d} ${MESES[m - 1]} ${a}`;
  };

  // Índice plano de secciones con su tono
  const todas = [];
  GRUPOS.forEach(g => g.secciones.forEach(s => {
    s.grupo = g;
    s.tono = TONOS[todas.length % TONOS.length];
    todas.push(s);
  }));

  function placeholder(tono, { etiqueta = "Imagen", texto = false, src = "" } = {}) {
    const vars = `--ph-a:${tono[0]};--ph-b:${tono[1]};--ph-c:${tono[2]};--ph-d:${tono[3]}`;
    if (src) return `<div class="ph" style="${vars}"><img src="${esc(src)}" alt="" loading="lazy"></div>`;
    return `<div class="ph${texto ? " ph--texto" : ""}" style="${vars}"><span>${esc(etiqueta)}</span></div>`;
  }

  // Entradas de ejemplo cuando una sección está vacía
  function ejemplos(s) {
    const variantes = s.aspecto === "texto" ? ["blog", "blog", "blog", "galeria", "blog", "blog"]
      : ["galeria", "galeria", "blog", "galeria", "galeria", "blog"];
    const alturas = ["1", "4 / 5", "4 / 3", "3 / 4", "1", "16 / 10"];
    return variantes.map((tipo, i) => ({
      titulo: tipo === "blog" ? `Entrada de ${s.nombre.toLowerCase()} #${i + 1}` : `Pieza de ejemplo ${i + 1}`,
      fecha: `2026-0${9 - (i % 6)}-1${i}`,
      tipo,
      imagenes: [],
      resumen: tipo === "blog"
        ? "Aquí irá un texto corto: una reflexión, una crónica o una nota sobre este tema."
        : "Descripción breve de la imagen: técnica, contexto o por qué es especial.",
      texto: "Este es contenido de ejemplo. Agrega tus propias entradas en el archivo contenido.js y estas tarjetas desaparecerán.\n\nPuedes contar la historia detrás de cada pieza, enlazar referencias o simplemente dejar la imagen hablar.",
      etiquetas: ["ejemplo"],
      _ejemplo: true,
      _ratio: tipo === "blog" ? RATIOS.texto : s.aspecto === "cuadrado" || s.aspecto === "poster" || s.aspecto === "retrato" ? RATIOS[s.aspecto] : alturas[i]
    }));
  }

  /* ---------- Navegación ---------- */
  function pintarNav(actual) {
    nav.innerHTML = [`<a href="#/" class="${!actual ? "activo" : ""}">Inicio</a>`]
      .concat(GRUPOS.map(g => `<a href="#/${g.id}" class="${actual === g.id ? "activo" : ""}">${esc(g.nombre)}</a>`))
      .join("");
  }
  menuBtn.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    menuBtn.setAttribute("aria-expanded", abierto);
  });
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") { nav.classList.remove("abierto"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Portada ---------- */
  function vistaInicio(grupoDestino) {
    const chips = GRUPOS.flatMap(g => g.secciones).slice(0, 9)
      .map(s => `<a class="chip" href="#/${s.grupo.id}/${s.id}">${esc(s.nombre)}</a>`).join("");

    const grupos = GRUPOS.map((g, gi) => `
      <section class="grupo" id="g-${g.id}">
        <div class="contenedor">
          <div class="grupo__cabeza">
            <div>
              <span class="grupo__num">0${gi + 1}</span>
              <h2>${esc(g.nombre)}</h2>
            </div>
            <p class="grupo__intro">${esc(g.intro)}</p>
          </div>
          <div class="mosaico">
            ${g.secciones.map(s => {
              const n = s.entradas.length;
              const portada = s.entradas.find(e => e.imagenes && e.imagenes.length);
              return `
              <a class="tile" href="#/${g.id}/${s.id}">
                ${placeholder(s.tono, { etiqueta: s.nombre, texto: s.aspecto === "texto", src: portada ? portada.imagenes[0] : "" })}
                <div class="tile__cuerpo">
                  <h3>${esc(s.nombre)}</h3>
                  <p>${esc(s.descripcion)}</p>
                  <span class="tile__pie">${n ? `${n} entrada${n > 1 ? "s" : ""}` : "Próximamente"} →</span>
                </div>
              </a>`;
            }).join("")}
          </div>
        </div>
      </section>`).join("");

    app.innerHTML = `
      <section class="hero aparece">
        <div class="contenedor hero__grid">
          <div>
            <span class="hero__eyebrow">Cuaderno personal</span>
            <h1>Hola, soy <em>${esc(SITIO.nombre)}</em>.</h1>
            <p class="hero__texto">${esc(SITIO.presentacion)}</p>
            <div class="hero__chips">${chips}</div>
          </div>
          <div class="hero__foto">${placeholder(TONOS[5], { etiqueta: "Tu foto" })}</div>
        </div>
      </section>
      ${grupos}`;

    if (grupoDestino) {
      const el = document.getElementById(`g-${grupoDestino}`);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    } else {
      window.scrollTo(0, 0);
    }
  }

  /* ---------- Página de sección ---------- */
  let filtro = "todo";
  function vistaSeccion(s) {
    const reales = [...s.entradas].sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    const sonEjemplos = reales.length === 0;
    const entradas = sonEjemplos ? ejemplos(s) : reales;
    const hayBlog = entradas.some(e => e.tipo === "blog");
    const hayGal = entradas.some(e => e.tipo !== "blog");

    const hermanas = s.grupo.secciones.map(h =>
      `<a class="chip ${h === s ? "activo" : ""}" href="#/${s.grupo.id}/${h.id}">${esc(h.nombre)}</a>`).join("");

    app.innerHTML = `
      <div class="contenedor aparece">
        <header class="seccion-cabeza">
          <div class="migas"><a href="#/">Inicio</a> / <a href="#/${s.grupo.id}">${esc(s.grupo.nombre)}</a> / ${esc(s.nombre)}</div>
          <h1>${esc(s.nombre)}</h1>
          <p>${esc(s.descripcion)}</p>
          ${hayBlog && hayGal ? `
          <div class="filtros" role="group" aria-label="Filtrar entradas">
            <button class="chip" data-f="todo">Todo</button>
            <button class="chip" data-f="galeria">Galería</button>
            <button class="chip" data-f="blog">Escritos</button>
          </div>` : ""}
        </header>
        <nav class="hermanas" aria-label="Otras secciones de ${esc(s.grupo.nombre)}">${hermanas}</nav>
        ${sonEjemplos ? `<div class="aviso">Aún no hay entradas aquí. Estas son tarjetas de ejemplo; agrega las tuyas en <code>contenido.js</code>.</div>` : ""}
        <div class="galeria" id="galeria"></div>
      </div>`;

    const gal = document.getElementById("galeria");
    const pintar = () => {
      app.querySelectorAll("[data-f]").forEach(b => b.classList.toggle("activo", b.dataset.f === filtro));
      const lista = entradas.filter(e => filtro === "todo" || (filtro === "blog" ? e.tipo === "blog" : e.tipo !== "blog"));
      gal.innerHTML = lista.length ? lista.map((e, i) => tarjeta(e, s, entradas.indexOf(e))).join("")
        : `<p class="vacio">Nada por aquí todavía.</p>`;
    };
    app.querySelectorAll("[data-f]").forEach(b => b.addEventListener("click", () => { filtro = b.dataset.f; pintar(); }));
    gal.addEventListener("click", e => {
      const btn = e.target.closest(".entrada");
      if (btn) abrir(entradas[+btn.dataset.i], s);
    });
    pintar();
    window.scrollTo(0, 0);
  }

  function tarjeta(e, s, i) {
    const blog = e.tipo === "blog";
    const ratio = e._ratio || (blog ? RATIOS.texto : RATIOS[s.aspecto] || "1");
    const img = e.imagenes && e.imagenes[0];
    return `
      <button class="entrada ${e._ejemplo ? "entrada--ejemplo" : ""}" data-i="${i}">
        <div class="entrada__img" style="--ratio:${ratio}">
          ${placeholder(s.tono, { etiqueta: blog ? "Texto" : "Imagen", texto: blog && !img, src: img })}
        </div>
        <div class="entrada__cuerpo">
          <div class="entrada__meta">
            <span class="etiqueta-tipo ${blog ? "etiqueta-tipo--blog" : ""}">${blog ? "Escrito" : "Galería"}</span>
            <span>${fechaBonita(e.fecha)}</span>
          </div>
          <h3>${esc(e.titulo)}</h3>
          ${e.resumen ? `<p>${esc(e.resumen)}</p>` : ""}
        </div>
      </button>`;
  }

  /* ---------- Modal de entrada ---------- */
  function abrir(e, s) {
    const imgs = e.imagenes && e.imagenes.length ? e.imagenes : [];
    const parrafos = (e.texto || e.resumen || "").split(/\n\s*\n/).map(p => `<p>${esc(p)}</p>`).join("");
    modalCaja.innerHTML = `
      <button class="cerrar" aria-label="Cerrar">×</button>
      <div class="modal__img" id="modalImg">
        ${placeholder(s.tono, { etiqueta: e.tipo === "blog" ? s.nombre : "Imagen", texto: e.tipo === "blog" && !imgs.length, src: imgs[0] })}
      </div>
      ${imgs.length > 1 ? `<div class="modal__miniaturas">${imgs.map((src, k) =>
        `<button data-k="${k}" class="${k ? "" : "activo"}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
      <div class="modal__texto">
        <div class="entrada__meta">
          <span class="etiqueta-tipo ${e.tipo === "blog" ? "etiqueta-tipo--blog" : ""}">${esc(s.nombre)}</span>
          <span>${fechaBonita(e.fecha)}</span>
        </div>
        <h2>${esc(e.titulo)}</h2>
        ${parrafos}
        ${e.etiquetas && e.etiquetas.length ? `<div class="modal__etiquetas">${e.etiquetas.map(t => `<span>#${esc(t)}</span>`).join("")}</div>` : ""}
      </div>`;
    modalCaja.querySelector(".cerrar").onclick = () => modal.close();
    modalCaja.querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
      modalCaja.querySelectorAll("[data-k]").forEach(x => x.classList.toggle("activo", x === b));
      document.getElementById("modalImg").innerHTML = placeholder(s.tono, { src: imgs[+b.dataset.k] });
    });
    modal.showModal();
    modalCaja.scrollTop = 0;
  }
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

  /* ---------- Router ---------- */
  function ruta() {
    const [, grupoId, seccionId] = (location.hash || "#/").split("/");
    const s = seccionId && todas.find(x => x.id === seccionId && x.grupo.id === grupoId);
    if (modal.open) modal.close();
    if (s) {
      filtro = "todo";
      pintarNav(grupoId);
      document.title = `${s.nombre} · ${SITIO.nombre}`;
      vistaSeccion(s);
    } else {
      const g = GRUPOS.find(x => x.id === grupoId);
      pintarNav(g ? g.id : null);
      document.title = `${SITIO.nombre} · Cuaderno personal`;
      vistaInicio(g ? g.id : null);
    }
    app.focus({ preventScroll: true });
  }

  /* ---------- Pie ---------- */
  document.getElementById("marca").textContent = SITIO.nombre;
  document.getElementById("pie").innerHTML = `
    <div><strong>${esc(SITIO.nombre)}</strong>${esc(SITIO.lema)}</div>
    <div class="pie__links">
      ${SITIO.correo ? `<a href="mailto:${esc(SITIO.correo)}">${esc(SITIO.correo)}</a>` : ""}
      ${SITIO.redes.map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("")}
    </div>`;

  window.addEventListener("hashchange", ruta);
  ruta();
})();
