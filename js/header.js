function actualizarContador() {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contador.textContent = totalProductos;
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContador);
