// Detecta si estás dentro de la carpeta /pages o en la raíz
const estaEnPages = window.location.pathname.includes("/pages/");

// Si estás en /pages, las rutas deben subir un nivel (../)
const prefix = estaEnPages ? "../" : "./";

const paginas = [
  { titulo: "Inicio", url: `${prefix}index.html` },
  { titulo: "Celulares", url: `${prefix}pages/categoria-celulares.html` },
  { titulo: "Notebooks", url: `${prefix}pages/categoria-notebooks.html` },
  { titulo: "Accesorios", url: `${prefix}pages/categoria-accesorios.html` },
  { titulo: `<i class="bi bi-cart3"></i> Carrito`, url: `${prefix}pages/carrito.html` },
];

function generarNavbar() {
  const navContainer = document.getElementById("navbar-dinamico");

  let linksHTML = paginas
    .map(
      (pagina) => `
      <li class="nav-item">
        <a class="nav-link" href="${pagina.url}">${pagina.titulo}</a>
      </li>
    `
    )
    .join("");

  navContainer.innerHTML = `
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      ${linksHTML}
      <li class="nav-item ms-lg-3">
        <button id="auth-btn" class="btn btn-primary rounded-pill px-4"></button>
      </li>
    </ul>
  `;

  // Cargar el script de autenticación después de generar el botón
  const script = document.createElement("script");
  script.src = `${prefix}js/auth.js`;
   script.onload = () => {
    // Cuando auth.js ya terminó y el botón está listo
    navContainer.classList.remove("navbar-invisible");
    navContainer.classList.add("navbar-visible");
  };
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", generarNavbar);