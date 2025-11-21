const authBtn = document.getElementById("auth-btn");

function actualizarBotonAuth() {
  const logueado = sessionStorage.getItem("usuarioLogueado");

  const enSubcarpeta = window.location.pathname.includes("/pages/");
  const basePath = enSubcarpeta ? "../" : "./";

  if (logueado) {
    authBtn.textContent = "Cerrar sesión";
    authBtn.classList.remove("btn-primary");
    authBtn.classList.add("btn-outline-danger");

    authBtn.onclick = () => {
      sessionStorage.removeItem("usuarioLogueado");
      window.location.href = `${basePath}pages/login.html`;
    };
  } else {
    authBtn.textContent = "Login";
    authBtn.classList.remove("btn-outline-danger");
    authBtn.classList.add("btn-primary");

    authBtn.onclick = () => {
      window.location.href = `${basePath}pages/login.html`;
    };
  }
}

if (authBtn) {
  actualizarBotonAuth();
}
