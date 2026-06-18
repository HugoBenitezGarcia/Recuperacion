FROM php:8.2-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

# Generamos un certificado SSL autofirmado
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/ssl-cert-snakeoil.key \
    -out /etc/ssl/certs/ssl-cert-snakeoil.pem \
    -subj "/C=ES/ST=Andalucia/O=ProtocolPedia/CN=localhost"

# Activamos el módulo de seguridad de Apache y el virtual host por defecto para HTTPS
RUN a2enmod ssl
RUN a2ensite default-ssl