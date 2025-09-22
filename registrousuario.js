// scriptRegistro.js

// Definir regiones y comunas
const regiones = [
  { nombre: "Metropolitana", comunas: ["Santiago", "Las Condes", "La Florida"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
  { nombre: "Biobío", comunas: ["Concepción", "Chillán", "Los Ángeles"] }
];

// Obtener elementos
const formRegistro = document.querySelector("form");
const mensaje = document.createElement("div");
formRegistro.appendChild(mensaje);

const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

// Llenar regiones
regiones.forEach(r => {
  const option = document.createElement("option");
  option.value = r.nombre;
  option.textContent = r.nombre;
  selectRegion.appendChild(option);
});

// Cambiar comunas según región
selectRegion.addEventListener("change", () => {
  const regionSeleccionada = regiones.find(r => r.nombre === selectRegion.value);
  selectComuna.innerHTML = `<option value="">Seleccione la comuna</option>`;
  if(regionSeleccionada){
    regionSeleccionada.comunas.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      selectComuna.appendChild(opt);
    });
  }
});

// Obtener usuarios desde localStorage
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarioss")) || [];
}

// Evento submit
formRegistro.addEventListener("submit", e => {
  e.preventDefault();

  // Limpiar errores
  ["error-rut","error-nombre","error-apellidos","error-correo","error-confirmarCorreo","error-contrasena","error-confirmarContrasena","error-direccion"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
  mensaje.innerHTML = "";

  // Leer valores
  const rut = document.getElementById("rut").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const correo = document.getElementById("correo").value.trim();
  const confirmarCorreo = document.getElementById("confirmarCorreo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const confirmarContrasena = document.getElementById("confirmarContrasena").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const region = selectRegion.value;
  const comuna = selectComuna.value;

  let error = false;

  // Validaciones
  if(!rut || rut.length<7 || rut.length>9 || /[^0-9Kk]/.test(rut)){document.getElementById("error-rut").textContent="RUT inválido"; error=true;}
  if(!nombre || nombre.length>50){document.getElementById("error-nombre").textContent="Nombre obligatorio y ≤50 caracteres"; error=true;}
  if(!apellidos || apellidos.length>100){document.getElementById("error-apellidos").textContent="Apellidos obligatorios y ≤100 caracteres"; error=true;}
  if(!correo || !(/@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/i).test(correo)){document.getElementById("error-correo").textContent="Correo inválido"; error=true;}
  if(correo !== confirmarCorreo){document.getElementById("error-confirmarCorreo").textContent="Los correos no coinciden"; error=true;}
  if(!contrasena || contrasena.length<4 || contrasena.length>10){document.getElementById("error-contrasena").textContent="Contraseña obligatoria (4-10 caracteres)"; error=true;}
  if(contrasena !== confirmarContrasena){document.getElementById("error-confirmarContrasena").textContent="Las contraseñas no coinciden"; error=true;}
  if(!direccion || direccion.length>300){document.getElementById("error-direccion").textContent="Dirección obligatoria y ≤300 caracteres"; error=true;}

  if(error) return;

  // Guardar usuario
  const usuarios = obtenerUsuarios();
  const nuevoUsuario = {
    rut,
    nombre,
    apellidos,
    fechaNacimiento,
    correo,
    contrasena,
    direccion,
    rol: "Cliente", // Rol por defecto
    region,
    comuna
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarioss", JSON.stringify(usuarios));

  mensaje.innerHTML = `<div class="alert alert-success mt-3">Usuario registrado correctamente</div>`;
  formRegistro.reset();
  selectComuna.innerHTML = `<option value="">Seleccione la comuna</option>`;
});
