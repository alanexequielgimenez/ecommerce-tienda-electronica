// ------------------------
// Cargar carrito almacenado
// ------------------------
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ------------------------
// Guardar carrito
// ------------------------
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ------------------------
// Mostrar productos en el carrito
// ------------------------
function renderCart() {
  const cart = loadCart();
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartContainer.innerHTML = "";
  let total = 0;

  // Si el carrito está vacío
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="alert alert-info text-center">
        <i class="bi bi-cart-x fs-3"></i>
        <p class="mt-2 mb-0">Tu carrito está vacío.</p>
      </div>
    `;
    totalPriceElement.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.classList.add("card", "mb-3", "shadow-sm");
    div.innerHTML = `
      <div class="row g-0 p-2">
        <div class="col-md-2 d-flex justify-content-center align-items-center">
          <img src="${item.imagen}" class="img-fluid rounded" style="max-height: 100px;">
        </div>

        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text mb-1"><strong>Precio:</strong> $${item.precio}</p>

            <p class="card-text mb-2">
              <strong>Cantidad:</strong> 
              <button class="btn btn-outline-secondary btn-sm btn-restar" data-index="${index}">−</button>
              <span class="mx-2">${item.cantidad}</span>
              <button class="btn btn-outline-secondary btn-sm btn-sumar" data-index="${index}">+</button>
            </p>
          </div>
        </div>

        <div class="col-md-3 d-flex justify-content-center align-items-center">
          <button class="btn btn-danger btn-sm btn-remove" data-index="${index}">
            <i class="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceElement.textContent = total;
  addCartEventListeners();
}

// ------------------------
// Eventos de sumar/restar/eliminar
// ------------------------
function addCartEventListeners() {
  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cart = loadCart();
      cart[index].cantidad++;
      saveCart(cart);
      renderCart();
    });
  });

  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cart = loadCart();
      if (cart[index].cantidad > 1) {
        cart[index].cantidad--;
        saveCart(cart);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cart = loadCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    });
  });

  document.getElementById("btn-clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
  });
}

// ------------------------
renderCart();
