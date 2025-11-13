const productos = [
  {
    id: 1,
    nombre: "Smartphone Samsung",
    descripcion: "Pantalla AMOLED, cámara de alta resolución y gran batería.",
    precio: 250000,
    imagen: "./images/celularSamsung.avif"
  },
  {
    id: 2,
    nombre: "Notebook Lenovo",
    descripcion: "Rendimiento rápido y diseño liviano para uso diario.",
    precio: 800000,
    imagen: "./images/notebook.webp"
  },
  {
    id: 3,
    nombre: "Auriculares Bluetooth",
    descripcion: "Sonido envolvente y conexión inalámbrica estable.",
    precio: 50000,
    imagen: "./images/auricularBlanco.webp"
  }
];

function generarCards() {
  const contenedor = document.getElementById("contenedor-productos");

  contenedor.innerHTML = productos
    .map(
      (producto) => `
      <div class="col-12 col-md-4">
        <div class="card h-100 shadow-sm border-0">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="text-muted">${producto.descripcion}</p>
            <p class="fs-5 fw-semibold text-primary">$${producto.precio.toLocaleString()}</p>

            <div class="d-flex justify-content-center align-items-center gap-3">
              <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
              <span id="cantidad-${producto.id}">0</span>
              <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function cambiarCantidad(id, cambio) {
  const cantidadElemento = document.getElementById(`cantidad-${id}`);
  let cantidadActual = parseInt(cantidadElemento.textContent);
  cantidadActual = Math.max(0, cantidadActual + cambio);
  cantidadElemento.textContent = cantidadActual;
}

generarCards();