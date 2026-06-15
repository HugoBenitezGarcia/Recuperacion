
Este modulo recibe dos números binarios desde la terminal y realiza una **suma** o una **resta**. El resultado se muestra siempre en **8 bits**.

## Importar `sys`

Se usa para leer los datos que se escriben al ejecutar el programa.

Ejemplo:

```
python programa.py 1010 + 0011
```


## Guardar los datos

- `num1` es el primer número.
- `num2` es el último número.

## Comprobar el tamaño

```
if 1 <= len(num1) <= 8 and 1 <= len(num2) <= 8:
```

Comprueba que ambos números tengan entre 1 y 8 bits.

## Convertir a decimal

```
op1 = int(num1, 2)
op2 = int(num2, 2)
```

Convierte los números binarios a enteros.

## Realizar la operación

Si hay un `+`:

```
print(format((op1 + op2) & 255, '08b'))
```

Hace la suma.

Si hay un `-`:

```
print(format((op1 - op2) & 255, '08b'))
```

Hace la resta.

Si no hay operador, imprime primero la suma y después la resta.

## Ejemplo

Entrada:

```
python programa.py 1010 + 0011
```

Salida:

```
00001101
```

