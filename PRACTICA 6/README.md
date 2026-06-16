Este módulo recibe un hash SHA-256 y una longitud, e intenta encontrar la palabra original mediante fuerza bruta.

## Importar `sys`, `hashlib` e `itertools`

Se usa `sys` para leer los datos introducidos, `hashlib` para generar hashes SHA-256 e `itertools` para crear todas las combinaciones posibles.

Ejemplo:

```text
python programa.py HASH 4
```

## Guardar los datos

```text
entrada = sys.argv[1:]
```

Guarda el hash que se quiere descifrar y la longitud de la palabra.

## Obtener el hash y la longitud

```text
hash_objetivo = entrada[0]
longitud = int(entrada[1])
```

* `hash_objetivo` es el hash que se quiere encontrar.
* `longitud` es el número de caracteres que tendrá la palabra.

## Definir los caracteres posibles

```text
caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"
```

Contiene todas las letras y números que se usarán para generar combinaciones.

## Generar combinaciones

```text
for intento in itertools.product(caracteres, repeat=longitud):
```

Genera todas las combinaciones posibles con la longitud indicada.

Por ejemplo, para longitud 2:

```text
aa
ab
ac
...
z9
```

## Crear la palabra

```text
palabra = "".join(intento)
```

Une los caracteres de cada combinación para formar una palabra.

## Generar el hash

```text
hash_prueba = hashlib.sha256(palabra.encode()).hexdigest()
```

Calcula el hash SHA-256 de la palabra generada.

## Comparar los hashes

```text
if hash_prueba == hash_objetivo:
```

Comprueba si el hash generado coincide con el hash introducido.

Si coinciden, la palabra ha sido encontrada.

## Mostrar el resultado

Si encuentra la palabra:

```text
Encontrada abc123
```

Si no encuentra ninguna coincidencia:

```text
No se ha encontrado la Palabra
```

## Ejemplo

Entrada:

```text
python programa.py ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad 3
```

Salida:

```text
Encontrada abc
```
