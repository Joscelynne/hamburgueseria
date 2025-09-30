// productoslistado.js

const productos = [
  { id: 1, nombre: "Classic Burger", precio: 3500, imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
  { id: 2, nombre: "Cheese Burger", precio: 4000, imagen: "https://i.pinimg.com/736x/58/de/f7/58def7d7b5ee5b7a609b645cf753a0a8.jpg" },
  { id: 3, nombre: "Avocado Burger", precio: 5500, imagen: "https://i.pinimg.com/1200x/6e/4b/c7/6e4bc73834b74be9025011c90f4493c1.jpg" },
  { id: 4, nombre: "Bacon Burger", precio: 7000, imagen: "https://i.pinimg.com/736x/04/21/07/04210725ae30e4435fff7d04c122507e.jpg" },
  { id: 5, nombre: "Double Cheese", precio: 6700, imagen: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=400&q=80" },
  { id: 6, nombre: "Veggie Burger", precio: 4500, imagen: "https://i.pinimg.com/736x/d1/22/d0/d122d0966d12e639b194870ccd74ed96.jpg" },
  { id: 7, nombre: "Mushroom Burger", precio: 5700, imagen: "https://i.pinimg.com/1200x/ce/d5/0f/ced50fab16c951a004ce4df5091aaedd.jpg" },
  { id: 8, nombre: "Spicy Burger", precio: 3800, imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
  { id: 9, nombre: "BBQ Burger", precio: 9000, imagen: "https://i.pinimg.com/736x/66/ee/7e/66ee7e45674a6c5a72fb7ef6f8eda3ac.jpg" },
  { id: 10, nombre: "Avocado Deluxe", precio: 7000, imagen: "https://i.pinimg.com/1200x/25/1d/ca/251dcab0267317bf6bb97645ca15cb1a.jpg" },
  { id: 11, nombre: "Bacon Deluxe", precio: 10000, imagen: "https://i.pinimg.com/1200x/d6/a6/7c/d6a67cf1e9587eb5506fc12a1ecc4ca3.jpg" },
  { id: 12, nombre: "Ultimate Burger", precio: 12500, imagen: "https://i.pinimg.com/736x/81/bd/a3/81bda3d1a2cf9f92a0d7a23392475311.jpg" }
];

function mostrarProductos() {
  const container = document.getElementById("listadoProductos");
  container.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = `
      <a href="detalleProducto.html?id=${prod.id}" style="text-decoration:none; color:inherit;">
        <div class="card h-100 shadow-sm product-card">
          <img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%; height:180px; object-fit:cover; border-top-left-radius:15px; border-top-right-radius:15px;">
          <div class="card-body text-center bg-white">
            <h6 class="card-title">${prod.nombre}</h6>
            <p class="mb-2">$${prod.precio.toLocaleString()}</p>
            <button class="btn btn-dark btn-sm">Ver detalle</button>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
