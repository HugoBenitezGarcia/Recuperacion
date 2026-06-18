USE basedatos;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE,
    password VARCHAR(255)
    );

INSERT IGNORE INTO usuarios (usuario, password) VALUES
('usuario', SHA2('1234', 256)),
('jose',    SHA2('5678', 256)),
('hugo',    SHA2('pepe', 256));

CREATE TABLE IF NOT EXISTS protocolos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(50),
    nombre VARCHAR(100),
    descripcion TEXT,
    puerto INT
    );

INSERT IGNORE INTO protocolos (id, capa, nombre, descripcion, puerto) VALUES
(1, 'Aplicacion', 'HTTP', 'Protocolo de transferencia de hipertexto.', 80),
(2, 'Aplicacion', 'HTTPS', 'Protocolo de transferencia de hipertexto seguro.', 443),
(3, 'Aplicacion', 'FTP', 'Transferencia eficiente de archivos.', 21),
(4, 'Aplicacion', 'SSH', 'Acceso y gestión remota segura.', 22),
(5, 'Transporte', 'TCP', 'Control de transmisión. Orientado a conexión.', NULL),
(6, 'Transporte', 'UDP', 'Datagramas de usuario. No orientado a conexión.', NULL),
(7, 'Red', 'IP', 'Protocolo de Internet para enrutamiento de paquetes.', NULL),
(8, 'Aplicacion', 'DNS', 'Sistema de nombres de dominio.', 53);

CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    protocolo_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);