<?php
// Activar reporte de errores para debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require('../../backend/db.php'); // Conexión a la base de datos

// Función para registrar un nuevo usuario
function registerUser($username, $email, $password, $role)
{
    global $pdo;

    try {
        // Encriptar la contraseña del usuario
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insertar nuevo usuario con todos los campos
        $sql = "INSERT INTO users (username, email, password, role)
                VALUES (:username, :email, :password, :role)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword,
            'role' => $role
        ]);

        return true;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Excepción: " . $e->getMessage()]);
        exit;
    }
}

// Validar método de solicitud
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Asegurarse de que todos los campos existan
    if (isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['role'])) {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        // Mapear roles del frontend a los valores válidos en la base de datos
        $roleMap = [
            "Administrador" => "admin",
            "Ingeniero" => "tecnico",
            "Usuario Regular" => "operador"
        ];

        $role = $roleMap[$_POST['role']] ?? "operador"; // Asignar 'operador' si el valor no es válido


        if (registerUser($username, $email, $password, $role)) {
            http_response_code(200);
            echo json_encode(["message" => "Usuario registrado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo registrar el usuario"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Todos los campos son requeridos"]);
    }
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(["error" => "Método no permitido"]);
}
?>