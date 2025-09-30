// scriptproductoadm.js

// Obtener el panel principal
const panel = document.getElementById("panelPrincipal");

// Obtener botón de agregar producto
const btnVerUsuarios = document.getElementById("listausuario");
const btnCrearUsuario = document.getElementById("crearusuarioadm");
const btnInventario = document.getElementById("inventarioo");
const btnAgregarProducto = document.getElementById("agregarProducto");


// Array de productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarioss")) || [];
}

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

  const formProducto = document.getElementById("formAgregarProducto");
  const mensaje = document.getElementById("mensajeProducto");

  formProducto.addEventListener("submit", function(e) {
    e.preventDefault();

    // Limpiar errores previos
    ["errorCodigo","errorNombre","errorPrecio","errorStock","errorStockCritico","errorCategoria"].forEach(id => document.getElementById(id).textContent = "");

    // Leer valores
    const codigo = document.getElementById("codigoProducto").value.trim();
    const nombre = document.getElementById("nombreProducto").value.trim();
    const descripcion = document.getElementById("descripcionProducto").value.trim();
    const precio = document.getElementById("precioProducto").value;
    const stock = document.getElementById("stockProducto").value;
    const stockCritico = document.getElementById("stockCriticoProducto").value;
    const categoria = document.getElementById("categoriaProducto").value;
    const imagen = document.getElementById("imagenProducto").files[0] ? document.getElementById("imagenProducto").files[0].name : null;

    let error = false;

    if (codigo.length < 3) { document.getElementById("errorCodigo").textContent = "Código mínimo 3 caracteres"; error = true; }
    if (nombre === "") { document.getElementById("errorNombre").textContent = "Nombre obligatorio"; error = true; }
    if (precio === "" || parseFloat(precio) < 0) { document.getElementById("errorPrecio").textContent = "Precio inválido"; error = true; }
    if (stock === "" || parseInt(stock) < 0) { document.getElementById("errorStock").textContent = "Stock inválido"; error = true; }
    if (stockCritico !== "" && parseInt(stockCritico) > parseInt(stock)) { document.getElementById("errorStockCritico").textContent = "Stock crítico mayor al stock"; error = true; }
    if (categoria === "") { document.getElementById("errorCategoria").textContent = "Selecciona categoría"; error = true; }
    if(error) return;

    const producto = { codigo, nombre, descripcion, precio: parseFloat(precio), stock: parseInt(stock), stockCritico: stockCritico ? parseInt(stockCritico) : null, categoria, imagen };

    productos.push(producto);
    guardarProductos();

    mensaje.innerHTML = `<div class="alert alert-success">Producto agregado correctamente</div>`;
    formProducto.reset();
  });
}

