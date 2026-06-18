<?php
header('Content-Type: application/json');

// conexión a la base de datos
require "db.php";

// Consulta para obtener todos los protocolos de la tabla 'protocolos'
$resultado = $conexion->query("SELECT * FROM protocolos");

// Array para almacenar los datos extraídos
$protocolos = [];

// Recorremos los resultados y los guardamos en el array
while($fila = $resultado->fetch_assoc()){
    $protocolos[] = $fila;
}

// Devolvemos el array en formato JSON al frontend
echo json_encode($protocolos);