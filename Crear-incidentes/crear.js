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
      const newIncident = {
        title,
        description,
        severity,
        steps,
        date: new Date().toISOString().split('T')[0],
      };
  
      // Aquí puedes agregar el código para manejar el nuevo incidente, por ejemplo, enviarlo a un servidor o agregarlo a una lista.
      console.log('Nuevo incidente:', newIncident);
  
      // Limpiar el formulario
      document.getElementById('incidentForm').reset();
  
      // Mostrar un mensaje de éxito
      alert('Incidente registrado correctamente!');
    }
  });
  