const contenedor = document.getElementById("contenedor-productos");

async function cargarProductosHome() {
    try {
        const res = await fetch("./data/productos.json");
        const data = await res.json();

        // Tomamos 2 productos por categoría
        const productosHome = [
            ...data.celulares.slice(0, 2),
            ...data.notebooks.slice(0, 2),
            ...data.accesorios.slice(0, 2)
        ];

        renderizarProductos(productosHome);
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

function renderizarProductos(productos) {
    contenedor.innerHTML = "";

    productos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-4");

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.titulo}</h5>
                    <p class="text-muted">${prod.descripcion}</p>
                    <p class="fw-bold text-primary">$${prod.precio.toLocaleString()}</p>

                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${prod.id}, -1)">-</button>
                        <span id="cantidad-${prod.id}" class="mx-2 fw-semibold">1</span>
                        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="cambiarCantidad(${prod.id}, 1)">+</button>
                    </div>

                    <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${prod.id})">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

function cambiarCantidad(id, valor) {
    const span = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(span.textContent);

    cantidad += valor;
    if (cantidad < 1) cantidad = 1;

    span.textContent = cantidad;
}

// function agregarAlCarrito(id) {
//     const cantidad = parseInt(document.getElementById(`cantidad-${id}`).textContent);
//     console.log("Producto agregado:", id, "Cantidad:", cantidad);

//     // Si querés guardar en localStorage:
//     // let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//     // carrito.push({ id, cantidad });
//     // localStorage.setItem("carrito", JSON.stringify(carrito));
// }

// ------------------------------
// Guardar producto en el carrito
// ------------------------------
async function agregarAlCarrito(id) {
    try {
        const res = await fetch("../data/productos.json");
        const data = await res.json();

        // Buscar el producto en todas las categorías
        const todasCategorias = [
            ...data.celulares,
            ...data.notebooks,
            ...data.accesorios
        ];

        const producto = todasCategorias.find(p => p.id === id);
        if (!producto) return;

        const cantidad = parseInt(document.getElementById(`cantidad-${id}`).textContent);

        let carrito = JSON.parse(localStorage.getItem("cart")) || [];

        const existe = carrito.find(item => item.id === id);

        if (existe) {
            existe.cantidad += cantidad;
        } else {
            carrito.push({
                id: producto.id,
                titulo: producto.titulo,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            });
        }

        localStorage.setItem("cart", JSON.stringify(carrito));

        alert("Producto agregado al carrito");

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
}


cargarProductosHome();
