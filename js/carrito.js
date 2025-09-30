const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaCarrito = document.getElementById("lista-carrito");
const resumenCarrito = document.getElementById("resumen-carrito");
const botonPagar = document.getElementById("botonPagar");
const inputCupon = document.getElementById("cupon");

// === Función que dibuja el carrito ===
function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p class='text-muted'>Tu carrito está vacío</p>";
  } else {
    carrito.forEach((item, index) => {
      total += item.precio * item.cantidad;

      const div = document.createElement("div");
      div.className = "d-flex align-items-center mb-3 border-bottom pb-2";

      div.innerHTML = `
        <div style="width:20%;">
          <img src="${item.imagen}" class="img-fluid rounded" alt="${item.nombre}">
        </div>
        <div class="flex-grow-1 ms-3">
          <h6>${item.nombre}</h6>
          <p>$${item.precio.toLocaleString()} x 
            <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="cantidadInput" style="width:60px;">
          </p>
        </div>
        <div>
          <p class="fw-bold">Total: $${(item.precio * item.cantidad).toLocaleString()}</p>
          <button class="btn btn-danger btn-sm eliminarBtn" data-index="${index}">Eliminar</button>
        </div>
      `;
      listaCarrito.appendChild(div);
    });
  }

  // Actualizar total
  resumenCarrito.querySelector("h4").textContent = "TOTAL: $" + total.toLocaleString();

  // Botones eliminar
  document.querySelectorAll(".eliminarBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });
  });

  // Cambiar cantidad
  document.querySelectorAll(".cantidadInput").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      let nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad < 1) nuevaCantidad = 1;
      carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });
  });
}

botonPagar.addEventListener("click", (e) => {
  e.preventDefault();

  let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  let descuento = 0;
  let mensajeDescuento = "";
  if (inputCupon.value.trim().toUpperCase() === "DESCUENTO10") {
    descuento = 0.10;
    mensajeDescuento = `<p class="text-success mb-1">✔ Se aplicó un 10% de descuento</p>`;
  } else if (inputCupon.value.trim() !== "") {
    mensajeDescuento = `<p class="text-danger mb-1">✘ Cupón inválido</p>`;
  }

  const totalFinal = total - (total * descuento);

  // Mostrar tarjeta de éxito con Bootstrap
  resumenCarrito.innerHTML = `
    <div class="card border-success shadow-sm mt-3">
      <div class="card-body text-center">
        <h4 class="text-success fw-bold">Compra realizada con éxito</h4>
        ${mensajeDescuento}
        <p class="mb-1">Total original: <span class="text-decoration-line-through text-muted">$${total.toLocaleString()}</span></p>
        <p class="fw-bold fs-5">Total pagado: $${totalFinal.toLocaleString()}</p>
      </div>
    </div>
  `;

  // Vaciar carrito
  carrito.length = 0;
  localStorage.removeItem("carrito");

  // Volver a renderizar vacío
   
});
  renderCarrito();