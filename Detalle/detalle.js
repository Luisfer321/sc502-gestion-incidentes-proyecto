document.addEventListener("DOMContentLoaded", () => {
  const formDetalle = document.getElementById("formDetalle");
  const historial = document.getElementById("historial");

  // Datos iniciales (se pueden obtener desde una API o localStorage)
  const incidente = {
      descripcion: "Problema con la autenticación de usuarios.",
      pasos: "1. Abrir la aplicación\n2. Ingresar credenciales\n3. Error de autenticación",
      stakeholders: "Equipo de Desarrollo",
      responsable: "",
      estado: "Abierto",
      historial: []
  };

  // Mostrar datos iniciales
  document.getElementById("descripcion").value = incidente.descripcion;
  document.getElementById("pasos").value = incidente.pasos;
  document.getElementById("stakeholders").value = incidente.stakeholders;
  document.getElementById("estado").value = incidente.estado;

  // Cargar historial (si existe)
  function actualizarHistorial() {
      historial.innerHTML = "";
      incidente.historial.forEach(entry => {
          const item = document.createElement("li");
          item.className = "list-group-item";
          item.textContent = entry;
          historial.appendChild(item);
      });
  }

  actualizarHistorial();

  // Guardar cambios
  formDetalle.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoResponsable = document.getElementById("responsable").value;
      const nuevoEstado = document.getElementById("estado").value;

      // Solo guardar si hay cambios
      if (nuevoResponsable || nuevoEstado !== incidente.estado) {
          if (nuevoResponsable) {
              incidente.responsable = nuevoResponsable;
          }
          if (nuevoEstado !== incidente.estado) {
              incidente.historial.push(`Estado cambiado de "${incidente.estado}" a "${nuevoEstado}"`);
              incidente.estado = nuevoEstado;
          }

          // Actualizar historial
          actualizarHistorial();

          alert("Cambios guardados correctamente");
      }
  });
});