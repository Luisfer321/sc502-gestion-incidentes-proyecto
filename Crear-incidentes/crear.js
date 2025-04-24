// crear.js

document.getElementById('incidentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario
  
    // Obtener los valores de los campos
    const title = document.getElementById('incTitle').value;
    const description = document.getElementById('incDescription').value;
    const severity = document.getElementById('incSeverity').value;
    const steps = document.getElementById('incSteps').value;
  
    // Validaciones
    let isValid = true;
  
    // Validación del título
    if (!title) {
      document.getElementById('incTitle').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('incTitle').classList.remove('is-invalid');
    }
  
    // Validación de la descripción
    if (!description) {
      document.getElementById('incDescription').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('incDescription').classList.remove('is-invalid');
    }
  
    // Validación de la severidad
    if (!severity) {
      document.getElementById('incSeverity').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('incSeverity').classList.remove('is-invalid');
    }
  
    // Validación de los pasos
    if (!steps) {
      document.getElementById('incSteps').classList.add('is-invalid');
      isValid = false;
    } else {
      document.getElementById('incSteps').classList.remove('is-invalid');
    }
  
    // Si el formulario es válido, enviamos los datos
    if (isValid) {
      const formData = {
          title: title,
          description: description,
          severity: severity,
          steps: steps
      };
  
      fetch('../backend/crear_incidente.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          if (data.success) {
              alert('Incidente registrado correctamente!');
              document.getElementById('incidentForm').reset();
              // Redirigir al dashboard después de crear
              window.location.href = '../Dashboard-gestion-incidentes/index.html';
          } else {
              const errors = Object.values(data.errors).join('\n');
              alert('Errores:\n' + errors);
          }
      })
      .catch(error => {
          console.error('Error completo:', error);
          alert('Error al enviar el formulario. Verifica la consola para más detalles.');
      });
  }
  });
  