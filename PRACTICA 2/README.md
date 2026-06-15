Este módulo recibe una dirección IP desde la terminal, comprueba si es válida y muestra a qué **clase (A, B, C, D o E)** pertenece.

## Importar `sys`

Se usa para leer la IP que se escribe al ejecutar el programa.

Ejemplo:

```
python programa.py 192.168.1.1
```

## Guardar los datos

```
entrada = sys.argv[1:]
```

Guarda la IP y comprueba que solo haya una.

## Separar la IP

```
bloques = ip.split('.')
```

Divide la IP en cuatro bloques usando los puntos.

Ejemplo:

```
192.168.1.1
```

se convierte en:

```
["192", "168", "1", "1"]
```

## Comprobar que tiene 4 bloques

```
if len(bloques) == 4:
```

Comprueba que la IP tenga cuatro bloques.

## Convertir los bloques a números

```
o1 = int(bloques[0])
o2 = int(bloques[1])
o3 = int(bloques[2])
o4 = int(bloques[3])
```

Convierte cada bloque a un número para poder comprobarlo.

## Comprobar si la IP es válida

```
if 0 <= o1 <= 255 and ...
```

Comprueba que cada bloque tenga un valor entre 0 y 255.

Si no es así, muestra un mensaje de error.

## Identificar la clase

Según el valor del primer bloque `o1`, el programa indica la clase de la IP:

- 1 - 126: Clase A
- 128 - 191: Clase B
- 192 - 223: Clase C
- 224 - 239: Clase D
- 240 - 254: Clase E

## Ejemplo

Entrada:

```
python programa.py 192.168.1.1
```

Salida:

```
IP válida
Clase: C
```