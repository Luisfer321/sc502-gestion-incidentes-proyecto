<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require_once 'db.php';

$response = ['success' => false, 'errors' => []];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $severity = trim($_POST['severity'] ?? '');
    $steps = trim($_POST['steps'] ?? '');

    // Validaciones
    if (empty($title)) {
        $response['errors']['title'] = 'El título es obligatorio';
    }
    if (empty($description)) {
        $response['errors']['description'] = 'La descripción es obligatoria';
    }
    if (!in_array($severity, ['Alta', 'Media', 'Baja'])) {
        $response['errors']['severity'] = 'Severidad inválida';
    }
    if (empty($steps)) {
        $response['errors']['steps'] = 'Pasos para reproducir son obligatorios';
    }

    if (empty($response['errors'])) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO incidentes 
                (titulo, descripcion, severidad, pasos, fecha_creacion, estado) 
                VALUES (:title, :desc, :severity, :steps, NOW(), 'Abierto')
            ");
            
            $stmt->execute([
                ':title' => $title,
                ':desc' => $description,
                ':severity' => $severity,
                ':steps' => $steps
            ]);
            
            $response['success'] = true;
            $response['message'] = 'Incidente creado exitosamente';
        } catch (PDOException $e) {
            $response['errors']['database'] = 'Error al guardar: ' . $e->getMessage();
        }
    }
} else {
    $response['errors']['method'] = 'Método no permitido';
}

echo json_encode($response);
?>