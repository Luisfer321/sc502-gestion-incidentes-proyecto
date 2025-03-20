document.addEventListener("DOMContentLoaded", function () {
  const incidents = [
    {
      name: "Fallo del Servidor",
      severity: "Alta",
      status: "Resuelto",
      dateCreated: "2025-03-05",
      dateClosed: "2025-03-10",
      engineer: "Carlos Rodríguez",
      stakeholders: "Equipo de TI, Gerencia de Operaciones",
      details:
        "El servidor principal dejó de responder debido a un error de memoria insuficiente.",
    },
    {
      name: "Problema de Inicio de Sesión",
      severity: "Media",
      status: "Cerrado",
      dateCreated: "2025-03-10",
      dateClosed: "2025-03-12",
      engineer: "Ana Fernández",
      stakeholders: "Usuarios finales, Soporte Técnico",
      details:
        "Los usuarios no podían iniciar sesión debido a un problema con la autenticación.",
    },
    {
      name: "Tiempo de Espera de API",
      severity: "Baja",
      status: "Resuelto",
      dateCreated: "2025-03-12",
      dateClosed: "2025-03-15",
      engineer: "Luis Martínez",
      stakeholders: "Desarrolladores, Clientes",
      details:
        "Los tiempos de respuesta de la API eran superiores a 5 segundos.",
    },
    {
      name: "Caída del Servicio de Correo",
      severity: "Alta",
      status: "Cerrado",
      dateCreated: "2025-02-28",
      dateClosed: "2025-03-03",
      engineer: "María López",
      stakeholders: "Departamento de Comunicación, Clientes",
      details:
        "El servidor de correo dejó de funcionar por un fallo en la configuración del DNS.",
    },
    {
      name: "Interrupción del Servidor Web",
      severity: "Alta",
      status: "Resuelto",
      dateCreated: "2025-02-22",
      dateClosed: "2025-02-25",
      engineer: "Javier Ortega",
      stakeholders: "Clientes, Departamento de Soporte",
      details:
        "El servidor web principal sufrió una caída debido a un error en la actualización de software.",
    },
    {
      name: "Fallo en el Sistema de Pagos",
      severity: "Media",
      status: "Cerrado",
      dateCreated: "2025-02-15",
      dateClosed: "2025-02-18",
      engineer: "Clara Méndez",
      stakeholders: "Usuarios, Finanzas",
      details:
        "El sistema de pagos falló intermitentemente, afectando las transacciones de los usuarios.",
    },
    {
      name: "Latencia en la Red",
      severity: "Baja",
      status: "Resuelto",
      dateCreated: "2025-02-10",
      dateClosed: "2025-02-12",
      engineer: "Pedro Sánchez",
      stakeholders: "Ingeniería, Clientes",
      details:
        "El tráfico inusualmente alto causó latencias elevadas en la red interna.",
    },
  ];

  const tableBody = document.querySelector("#historyTable");
  const statusFilter = document.getElementById("statusFilter");

  function getSeverityBadge(severity) {
    if (severity === "Alta")
      return `<span class="badge badge-alta">Alta</span>`;
    if (severity === "Media")
      return `<span class="badge badge-media">Media</span>`;
    return `<span class="badge badge-baja">Baja</span>`;
  }

  function renderTable(filteredIncidents) {
    tableBody.innerHTML = "";

    if (filteredIncidents.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center">No hay incidentes con este estado</td></tr>`;
      return;
    }

    filteredIncidents.forEach((incident, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><span class="incident-name text-primary fw-bold" data-index="${index}" style="cursor: pointer;">${
        incident.name
      }</span></td>
                <td>${getSeverityBadge(incident.severity)}</td>
                <td>${incident.status}</td>
                <td>${incident.dateClosed}</td>
                <td><button class="btn btn-primary btn-sm detail-button" data-index="${index}">Ver Detalle</button></td>
            `;
      tableBody.appendChild(row);
    });

    addClickListeners(filteredIncidents);
  }

  function filterIncidents() {
    const selectedStatus = statusFilter.value;
    let filteredIncidents =
      selectedStatus === "all"
        ? incidents
        : incidents.filter((incident) => incident.status === selectedStatus);

    renderTable(filteredIncidents);
  }

  function addClickListeners(filteredIncidents) {
    document
      .querySelectorAll(".detail-button, .incident-name")
      .forEach((element) => {
        element.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          showIncidentDetail(filteredIncidents[index]);
        });
      });
  }

  function showIncidentDetail(incident) {
    document.getElementById("incidentTitle").textContent = incident.name;
    document.getElementById("incidentDescription").textContent =
      incident.details;
    document.getElementById("incidentSeverity").textContent = incident.severity;
    document.getElementById("incidentEngineer").textContent = incident.engineer;
    document.getElementById("incidentStakeholders").textContent =
      incident.stakeholders;
    document.getElementById("incidentDateCreated").textContent =
      incident.dateCreated;
    document.getElementById("incidentDateClosed").textContent =
      incident.dateClosed;

    document.getElementById("incidentDetailCard").style.display = "block";
  }

  document.getElementById("closeDetail").addEventListener("click", function () {
    document.getElementById("incidentDetailCard").style.display = "none";
  });

  statusFilter.addEventListener("change", filterIncidents);

  filterIncidents(); // Initial render (shows all incidents)
});