// -----------------------------
// Mostrar Inventario (Leer)
function mostrarInventario() {
  let contenido = `
    <h2>Inventario de Productos</h2>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Código</th><th>Nombre</th><th>Descripción</th><th>Precio</th>
          <th>Stock</th><th>Stock Crítico</th><th>Categoría</th><th>Imagen</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  if(productos.length === 0){
    contenido += `<tr><td colspan="9" class="text-center">No hay productos</td></tr>`;
  } else {
    productos.forEach((prod,index)=>{
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
          <td>
            <button class="btn btn-sm btn-warning" onclick="editarProducto(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  }

  contenido += `</tbody></table>`;
  panel.innerHTML = contenido;
}

// -----------------------------
// Editar Producto
// -----------------------------
function editarProducto(index){
  const prod = productos[index];
  panel.innerHTML = `
    <h2>Editar Producto</h2>
    <form id="formEditarProducto">
      <div class="mb-3">
        <label class="form-label">Código Producto *</label>
        <input type="text" class="form-control" id="codigoProducto" value="${prod.codigo}">
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre *</label>
        <input type="text" class="form-control" id="nombreProducto" value="${prod.nombre}">
      </div>
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcionProducto">${prod.descripcion}</textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Precio *</label>
        <input type="number" class="form-control" id="precioProducto" value="${prod.precio}" step="0.01">
      </div>
      <div class="mb-3">
        <label class="form-label">Stock *</label>
        <input type="number" class="form-control" id="stockProducto" value="${prod.stock}" step="1">
      </div>
      <div class="mb-3">
        <label class="form-label">Stock Crítico</label>
        <input type="number" class="form-control" id="stockCriticoProducto" value="${prod.stockCritico || ''}" step="1">
      </div>
      <div class="mb-3">
        <label class="form-label">Categoría *</label>
        <select class="form-select" id="categoriaProducto">
          <option value="">Selecciona una categoría</option>
          <option value="hamburguesas" ${prod.categoria==="hamburguesas"?"selected":""}>Hamburguesas</option>
          <option value="bebidas" ${prod.categoria==="bebidas"?"selected":""}>Bebidas</option>
          <option value="postres" ${prod.categoria==="postres"?"selected":""}>Postres</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  `;

  document.getElementById("formEditarProducto").addEventListener("submit", function(e){
    e.preventDefault();
    productos[index] = {
      codigo: document.getElementById("codigoProducto").value.trim(),
      nombre: document.getElementById("nombreProducto").value.trim(),
      descripcion: document.getElementById("descripcionProducto").value.trim(),
      precio: parseFloat(document.getElementById("precioProducto").value),
      stock: parseInt(document.getElementById("stockProducto").value),
      stockCritico: document.getElementById("stockCriticoProducto").value ? parseInt(document.getElementById("stockCriticoProducto").value) : null,
      categoria: document.getElementById("categoriaProducto").value,
      imagen: prod.imagen
    };
    guardarProductos();
    mostrarInventario();
  });
}

// -----------------------------
// Eliminar Producto
// -----------------------------
function eliminarProducto(index){
  if(confirm("¿Seguro que quieres eliminar este producto?")){
    productos.splice(index,1);
    guardarProductos();
    mostrarInventario();
  }
}
const regiones = [
  {nombre:"Metropolitana",comunas:["Santiago","Las Condes","La Florida"]},
  {nombre:"Valparaíso",comunas:["Valparaíso","Viña del Mar","Quilpué"]},
  {nombre:"Biobío",comunas:["Concepción","Chillán","Los Ángeles"]}
];

function mostrarCrearUsuario() {
  const panel = document.getElementById("panelPrincipal");
  const opcionesRegiones = regiones.map(r => `<option value="${r.nombre}">${r.nombre}</option>`).join("");

  panel.innerHTML = `
    <h2>Crear Usuario</h2>
    <form id="formCrearUsuario">
      <div class="mb-3"><label>RUT *</label><input type="text" id="usuarioRut" class="form-control"><div class="text-danger small" id="errorRut"></div></div>
      <div class="mb-3"><label>Nombre *</label><input type="text" id="usuarioNombre" class="form-control"><div class="text-danger small" id="errorNombre"></div></div>
      <div class="mb-3"><label>Apellidos *</label><input type="text" id="usuarioApellidos" class="form-control"><div class="text-danger small" id="errorApellidos"></div></div>
      <div class="mb-3"><label>Fecha Nacimiento</label><input type="date" id="usuarioFechaNacimiento" class="form-control"></div>
      <div class="mb-3"><label>Correo *</label><input type="email" id="usuarioCorreo" class="form-control"><div class="text-danger small" id="errorCorreo"></div></div>
      <div class="mb-3"><label>Confirmar correo *</label><input type="email" id="usuarioConfirmarCorreo" class="form-control"><div class="text-danger small" id="errorConfirmarCorreo"></div></div>
      <div class="mb-3"><label>Contraseña *</label><input type="password" id="usuarioContrasena" class="form-control"><div class="text-danger small" id="errorContrasena"></div></div>
      <div class="mb-3"><label>Confirmar contraseña *</label><input type="password" id="usuarioConfirmarContrasena" class="form-control"><div class="text-danger small" id="errorConfirmarContrasena"></div></div>
      <div class="mb-3"><label>Dirección *</label><input type="text" id="usuarioDireccion" class="form-control"><div class="text-danger small" id="errorDireccion"></div></div>
      <div class="mb-3"><label>Rol *</label>
        <select id="usuarioRol" class="form-select">
          <option value="">Seleccione rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </select>
        <div class="text-danger small" id="errorRol"></div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label>Región</label>
          <select id="usuarioRegion" class="form-select"><option value="">Seleccione región</option>${opcionesRegiones}</select>
        </div>
        <div class="col">
          <label>Comuna</label>
          <select id="usuarioComuna" class="form-select"><option value="">Seleccione la comuna</option></select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Crear Usuario</button>
    </form>
    <div id="mensajeUsuario" class="mt-3"></div>
  `;

  const form = document.getElementById("formCrearUsuario");
  const mensaje = document.getElementById("mensajeUsuario");
  const selectRegion = document.getElementById("usuarioRegion");
  const selectComuna = document.getElementById("usuarioComuna");
const inputRut = document.getElementById("usuarioRut");
inputRut.addEventListener("input", function (e) {
  let valor = e.target.value;

  // 1. Quitar todo lo que no sea número o K/k
  valor = valor.replace(/[^0-9kK]/g, "");

  // 2. Limitar a máximo 10 caracteres (9 números + 1 DV)
  valor = valor.slice(0, 9);

  let cuerpo = valor;
  let dv = '';

  // 3. Si hay más de un dígito, separar DV
  if (valor.length > 1) {
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();
  }

  // 4. Formatear cuerpo con puntos cada 3 dígitos
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // 5. Unir cuerpo y DV
  let rutFormateado = cuerpo;
  if (dv) {
    rutFormateado += "-" + dv;
  }

  e.target.value = rutFormateado;
});
  // Actualizar comunas según región
  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = regiones.find(r => r.nombre === selectRegion.value);
    selectComuna.innerHTML = `<option value="">Seleccione comuna</option>` +
      (regionSeleccionada ? regionSeleccionada.comunas.map(c => `<option value="${c}">${c}</option>`).join("") : "");
  });

  // Enviar formulario
  form.addEventListener("submit", e => {
    e.preventDefault();
    ["errorRut","errorNombre","errorApellidos","errorCorreo","errorConfirmarCorreo","errorContrasena","errorConfirmarContrasena","errorDireccion","errorRol"].forEach(id => document.getElementById(id).textContent = "");

    const rut = document.getElementById("usuarioRut").value.trim();
    const nombre = document.getElementById("usuarioNombre").value.trim();
    const apellidos = document.getElementById("usuarioApellidos").value.trim();
    const fechaNacimiento = document.getElementById("usuarioFechaNacimiento").value;
    const correo = document.getElementById("usuarioCorreo").value.trim();
    const confirmarCorreo = document.getElementById("usuarioConfirmarCorreo").value.trim();
    const contrasena = document.getElementById("usuarioContrasena").value.trim();
    const confirmarContrasena = document.getElementById("usuarioConfirmarContrasena").value.trim();
    const direccion = document.getElementById("usuarioDireccion").value.trim();
    const rol = document.getElementById("usuarioRol").value;
    const region = selectRegion.value;
    const comuna = selectComuna.value;

    let error = false;
    if(!/^\d{1,2}\.\d{3}\.\d{3}-[\dKk0-9]$/.test(rut)){document.getElementById("errorRut").textContent="RUT inválido"; error=true;}
    if(!nombre || nombre.length>50){document.getElementById("errorNombre").textContent="Nombre obligatorio"; error=true;}
    if(!apellidos || apellidos.length>100){document.getElementById("errorApellidos").textContent="Apellidos obligatorios"; error=true;}
    if(!correo || !(/@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/i).test(correo)){document.getElementById("errorCorreo").textContent="Correo inválido"; error=true;}
    if(correo !== confirmarCorreo){document.getElementById("errorConfirmarCorreo").textContent="Los correos no coinciden"; error=true;}
    if(!contrasena || contrasena.length<4 || contrasena.length>10){document.getElementById("errorContrasena").textContent="Contraseña obligatoria (4-10 caracteres)"; error=true;}
    if(contrasena !== confirmarContrasena){document.getElementById("errorConfirmarContrasena").textContent="Las contraseñas no coinciden"; error=true;}
    if(!direccion || direccion.length>300){document.getElementById("errorDireccion").textContent="Dirección obligatoria"; error=true;}
    if(!rol){document.getElementById("errorRol").textContent="Debe seleccionar un rol"; error=true;}
    if(error) return;

    const usuarios = obtenerUsuarios();
    usuarios.push({rut,nombre,apellidos,fechaNacimiento,correo,contrasena,direccion,rol,region,comuna});
    localStorage.setItem("usuarioss", JSON.stringify(usuarios));

    mensaje.innerHTML = `<div class="alert alert-success">Usuario creado correctamente como ${rol}</div>`;
    form.reset();
    selectComuna.innerHTML = `<option value="">Seleccione la comuna</option>`;
  });
}

function mostrarUsuarios() {
  const panel = document.getElementById("panelPrincipal");
  const usuarios = obtenerUsuarios();
  let contenido = `
    <h2>Usuarios Registrados</h2>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>RUT</th><th>Nombre</th><th>Apellidos</th><th>Correo</th><th>Fecha Nacimiento</th><th>Rol</th><th>Región</th><th>Comuna</th><th>Dirección</th>
        </tr>
      </thead>
      <tbody>
  `;

  if(usuarios.length===0){
    contenido += `<tr><td colspan="9" class="text-center">No hay usuarios registrados</td></tr>`;
  } else {
    usuarios.forEach(u=>{
      contenido += `<tr>
        <td>${u.rut}</td>
        <td>${u.nombre}</td>
        <td>${u.apellidos}</td>
        <td>${u.correo}</td>
        <td>${u.fechaNacimiento||"-"}</td>
        <td>${u.rol}</td>
        <td>${u.region||"-"}</td>
        <td>${u.comuna||"-"}</td>
        <td>${u.direccion}</td>
      </tr>`;
    });
  }

  contenido += `</tbody></table>`;
  panel.innerHTML = contenido;
}

// -------------------------
// Eventos botones
// -------------------------
btnCrearUsuario.addEventListener("click", mostrarCrearUsuario);
btnVerUsuarios.addEventListener("click", mostrarUsuarios);
btnAgregarProducto.addEventListener("click", mostrarAgregarProducto);
btnInventario.addEventListener("click", mostrarInventario);