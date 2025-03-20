const incidents = [
  { name: 'Error al iniciar sesión', severity: 'Alta', status: 'Abierto', date: '2024-03-15' },
  { name: 'Falla en base de datos', severity: 'Alta', status: 'En proceso', date: '2024-03-12' },
  { name: 'Página no carga', severity: 'Media', status: 'Cerrado', date: '2024-02-28' },
  { name: 'Correo no enviado', severity: 'Baja', status: 'Abierto', date: '2024-03-10' },
  { name: 'Tiempo de respuesta lento', severity: 'Media', status: 'En proceso', date: '2024-03-14' },
  { name: 'Error 500 en servidor', severity: 'Alta', status: 'Cerrado', date: '2024-03-05' },
];

function loadTableData() {
  const tbody = document.getElementById('incidentTable');
  tbody.innerHTML = '';

  const search = document.getElementById('searchInput').value.toLowerCase();
  const filterSeverity = document.getElementById('filterSeverity').value;
  const filterStatus = document.getElementById('filterStatus').value;

  const filteredIncidents = incidents.filter(i => {
    return (
      i.name.toLowerCase().includes(search) &&
      (filterSeverity ? i.severity === filterSeverity : true) &&
      (filterStatus ? i.status === filterStatus : true)
    );
  });

  if (filteredIncidents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No se encontraron incidentes 🤷‍♂️</td></tr>`;
    return;
  }

  filteredIncidents.forEach((incident, index) => {
    const severityClass = incident.severity === 'Alta' ? 'badge-alta' : incident.severity === 'Media' ? 'badge-media' : 'badge-baja';
    const row = `<tr>
      <td onclick="showIncidentAlert('${incident.name}', '${incident.severity}', '${incident.status}', '${incident.date}')">${incident.name}</td>
      <td><span class="badge ${severityClass}">${incident.severity}</span></td>
      <td>${incident.status}</td>
      <td>${incident.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="confirmDeleteIncident(${index})"><i class="fa-solid fa-trash"></i></button></td>
      <td><a href="../Detalle/detalle.html?index=${index}" class="btn btn-sm btn-primary">Ver Detalle</a></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function sortTable(columnIndex) {
  incidents.sort((a, b) => {
    const valuesA = Object.values(a);
    const valuesB = Object.values(b);
    return valuesA[columnIndex].localeCompare(valuesB[columnIndex]);
  });
  loadTableData();
  showToast('Tabla ordenada por columna seleccionada ✅');
}

function showIncidentAlert(name, severity, status, date) {
  Swal.fire({
    title: `📋 ${name}`,
    html: `<strong>Severidad:</strong> ${severity} <br><strong>Estado:</strong> ${status} <br><strong>Fecha:</strong> ${date}`,
    icon: severity === 'Alta' ? 'error' : severity === 'Media' ? 'warning' : 'info',
    confirmButtonText: '¡Entendido!',
    confirmButtonColor: '#0d6efd',
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('position-fixed', 'top-0', 'start-50', 'translate-middle-x', 'm-3', 'bg-success', 'text-white', 'px-4', 'py-2', 'rounded', 'shadow');
  toast.style.transition = 'opacity 0.5s ease';
  toast.style.opacity = '1';
  toast.innerHTML = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function confirmDeleteIncident(index) {
  Swal.fire({
    title: '⚠️ ¿Seguro que quieres borrar este incidente?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '¡Sí, borrar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteIncident(index);
    }
  });
}

function deleteIncident(index) {
  incidents.splice(index, 1);
  loadTableData();
  showToast('Incidente eliminado 🗑️');
}

function addIncident() {
  Swal.fire({
    title: 'Agregar nuevo incidente',
    html: `
      <div class="swal2-content">
        <label for="incName" class="form-label">Nombre del incidente</label>
        <input id="incName" class="swal2-input form-control" placeholder="Ingrese el nombre del incidente" required>

        <label for="incSeverity" class="form-label mt-3">Severidad</label>
        <select id="incSeverity" class="swal2-select form-select">
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <label for="incStatus" class="form-label mt-3">Estado</label>
        <select id="incStatus" class="swal2-select form-select">
          <option value="Abierto">Abierto</option>
          <option value="En proceso">En proceso</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      </div>
    `,
    confirmButtonText: 'Agregar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      confirmButton: 'custom-swal-btn',
      cancelButton: 'custom-swal-btn-cancel'
    },
    preConfirm: () => {
      const name = document.getElementById('incName').value;
      const severity = document.getElementById('incSeverity').value;
      const status = document.getElementById('incStatus').value;

      if (!name) {
        Swal.showValidationMessage('El nombre es obligatorio');
        return;
      }

      const newIncident = {
        name,
        severity,
        status,
        date: new Date().toISOString().split('T')[0],
      };

      incidents.push(newIncident);
      loadTableData();
      showToast('Incidente agregado ✅');
    }
  });
}

document.getElementById('searchInput').addEventListener('input', loadTableData);
document.getElementById('filterSeverity').addEventListener('change', loadTableData);
document.getElementById('filterStatus').addEventListener('change', loadTableData);

window.onload = () => {
  loadTableData();
  showToast('¡Bienvenido al dashboard! 🎉');

  const addButton = document.createElement('button');
  addButton.className = 'btn btn-success position-fixed bottom-0 end-0 m-4 shadow';
  addButton.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar Incidente';
  addButton.onclick = addIncident;
  document.body.appendChild(addButton);

  // Organizar los botones flotantes con enlaces correctos
  const linksDiv = document.createElement('div');
  linksDiv.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-4 d-flex gap-3';
  linksDiv.innerHTML = `
    <a href="../Detalle/detalle.html?index=0" class="btn btn-outline-primary">Detalle de Incidente</a>
    <a href="../Crear-incidentes/crear.html" class="btn btn-outline-primary">Crear Incidente</a>
    <a href="../Gestion-usuarios/registro.html" class="btn btn-outline-primary">Registro de Usuarios</a>
    <a href="../Historial-gestion-incidentes/historial.html" class="btn btn-outline-primary">Historial y Seguimiento</a>
  `;
  document.body.appendChild(linksDiv);
};
