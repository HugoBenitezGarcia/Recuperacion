Este módulo recibe una dirección IP desde la terminal, comprueba si es válida, verifica si la máquina responde realizando un ping y, si responde, busca su dirección MAC.

## Importar `sys` y `os`

Se usa `sys` para leer la IP que se escribe al ejecutar el programa y `os` para ejecutar los comandos del sistema.

Ejemplo:

```text
python programa.py 192.168.1.1
```

## Guardar los datos

```text
entrada = sys.argv[1:]
```

Guarda la IP y comprueba que solo haya una.

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

## Realizar el ping

```text
comando_ping = "ping -c 1 " + ip
resultado = os.system(comando_ping)
```

Crea el comando `ping` y lo ejecuta para comprobar si la máquina responde.

## Buscar la dirección MAC

Si la máquina responde, el programa ejecuta:

```text
comando_arp = "arp -a" + ip
os.system(comando_arp)
```

Con este comando busca la dirección MAC asociada a la IP.

## Mostrar el resultado

Si la máquina responde, muestra:

```text
IP válida
La maquina responde. Buscando MAC ....
```

y después ejecuta el comando para obtener la MAC.

Si no responde, muestra:

```text
La máquina no responde
```

## Ejemplo

Entrada:

```text
python programa.py 192.168.1.1
```

Salida:

```text
IP válida
La maquina responde. Buscando MAC ....
```
