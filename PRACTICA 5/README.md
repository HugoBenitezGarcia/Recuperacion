Este módulo recibe una dirección IP desde la terminal, comprueba si es válida y realiza un escaneo de puertos para comprobar cuáles están abiertos.

## Importar `sys` y `socket`

Se usa `sys` para leer los datos introducidos y `socket` para comprobar el estado de los puertos.

Ejemplo:

```text
python programa.py 192.168.1.1
```

o

```text
python programa.py 192.168.1.1 -p 21,22,80
```

## Guardar los datos

```text
entrada = sys.argv[1:]
```

Guarda la IP y, opcionalmente, una lista de puertos.

## Separar la IP

```text
bloques = ip.split('.')
```

Divide la IP en cuatro bloques usando los puntos.

Ejemplo:

```text
192.168.1.1
```

se convierte en:

```text
["192", "168", "1", "1"]
```

## Comprobar que tiene 4 bloques

```text
if len(bloques) == 4:
```

Comprueba que la IP tenga cuatro bloques.

## Convertir los bloques a números

```text
o1 = int(bloques[0])
o2 = int(bloques[1])
o3 = int(bloques[2])
o4 = int(bloques[3])
```

Convierte cada bloque a un número para poder comprobarlo.

## Comprobar si la IP es válida

```text
if 0 <= o1 <= 255 and ...
```

Comprueba que cada bloque tenga un valor entre 0 y 255.

Si no es así, muestra un mensaje de error.

## Definir los puertos a analizar

Si no se indican puertos, el programa utiliza:

```text
[21, 22, 80, 443, 8080]
```

Si se usa la opción `-p`:

```text
python programa.py 192.168.1.1 -p 21,22,80
```

el programa analiza únicamente esos puertos.

## Comprobar los puertos

```text
s.connect_ex((ip, puerto))
```

Intenta conectarse a cada puerto de la IP.

Si la conexión tiene éxito, el puerto está abierto.

## Mostrar el resultado

Si un puerto está abierto:

```text
Puerto 80 ABIERTO
```

Si está cerrado:

```text
Puerto 80 CERRADO
```

## Mostrar el resumen

Al finalizar el escaneo, muestra el número de puertos abiertos encontrados.

Ejemplo:

```text
Resumen: 2 puertos abiertos de 5 analizados.
```

## Ejemplo

Entrada:

```text
python programa.py 192.168.1.1
```

Salida:

```text
Escaneando 192.168.1.1
Puerto 21 CERRADO
Puerto 22 ABIERTO
Puerto 80 ABIERTO
Puerto 443 CERRADO
Puerto 8080 CERRADO
Resumen: 2 puertos abiertos de 5 analizados.
```
