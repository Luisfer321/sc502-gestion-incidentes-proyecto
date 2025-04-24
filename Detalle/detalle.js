document.addEventListener("DOMContentLoaded", () => { 
    const formDetalle = document.getElementById("formDetalle");
    const historial = document.getElementById("historial");

    const urlParams = new URLSearchParams(window.location.search);
    const incidenteId = urlParams.get('id');

    const descripcion = document.getElementById("descripcion");
    const pasos = document.getElementById("pasos");
    const stakeholders = document.getElementById("stakeholders");
    const estado = document.getElementById("estado");
    const responsable = document.getElementById("responsable");

    // Cargar datos desde PHP
    fetch(`../detalle_incidente.php?id=${incidenteId}`)
        .then(response => response.json())
        .then(data => {
            descripcion.value = data.descripcion;
            pasos.value = data.pasos;
            stakeholders.value = data.stakeholders;
            estado.value = data.estado;
            responsable.value = data.responsable;
            mostrarHistorial(data.historial);
        });

    function mostrarHistorial(historialArray) {
        historial.innerHTML = "";
        historialArray.forEach(entry => {
            const item = document.createElement("li");
            item.className = "list-group-item";
            item.textContent = entry;
            historial.appendChild(item);
        });
    }

    formDetalle.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch('../actualizar_estado.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: incidenteId,
                estado: estado.value,
                responsable: responsable.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                alert("Cambios guardados correctamente");
                mostrarHistorial(data.historial); // actualizar si PHP devuelve historial actualizado
            } else {
                alert("Error al guardar los cambios");
            }
        });
    });
});
