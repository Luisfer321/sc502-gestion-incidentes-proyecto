<?php
header('Content-Type: application/json');
$archivo = 'historial.json';

if (file_exists($archivo)) {
    echo file_get_contents($archivo);
} else {
    echo json_encode([]);
}
?>