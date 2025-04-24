<?php
$conexion = new PDO("mysql:host=localhost;dbname=incident_manager", "root", "");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = $_GET['id'] ?? 0;

$stmt = $conexion->prepare("SELECT * FROM incidentes WHERE id = :id");
$stmt->bindParam(":id", $id, PDO::PARAM_INT);
$stmt->execute();

$incidente = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($incidente);
?>
