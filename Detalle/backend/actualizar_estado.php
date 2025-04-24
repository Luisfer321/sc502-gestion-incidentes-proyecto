<?php
$conexion = new PDO("mysql:host=localhost;dbname=incident_manager", "root", "");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$estado = $data['estado'];
$responsable = $data['responsable'];

$stmt = $conexion->prepare("
    UPDATE incidentes 
    SET estado = :estado, responsable = :responsable 
    WHERE id = :id
");

$stmt->bindParam(':estado', $estado);
$stmt->bindParam(':responsable', $responsable);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
