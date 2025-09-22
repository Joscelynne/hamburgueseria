// scriptLogin.js

// Obtener elementos del DOM
const formLogin = document.querySelector("form");
const inputCorreo = document.getElementById("correo");
const inputContrasena = document.getElementById("contrasena");

// Crear un contenedor para mostrar mensajes
const mensaje = document.createElement("div");
formLogin.appendChild(mensaje);

// Obtener usuarios guardados en localStorage
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarioss")) || [];
}

// Evento submit del formulario
formLogin.addEventListener("submit", e => {
  e.preventDefault();

  // Limpiar mensajes anteriores
  mensaje.innerHTML = "";

  const correo = inputCorreo.value.trim();
  const contrasena = inputContrasena.value.trim();

  if (!correo || !contrasena) {
    mensaje.innerHTML = `<div class="alert alert-danger mt-2">Debe ingresar correo y contraseña</div>`;
    return;
  }

  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

  if (usuario) {
    // Guardar usuario activo en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    mensaje.innerHTML = `<div class="alert alert-success mt-2">Bienvenido ${usuario.nombre} ${usuario.apellidos}</div>`;

    // Redirigir según rol
    setTimeout(() => {
      if (usuario.rol === "Administrador") {
        window.location.href = "paneladmin.html";
      } else {
        window.location.href = "index.html"; // página principal para clientes
      }
    }, 1000);
  } else {
    mensaje.innerHTML = `<div class="alert alert-danger mt-2">Correo o contraseña incorrectos</div>`;
  }
});
