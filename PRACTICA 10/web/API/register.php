<?php
header('Content-Type: application/json');
require "db.php";

$data     = json_decode(file_get_contents("php://input"), true);
$usuario  = trim($data["usuario"]  ?? "");      // Nombre del nuevo usuario
$password = trim($data["password"] ?? "");      // Contraseña elegida

if ($usuario === "" || $password === "") {
    echo json_encode(["ok" => false, "msg" => "Campos vacíos"]);
    exit;
}

if (strlen($usuario) < 3) {
    echo json_encode(["ok" => false, "msg" => "El usuario debe tener al menos 3 caracteres"]);
    exit;
}

if (strlen($password) < 4) {
    echo json_encode(["ok" => false, "msg" => "La contraseña debe tener al menos 4 caracteres"]);
    exit;
}

// Comprobamos si el nombre de usuario ya existe en la tabla
$check = $conexion->prepare("SELECT id FROM usuarios WHERE usuario = ?");
$check->bind_param("s", $usuario);
$check->execute();

// Si la consulta devuelve alguna fila, el usuario ya está cogido
if ($check->get_result()->num_rows > 0) {
    echo json_encode(["ok" => false, "msg" => "Ese nombre de usuario ya está en uso"]);
    exit;
}

// Consulta preparada para insertar el nuevo usuario cifrando su contraseña
$stmt = $conexion->prepare(
    "INSERT INTO usuarios (usuario, password) VALUES (?, SHA2(?, 256))"
);
$stmt->bind_param("ss", $usuario, $password);   // Vinculamos usuario y contraseña

// Ejecutamos la inserción
if ($stmt->execute()) {
    echo json_encode(["ok" => true]);        
} else {
    echo json_encode(["ok" => false, "msg" => "Error al registrar en la base de datos"]);
}