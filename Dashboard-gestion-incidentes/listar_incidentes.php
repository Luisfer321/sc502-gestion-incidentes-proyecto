<?php
require 'db.php';

header('Content-Type: application/json');

try {
    // Construir consulta con filtros
    $query = "SELECT * FROM incidentes WHERE 1=1";
    $params = [];
    
    // Filtros
    if (!empty($_GET['estado'])) {
        $query .= " AND estado = ?";
        $params[] = $_GET['estado'];
    }
    
    if (!empty($_GET['severidad'])) {
        $query .= " AND severidad = ?";
        $params[] = $_GET['severidad'];
    }
    
    if (!empty($_GET['fecha'])) {
        $query .= " AND DATE(fecha) = ?";
        $params[] = $_GET['fecha'];
    }

    // Ordenación
    $query .= " ORDER BY fecha DESC";

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    
    $incidentes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($incidentes);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener incidentes: ' . $e->getMessage()]);
}
?>