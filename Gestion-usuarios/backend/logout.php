<?php
session_start(); // Iniciar sesión para poder destruirla
$_SESSION = []; // Limpiar variables de sesión
session_destroy(); // Cerrar sesión
http_response_code(200);
echo json_encode(["message" => "Sesión cerrada exitosamente"]);
?>
