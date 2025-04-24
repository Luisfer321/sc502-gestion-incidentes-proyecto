<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Validar y sanitizar datos
        $requiredFields = ['titulo', 'descripcion', 'severidad', 'pasos'];
        foreach ($requiredFields as $field) {
            if (empty($_POST[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "El campo $field es obligatorio"]);
                exit;
            }
        }

        // Insertar en la base de datos
        $stmt = $pdo->prepare("INSERT INTO incidentes 
            (titulo, descripcion, severidad, pasos_reproducir, fecha, estado) 
            VALUES (?, ?, ?, ?, NOW(), 'Abierto')");
        
        $stmt->execute([
            htmlspecialchars($_POST['titulo']),
            htmlspecialchars($_POST['descripcion']),
            $_POST['severidad'],
            htmlspecialchars($_POST['pasos'])
        ]);

        echo json_encode(['success' => true]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar el incidente: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>