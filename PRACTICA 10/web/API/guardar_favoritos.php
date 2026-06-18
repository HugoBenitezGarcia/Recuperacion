<?php
header('Content-Type: application/json');
require "db.php";

$data      = json_decode(file_get_contents("php://input"), true);
$usuario   = $data["usuario"]   ?? "";
$favoritos = $data["favoritos"] ?? [];

// Obtener ID del usuario actual
$stmt = $conexion->prepare("SELECT id FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$cliente = $stmt->get_result()->fetch_assoc();

if (!$cliente) {
    echo json_encode(["ok" => false, "msg" => "Usuario no encontrado"]);
    exit;
}

$usuario_id = $cliente["id"];

// Preparar inserción múltiple
$insert = $conexion->prepare(
    "INSERT INTO favoritos (usuario_id, protocolo_id) VALUES (?, ?)"
);

// Ejecutar inserción por cada protocolo recibido
foreach ($favoritos as $item) {
    $insert->bind_param("ii", $usuario_id, $item["id"]);
    $insert->execute();
}

echo json_encode(["ok" => true]);