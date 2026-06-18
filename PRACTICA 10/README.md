# PRÁCTICA 10: Despliegue de aplicación web con Docker

## Datos del alumno
- **Nombre:** Hugo Benítez García
- **Curso:** 1DAW A
- **Asignatura:** Sistemas Informáticos
- **Correo:** hbengar0801@g.educaand.es
- **Iniciales:** HBG

## Objetivo del Proyecto
Despliegue de una aplicación web completa orientada a la consulta y gestión de protocolos de red (ProtocolPedia), interconectada a una base de datos MySQL y orquestada mediante contenedores Docker.

## Requisitos Cumplidos
- [x] Entorno orquestado con **Docker** y `docker-compose`.
- [x] **Servidor Web** Apache con PHP 8.2 integrado.
- [x] **Base de datos** MySQL 8 persistente.
- [x] Sistema de **Registro de usuarios**.
- [x] **Inicio de sesión** con encriptación de contraseñas (SHA2-256).
- [x] **Persistencia de datos** mediante volúmenes para el registro de favoritos.
- [x] Soporte **HTTPS** mediante la generación de certificados SSL autofirmados.

## Instrucciones de Despliegue

1. Clonar el repositorio en local.
2. Abrir una terminal en el directorio raíz del proyecto.
3. Ejecutar el siguiente comando para construir y levantar la infraestructura:
   ```bash
   docker compose up -d --build