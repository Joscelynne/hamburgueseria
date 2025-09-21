// scriptproductoadm.js

// Obtener el panel principal
const panel = document.getElementById("panelPrincipal");

// Obtener botón de agregar producto
const btnAgregarProducto = document.getElementById("agregarProducto");
const btnInventario = document.getElementById("inventarioo");
const btnCrearUsuario = document.getElementById("crearusuarioadm");
const btnVerUsuarios = document.getElementById("listausuario");


// Array de productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Función para mostrar el formulario de agregar producto
function mostrarAgregarProducto() {
  panel.innerHTML = `
    <h2>Agregar Producto</h2>
    <form id="formAgregarProducto">
      <div class="mb-3">
        <label for="codigoProducto" class="form-label">Código Producto *</label>
        <input type="text" class="form-control" id="codigoProducto">
        <div class="text-danger small" id="errorCodigo"></div>
      </div>

      <div class="mb-3">
        <label for="nombreProducto" class="form-label">Nombre *</label>
        <input type="text" class="form-control" id="nombreProducto">
        <div class="text-danger small" id="errorNombre"></div>
      </div>

      <div class="mb-3">
        <label for="descripcionProducto" class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcionProducto" maxlength="500"></textarea>
      </div>

      <div class="mb-3">
        <label for="precioProducto" class="form-label">Precio *</label>
        <input type="number" class="form-control" id="precioProducto" step="0.01">
        <div class="text-danger small" id="errorPrecio"></div>
      </div>

      <div class="mb-3">
        <label for="stockProducto" class="form-label">Stock *</label>
        <input type="number" class="form-control" id="stockProducto" step="1">
        <div class="text-danger small" id="errorStock"></div>
      </div>

      <div class="mb-3">
        <label for="stockCriticoProducto" class="form-label">Stock Crítico</label>
        <input type="number" class="form-control" id="stockCriticoProducto" step="1">
        <div class="text-danger small" id="errorStockCritico"></div>
      </div>

      <div class="mb-3">
        <label for="categoriaProducto" class="form-label">Categoría *</label>
        <select class="form-select" id="categoriaProducto">
          <option value="">Selecciona una categoría</option>
          <option value="hamburguesas">Hamburguesas</option>
          <option value="bebidas">Bebidas</option>
          <option value="postres">Postres</option>
        </select>
        <div class="text-danger small" id="errorCategoria"></div>
      </div>

      <div class="mb-3">
        <label for="imagenProducto" class="form-label">Imagen</label>
        <input type="file" class="form-control" id="imagenProducto" accept="image/*">
      </div>

      <button type="submit" class="btn btn-primary">Agregar Producto</button>
    </form>

    <div id="mensajeProducto" class="mt-3"></div>
  `;

  // Conectar formulario
  const formProducto = document.getElementById("formAgregarProducto");
  const mensaje = document.getElementById("mensajeProducto");

  formProducto.addEventListener("submit", function(e) {
    e.preventDefault();

    // Limpiar errores previos
    document.getElementById("errorCodigo").textContent = "";
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorPrecio").textContent = "";
    document.getElementById("errorStock").textContent = "";
    document.getElementById("errorStockCritico").textContent = "";
    document.getElementById("errorCategoria").textContent = "";

    // Leer valores
    const codigo = document.getElementById("codigoProducto").value.trim();
    const nombre = document.getElementById("nombreProducto").value.trim();
    const descripcion = document.getElementById("descripcionProducto").value.trim();
    const precio = document.getElementById("precioProducto").value;
    const stock = document.getElementById("stockProducto").value;
    const stockCritico = document.getElementById("stockCriticoProducto").value;
    const categoria = document.getElementById("categoriaProducto").value;
    const imagen = document.getElementById("imagenProducto").files[0]
      ? document.getElementById("imagenProducto").files[0].name
      : null;

    let error = false;

    // Validaciones personalizadas
    if (codigo.length < 3) {
      document.getElementById("errorCodigo").textContent = "El código debe tener al menos 3 caracteres";
      error = true;
    }
    if (nombre === "") {
      document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
      error = true;
    }
    if (precio === "" || parseFloat(precio) < 0) {
      document.getElementById("errorPrecio").textContent = "El precio debe ser mayor o igual a 0";
      error = true;
    }
    if (stock === "" || parseInt(stock) < 0) {
      document.getElementById("errorStock").textContent = "El stock debe ser mayor o igual a 0";
      error = true;
    }
    if (stockCritico !== "" && parseInt(stockCritico) > parseInt(stock)) {
      document.getElementById("errorStockCritico").textContent = "El stock crítico no puede ser mayor al stock actual";
      error = true;
    }
    if (categoria === "") {
      document.getElementById("errorCategoria").textContent = "Debe seleccionar una categoría";
      error = true;
    }

    if (error) return;

    // Guardar producto en localStorage
    const producto = { codigo, nombre, descripcion, precio: parseFloat(precio), stock: parseInt(stock), stockCritico: stockCritico ? parseInt(stockCritico) : null, categoria, imagen };

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    mensaje.innerHTML = `<div class="alert alert-success">Producto agregado correctamente</div>`;
    formProducto.reset();
  });
}

