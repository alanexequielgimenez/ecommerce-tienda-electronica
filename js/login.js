// LOGIN
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validación simple
  if (email === "usuario@correo.com" && password === "1234") {
    localStorage.setItem("usuarioLogueado", "true");
    window.location.href = "../index.html";
  } else {
    alert("Correo o contraseña incorrectos");
  }
});