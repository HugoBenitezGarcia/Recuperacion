<?php
header('Content-Type: application/json');

// conexión a la base de datos
require "db.php";

// Consulta para obtener todos los protocolos
$resultado = $conexion->query("SELECT * FROM protocolos");

// Array para almacenar los datos
$protocolos = [];

// Recorremos los resultados y los guardamos
while($fila = $resultado->fetch_assoc()){
    $protocolos[] = $fila;
}

// Devolvemos el array en formato JSON
echo json_encode($protocolos);