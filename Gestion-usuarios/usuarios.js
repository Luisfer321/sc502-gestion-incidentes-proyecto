// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Registro de usuario con envío al backend
    document
      .getElementById("registroForm")
      ?.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const rol = document.getElementById("rol").value;
  
        // Enviar datos al backend
        const res = await fetch("./backend/register.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `email=${encodeURIComponent(
            correo
          )}&password=${encodeURIComponent(
            contrasena
          )}&username=${encodeURIComponent(nombre)}&role=${encodeURIComponent(rol)}`
        });
  
        const data = await res.json();
  
        // Mostrar mensaje al usuario
        alert(data.message || data.error);
  
        // Redirigir si el registro fue exitoso
        if (res.ok) {
          window.location.href = "login.html";
        }
      });
  
    // Login de usuario con validación en backend
    document
      .getElementById("loginForm")
      ?.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const correo = document.getElementById("loginCorreo").value;
        const contrasena = document.getElementById("loginContrasena").value;
  
        const res = await fetch("./backend/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `email=${encodeURIComponent(correo)}&password=${encodeURIComponent(contrasena)}`
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("🎉 Login exitoso");
          window.location.href = "../Dashboard-gestion-incidentes/index.html";
        } else {
          alert(data.error);
        }
      });
  });
  