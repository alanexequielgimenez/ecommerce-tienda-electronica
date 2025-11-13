const authBtn = document.getElementById("auth-btn");

function actualizarBotonAuth() {
  const logueado = localStorage.getItem("usuarioLogueado");

  // Detectar si estamos dentro de /pages/
  const enSubcarpeta = window.location.pathname.includes("/pages/");
  const basePath = enSubcarpeta ? "../" : "./";

  if (logueado) {
    // Si está logueado → mostrar "Cerrar sesión"
    authBtn.textContent = "Cerrar sesión";
    authBtn.classList.remove("btn-primary");
    authBtn.classList.add("btn-outline-danger");

    authBtn.onclick = () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = `${basePath}pages/login.html`;
    };
  } else {
    // Si NO está logueado → mostrar "Login"
    authBtn.textContent = "Login";
    authBtn.classList.remove("btn-outline-danger");
    authBtn.classList.add("btn-primary");

    authBtn.onclick = () => {
      window.location.href = `${basePath}pages/login.html`;
    };
  }
}

// Ejecutamos cuando carga la página
if (authBtn) {
  actualizarBotonAuth();
}