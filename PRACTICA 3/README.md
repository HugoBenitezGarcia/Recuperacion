Este módulo recibe una **dirección IP** desde la terminal, comprueba si es válida y realiza un **ping** para verificar si la máquina responde.

## Importar `sys` y `os`

Se usa `sys` para leer la IP introducida y `os` para ejecutar el comando `ping`.

Ejemplo:

```
python programa.py 192.168.1.1
```

## Guardar los datos

```
entrada = sys.argv[1:]
```

Guarda la IP introducida y comprueba que solo se haya escrito una.

## Separar la IP

```
bloques = ip.split('.')
```

Divide la dirección IP en sus cuatro bloques usando los puntos.

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

Comprueba que la IP tenga exactamente cuatro bloques.

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

Comprueba que cada bloque tenga un valor entre **0 y 255**.

Si no es así, muestra un mensaje de error.

## Realizar el ping

```
comando = "ping -c 1 " + ip
resultado = os.system(comando)
```

Crea el comando `ping` y lo ejecuta para comprobar si la máquina responde.

## Mostrar el resultado

Si `resultado` es `0`:

```
La máquina responde
```

Si es distinto de `0`:

```
La máquina no responde
```

## Ejemplo

Entrada:

```
python programa.py 8.8.8.8
```

Salida:

```
IP válida
La máquina responde
```