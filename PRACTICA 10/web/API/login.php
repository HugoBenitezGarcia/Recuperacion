<?php
header('Content-Type: application/json');

require "db.php";

// datos enviados por el frontend
$data     = json_decode(file_get_contents("php://input"), true);
$usuario  = trim($data["usuario"]  ?? "");
$password = trim($data["password"] ?? "");

// Comprobación de seguridad para evitar que este vacio
if ($usuario === "" || $password === "") {
    echo json_encode(["ok" => false, "msg" => "Campos vacíos"]);
    exit;
}

// validar con SHA2-256 en la tabla usuarios
$stmt = $conexion->prepare(
    "SELECT id FROM usuarios WHERE usuario = ? AND password = SHA2(?, 256)"
);
$stmt->bind_param("ss", $usuario, $password);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "msg" => "Credenciales incorrectas"]); // Fallo
}