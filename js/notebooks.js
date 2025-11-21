const contenedorCat = document.getElementById("contenedor-productos");

async function cargarCategoria() {
    try {
        const res = await fetch("../data/productos.json");
        const data = await res.json();

        renderizarProductosCategoria(data.notebooks);
    } catch (error) {
        console.error("Error cargando notebooks:", error);
    }
}

function renderizarProductosCategoria(productos) {
    contenedorCat.innerHTML = "";

    productos.forEach(prod => {
        contenedorCat.innerHTML += `
        <div class="col-12 col-md-4">
            <div class="card h-100 shadow-sm">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.titulo}</h5>
                    <p class="text-muted">${prod.descripcion || ""}</p>
                    <p class="fw-bold text-primary">$${prod.precio.toLocaleString()}</p>

                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${prod.id}, -1)">-</button>
                        <span id="cantidad-${prod.id}" class="mx-2 fw-semibold">1</span>
                        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="cambiarCantidad(${prod.id}, 1)">+</button>
                    </div>

                    <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${prod.id})">
                        Agregar al carrito
                    </button>

                    <a href="../producto.html?id=${prod.id}" class="btn btn-outline-dark mt-2">
                        Ver producto
                    </a>
                </div>
            </div>
        </div>`;
    });
}

cargarCategoria();
