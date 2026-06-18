USE basedatos;

CREATE TABLE IF NOT EXISTS clientes (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        usuario VARCHAR(50) UNIQUE,
    password VARCHAR(255)
    );

-- usuarios de prueba
INSERT IGNORE INTO clientes (usuario, password) VALUES
('usuario', SHA2('1234', 256)),
('jose',    SHA2('5678', 256)),
('hugo',    SHA2('pepe', 256));

CREATE TABLE IF NOT EXISTS productos (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         tipo VARCHAR(50),
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2),
    imagen TEXT
    );

INSERT IGNORE INTO productos (id, tipo, nombre, descripcion, precio, imagen) VALUES
(1, 'Aplicacion', 'HTTP', 'Protocolo de transferencia de hipertexto (Puerto 80). Básico para la web.', 10.00, 'https://cdn-icons-png.flaticon.com/512/8100/8100069.png'),
(2, 'Aplicacion', 'HTTPS', 'Versión segura de HTTP con cifrado SSL/TLS (Puerto 443).', 15.00, 'https://cdn-icons-png.flaticon.com/512/8100/8100074.png'),
(3, 'Aplicacion', 'FTP', 'Protocolo de transferencia de archivos (Puertos 20 y 21).', 12.00, 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png'),
(4, 'Aplicacion', 'SSH', 'Secure Shell para acceso remoto seguro y encriptado (Puerto 22).', 18.00, 'https://cdn-icons-png.flaticon.com/512/3200/3200706.png'),
(5, 'Transporte', 'TCP', 'Protocolo de control de transmisión. Orientado a conexión y fiable.', 20.00, 'https://cdn-icons-png.flaticon.com/512/2215/2215906.png'),
(6, 'Transporte', 'UDP', 'Protocolo de datagramas de usuario. Rápido pero sin conexión.', 15.00, 'https://cdn-icons-png.flaticon.com/512/8100/8100140.png'),
(7, 'Red', 'IPv4', 'Protocolo de Internet base para el enrutamiento de paquetes.', 25.00, 'https://cdn-icons-png.flaticon.com/512/2620/2620698.png'),
(8, 'Aplicacion', 'DNS', 'Sistema de nombres de dominio. Traduce IPs a nombres (Puerto 53).', 14.00, 'https://cdn-icons-png.flaticon.com/512/1792/1792155.png');

CREATE TABLE IF NOT EXISTS compras (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       cliente_id INT,
                                       producto_id INT,
                                       cantidad INT,
                                       fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);