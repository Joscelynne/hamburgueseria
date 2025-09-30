// detallepro.js

const productos = [
  { id: 1, nombre: "Classic Burger", precio: 3500, imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", descripcion: "Deliciosa hamburguesa clásica con carne jugosa." },
  { id: 2, nombre: "Cheese Burger", precio: 4000, imagen: "https://i.pinimg.com/736x/58/de/f7/58def7d7b5ee5b7a609b645cf753a0a8.jpg", descripcion: "Hamburguesa con queso derretido y pan fresco." },
  { id: 3, nombre: "Avocado Burger", precio: 5500, imagen: "https://i.pinimg.com/1200x/6e/4b/c7/6e4bc73834b74be9025011c90f4493c1.jpg", descripcion: "Hamburguesa con aguacate, fresca y saludable." },
  { id: 4, nombre: "Bacon Burger", precio: 7000, imagen: "https://i.pinimg.com/736x/04/21/07/04210725ae30e4435fff7d04c122507e.jpg", descripcion: "Bacon crujiente y carne jugosa en un solo bocado." },
  { id: 5, nombre: "Double Cheese", precio: 6700, imagen: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=400&q=80", descripcion: "Doble queso, doble sabor, doble placer." },
  { id: 6, nombre: "Veggie Burger", precio: 4500, imagen: "https://i.pinimg.com/736x/d1/22/d0/d122d0966d12e639b194870ccd74ed96.jpg", descripcion: "Hamburguesa vegetal, deliciosa y ligera." },
  { id: 7, nombre: "Mushroom Burger", precio: 5700, imagen: "https://i.pinimg.com/1200x/ce/d5/0f/ced50fab16c951a004ce4df5091aaedd.jpg", descripcion: "Hamburguesa con champiñones salteados." },
  { id: 8, nombre: "Spicy Burger", precio: 3800, imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", descripcion: "Hamburguesa picante para los amantes del sabor intenso." },
  { id: 9, nombre: "BBQ Burger", precio: 9000, imagen: "https://i.pinimg.com/736x/66/ee/7e/66ee7e45674a6c5a72fb7ef6f8eda3ac.jpg", descripcion: "Hamburguesa con salsa BBQ y cebolla caramelizada." },
  { id: 10, nombre: "Avocado Deluxe", precio: 7000, imagen: "https://i.pinimg.com/1200x/25/1d/ca/251dcab0267317bf6bb97645ca15cb1a.jpg", descripcion: "Hamburguesa deluxe con aguacate, queso y bacon." },
  { id: 11, nombre: "Bacon Deluxe", precio: 10000, imagen: "https://i.pinimg.com/1200x/d6/a6/7c/d6a67cf1e9587eb5506fc12a1ecc4ca3.jpg", descripcion: "Deluxe con mucho bacon, queso y carne premium." },
  { id: 12, nombre: "Ultimate Burger", precio: 12500, imagen: "https://i.pinimg.com/736x/81/bd/a3/81bda3d1a2cf9f92a0d7a23392475311.jpg", descripcion: "La hamburguesa definitiva, máxima indulgencia." }
];

// Obtener ID desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = parseInt(urlParams.get("id"));

// Buscar producto
const producto = productos.find(p => p.id === productoId);

if (producto) {
  document.getElementById("imagen").src = producto.imagen;
  document.getElementById("nombreProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = "$" + producto.precio.toLocaleString();
  document.getElementById("descripcionProducto").textContent = producto.descripcion;

  const imgSec = document.getElementById("imagenesSecundarias");
  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre + " " + (i+1);
    img.className = "img-thumbnail";
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.objectFit = "cover";
    imgSec.appendChild(img);
  }
} else {
  document.querySelector("main").innerHTML = "<p class='text-center fs-4'>Producto no encontrado.</p>";
}

// Botón "Añadir al carrito"
const btnAgregar = document.getElementById("agregarCarrito");

btnAgregar.addEventListener("click", () => {
  let cantidad = parseInt(document.getElementById("cantidad").value);

  if (cantidad < 1) cantidad = 1;

  // Obtener carrito del localStorage o crear uno vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si el producto ya está en el carrito
  const index = carrito.findIndex(p => p.id === producto.id);
  if (index !== -1) {
    // Si ya existe, aumentar cantidad
    carrito[index].cantidad += cantidad;
  } else {
    // Si no existe, agregar nuevo producto
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      imagen: producto.imagen
    });
  }

  // Guardar de nuevo en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Mensaje de confirmación
  alert(`${cantidad} ${producto.nombre} agregado(s) al carrito.`);
});
