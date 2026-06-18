<?php
ini_set('display_errors', 0);
error_reporting(0);

// Conexión a la base de datos
$conexion = new mysqli(
    "db",           // Nombre del servicio en docker-compose.yml
    "usuario",      // USER
    "password",     // Contraseña
    "basedatos"     // DATABASE
);

// Comprobación de la conexión
if ($conexion->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(["ok" => false, "msg" => "Error de conexión con la base de datos"]);
    exit;
}