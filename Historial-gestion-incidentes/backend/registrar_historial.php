<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $archivo = 'historial.json';
    $nuevoRegistro = [
        "id" => uniqid(),
        "incidente" => $_POST['incidente'],
        "estado_anterior" => $_POST['estado_anterior'],
        "estado_nuevo" => $_POST['estado_nuevo'],
        "responsable" => $_POST['responsable'],
        "fecha" => date('Y-m-d H:i:s')
    ];

    $historial = [];

    if (file_exists($archivo)) {
        $historial = json_decode(file_get_contents($archivo), true);
    }

    $historial[] = $nuevoRegistro;
    file_put_contents($archivo, json_encode($historial, JSON_PRETTY_PRINT));

    echo json_encode(["status" => "ok", "mensaje" => "Historial registrado"]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Método no permitido"]);
}
?>