function mostrarInventario() {
  let contenido = `
    <h2>Inventario de Productos</h2>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Stock Crítico</th>
          <th>Categoría</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (productos.length === 0) {
    contenido += `<tr><td colspan="8" class="text-center">No hay productos registrados</td></tr>`;
  } else {
    productos.forEach(prod => {
      contenido += `
        <tr>
          <td>${prod.codigo}</td>
          <td>${prod.nombre}</td>
          <td>${prod.descripcion || "-"}</td>
          <td>${prod.precio.toFixed(2)}</td>
          <td>${prod.stock}</td>
          <td>${prod.stockCritico !== null ? prod.stockCritico : "-"}</td>
          <td>${prod.categoria}</td>
          <td>${prod.imagen || "-"}</td>
        </tr>
      `;
    });
  }

  contenido += `</tbody></table>`;
  panel.innerHTML = contenido;
}
const regiones = [
  { nombre: "Metropolitana", comunas: ["Santiago", "Las Condes", "La Florida"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
  { nombre: "Biobío", comunas: ["Concepción", "Chillán", "Los Ángeles"] }
];

// -----------------------------
// Función: Crear Usuario
// -----------------------------
function mostrarCrearUsuario() {
  let opcionesRegiones = regiones.map(r => `<option value="${r.nombre}">${r.nombre}</option>`).join("");

  panel.innerHTML = `
    <h2>Crear Usuario</h2>
    <form id="formCrearUsuario">
      <div class="mb-3">
        <label for="usuarioRun">Run *</label>
        <input type="text" id="usuarioRun" class="form-control">
        <div class="text-danger small" id="errorRun"></div>
      </div>
      <div class="mb-3">
        <label for="usuarioNombre">Nombre *</label>
        <input type="text" id="usuarioNombre" class="form-control">
        <div class="text-danger small" id="errorNombre"></div>
      </div>
      <div class="mb-3">
        <label for="usuarioApellidos">Apellidos *</label>
        <input type="text" id="usuarioApellidos" class="form-control">
        <div class="text-danger small" id="errorApellidos"></div>
      </div>
      <div class="mb-3">
        <label for="usuarioCorreo">Correo *</label>
        <input type="email" id="usuarioCorreo" class="form-control">
        <div class="text-danger small" id="errorCorreo"></div>
      </div>
      <div class="mb-3">
        <label for="usuarioFecha">Fecha Nacimiento</label>
        <input type="date" id="usuarioFecha" class="form-control">
      </div>
      <div class="mb-3">
        <label for="usuarioTipo">Tipo de Usuario *</label>
        <select id="usuarioTipo" class="form-select">
          <option value="">Seleccione tipo</option>
          <option value="Administrador">Administrador</option>
          <option value="Cliente">Cliente</option>
          <option value="Vendedor">Vendedor</option>
        </select>
        <div class="text-danger small" id="errorTipo"></div>
      </div>
      <div class="mb-3">
        <label for="usuarioRegion">Región</label>
        <select id="usuarioRegion" class="form-select">
          <option value="">Seleccione región</option>
          ${opcionesRegiones}
        </select>
      </div>
      <div class="mb-3">
        <label for="usuarioComuna">Comuna</label>
        <select id="usuarioComuna" class="form-select">
          <option value="">Seleccione comuna</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="usuarioDireccion">Dirección *</label>
        <input type="text" id="usuarioDireccion" class="form-control">
        <div class="text-danger small" id="errorDireccion"></div>
      </div>
      <button type="submit" class="btn btn-primary">Crear Usuario</button>
    </form>
    <div id="mensajeUsuario" class="mt-3"></div>
  `;

  const form = document.getElementById("formCrearUsuario");
  const mensaje = document.getElementById("mensajeUsuario");
  const selectRegion = document.getElementById("usuarioRegion");
  const selectComuna = document.getElementById("usuarioComuna");

  // Actualizar comunas según región
  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = regiones.find(r => r.nombre === selectRegion.value);
    if(regionSeleccionada){
      selectComuna.innerHTML = `<option value="">Seleccione comuna</option>` +
        regionSeleccionada.comunas.map(c => `<option value="${c}">${c}</option>`).join("");
    } else {
      selectComuna.innerHTML = `<option value="">Seleccione comuna</option>`;
    }
  });

  // Enviar formulario
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Limpiar errores
    ["errorRun","errorNombre","errorApellidos","errorCorreo","errorTipo","errorDireccion"].forEach(id=>document.getElementById(id).textContent="");

    // Leer valores
    const run = document.getElementById("usuarioRun").value.trim();
    const nombre = document.getElementById("usuarioNombre").value.trim();
    const apellidos = document.getElementById("usuarioApellidos").value.trim();
    const correo = document.getElementById("usuarioCorreo").value.trim();
    const fecha = document.getElementById("usuarioFecha").value;
    const tipo = document.getElementById("usuarioTipo").value;
    const region = document.getElementById("usuarioRegion").value;
    const comuna = document.getElementById("usuarioComuna").value;
    const direccion = document.getElementById("usuarioDireccion").value.trim();

    let error=false;

    // Validaciones
    if(!run || run.length<7 || run.length>9 || /[^0-9Kk]/.test(run)){
      document.getElementById("errorRun").textContent="Run inválido (ej: 19011022K)";
      error=true;
    }
    if(!nombre || nombre.length>50){document.getElementById("errorNombre").textContent="Nombre obligatorio y ≤50 caracteres"; error=true;}
    if(!apellidos || apellidos.length>100){document.getElementById("errorApellidos").textContent="Apellidos obligatorios y ≤100 caracteres"; error=true;}
    if(!correo || correo.length>100 || !(/@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/i).test(correo)){
      document.getElementById("errorCorreo").textContent="Correo inválido (solo @duoc.cl, @profesor.duoc.cl, @gmail.com)"; error=true;
    }
    if(!tipo){document.getElementById("errorTipo").textContent="Seleccione tipo de usuario"; error=true;}
    if(!direccion || direccion.length>300){document.getElementById("errorDireccion").textContent="Dirección obligatoria y ≤300 caracteres"; error=true;}

    if(error) return;

    const usuario = {run,nombre,apellidos,correo,fecha,tipo,region,comuna,direccion};
    usuarios.push(usuario);
    localStorage.setItem("usuarios",JSON.stringify(usuarios));

    mensaje.innerHTML = `<div class="alert alert-success">Usuario creado correctamente</div>`;
    form.reset();
    selectComuna.innerHTML = `<option value="">Seleccione comuna</option>`;
  });
}

// -----------------------------
// Función: Ver Usuarios
// -----------------------------
function mostrarUsuarios() {
  let contenido = `
    <h2>Usuarios Registrados</h2>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Run</th><th>Nombre</th><th>Apellidos</th><th>Correo</th><th>Fecha Nacimiento</th><th>Tipo</th><th>Región</th><th>Comuna</th><th>Dirección</th>
        </tr>
      </thead>
      <tbody>
  `;
  if(usuarios.length===0){
    contenido+=`<tr><td colspan="9" class="text-center">No hay usuarios registrados</td></tr>`;
  } else {
    usuarios.forEach(u=>{
      contenido+=`<tr>
        <td>${u.run}</td>
        <td>${u.nombre}</td>
        <td>${u.apellidos}</td>
        <td>${u.correo}</td>
        <td>${u.fecha || "-"}</td>
        <td>${u.tipo}</td>
        <td>${u.region || "-"}</td>
        <td>${u.comuna || "-"}</td>
        <td>${u.direccion}</td>
      </tr>`;
    });
  }
  contenido+=`</tbody></table>`;
  panel.innerHTML=contenido;
}

// -------------------------
// Eventos de los botones
// -------------------------
btnCrearUsuario.addEventListener("click", mostrarCrearUsuario);
btnVerUsuarios.addEventListener("click", mostrarUsuarios);
btnAgregarProducto.addEventListener("click", mostrarAgregarProducto);
btnInventario.addEventListener("click", mostrarInventario);
