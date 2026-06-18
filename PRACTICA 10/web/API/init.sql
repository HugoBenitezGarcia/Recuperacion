USE basedatos;

CREATE TABLE IF NOT EXISTS usuarios (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        usuario VARCHAR(50) UNIQUE,
    password VARCHAR(255)
    );

-- usuarios de prueba
INSERT IGNORE INTO usuarios (usuario, password) VALUES
('usuario', SHA2('1234', 256)),
('jose',    SHA2('5678', 256)),
('hugo',    SHA2('pepe', 256));

CREATE TABLE IF NOT EXISTS protocolos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(50),
    nombre VARCHAR(100),
    descripcion TEXT,
    puerto INT,
    );

INSERT IGNORE INTO protocolos (id, tipo, nombre, descripcion, precio, imagen) VALUES
(1, 'Aplicacion', 'HTTP', 'Protocolo de transferencia de hipertexto. No encriptado.', 80),
(2, 'Aplicacion', 'HTTPS', 'Protocolo de transferencia de hipertexto. No encriptado.', 443),
(3, 'Aplicacion', 'FTP', 'Protocolo diseñado para la transferencia eficiente de archivos.', 21),
(4, 'Aplicacion', 'SSH', 'Secure Shell, utilizado para acceso y gestión remota segura.', 22),
(5, 'Transporte', 'TCP', 'Protocolo de control de transmisión. Orientado a conexión.', NUll),
(6, 'Transporte', 'UDP', 'Protocolo de datagramas de usuario. No orientado a conexión.', NULL),
(7, 'Red',        'Protocolo de Internet que permite el enrutamiento de paquetes.', NULL),
(8, 'Aplicacion', 'DNS', 'Sistema de nombres de dominio. Traduce nombres a direcciones IP.', 53);

CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    protocolo_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);