<?php
header('Content-Type: application/json');
require "db.php";

$data    = json_decode(file_get_contents("php://input"), true);
$usuario = trim($data["usuario"] ?? "");

if ($usuario === "") {
    echo json_encode(["ok" => false, "msg" => "Usuario no indicado"]);
    exit;
}

// Relacionar tablas, favoritos -> usuarios -> protocolos
$stmt = $conexion->prepare("
    SELECT p.nombre, p.capa, p.puerto, f.fecha
    FROM favoritos f
    JOIN usuarios u   ON f.usuario_id = u.id
    JOIN protocolos p ON f.protocolo_id = p.id
    WHERE u.usuario = ?
    ORDER BY f.fecha DESC
");
$stmt->bind_param("s", $usuario);           // Filtrar por el nombre del usuario
$stmt->execute();
$resultado = $stmt->get_result();

$favoritos = [];
while ($fila = $resultado->fetch_assoc()) {
    $favoritos[] = $fila;
}

echo json_encode(["ok" => true, "favoritos" => $favoritos]);