<?php
// Configuración de la base de datos
$host = "localhost";
$dbname = "incident_manager";
$user = "dbuser"; // Cambia esto por tu usuario de MySQL
$password = "DBadmin_2025!"; // Cambia esto por tu contraseña de MySQL

try {
    // Crear conexión PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    // Configurar errores como excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //echo "Conexión exitosa"; // Puedes descomentar esto para pruebas
} catch (PDOException $e) {
    // Mostrar error si la conexión falla
    die("Error de conexión: " . $e->getMessage());
}
?>
