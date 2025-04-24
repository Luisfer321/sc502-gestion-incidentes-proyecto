<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once 'db.php';

try {
    $query = "SELECT 
                id,
                titulo AS title,
                descripcion AS description,
                severidad AS severity,
                pasos AS steps,
                fecha_creacion AS created_at,
                estado AS status
              FROM incidentes
              ORDER BY fecha_creacion DESC";
    
    $stmt = $pdo->query($query);
    $incidents = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Verifica si hay datos
    if (empty($incidents)) {
        echo json_encode([]);
        exit;
    }
    
    echo json_encode($incidents);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al obtener incidentes',
        'details' => $e->getMessage()
    ]);
}
?>