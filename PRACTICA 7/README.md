Este módulo intenta obtener la contraseña de dos archivos ZIP protegidos. Para ello utiliza un **ataque por fuerza bruta** sobre el primer ZIP y un **ataque por diccionario** sobre el segundo.

## Importar `sys`, `zipfile` e `itertools`

Se usa `sys` para leer los datos introducidos, `zipfile` para trabajar con archivos ZIP e `itertools` para generar combinaciones.

Ejemplo:

```text
python programa.py zip1.zip 4 zip2.zip diccionario.txt
```

## Guardar los datos

```text
entrada = sys.argv[1:]
```

Guarda los nombres de los archivos ZIP, la longitud de la contraseña y el archivo de diccionario.

## Obtener los parámetros

```text
zip_fuerza = entrada[0]
longitud = int(entrada[1])
zip_diccionario = entrada[2]
txt_diccionario = entrada[3]
```

* `zip_fuerza` es el ZIP que se atacará por fuerza bruta.
* `longitud` es la longitud de la contraseña.
* `zip_diccionario` es el ZIP que se atacará con diccionario.
* `txt_diccionario` es el archivo que contiene posibles contraseñas.

## Definir los caracteres posibles

```text
caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"
```

Contiene las letras y números que se usarán para generar contraseñas.

## Ataque por fuerza bruta

```text
for intento in itertools.product(caracteres, repeat=longitud):
```

Genera todas las combinaciones posibles con la longitud indicada.

## Probar cada contraseña

```text
archivo1.extractall(pwd=clave_bruta.encode())
```

Intenta extraer el ZIP usando cada contraseña generada.

Si funciona, muestra:

```text
Fuerza bruta completada, Clave: abc123
```

## Comprobar si se encontró la clave

Si ninguna contraseña funciona:

```text
No se encontro la clave
```

## Ataque por diccionario

```text
diccionario = open(txt_diccionario, "r", encoding="utf-8")
```

Abre el archivo de texto que contiene posibles contraseñas.

## Leer las contraseñas

```text
for linea in diccionario:
```

Lee cada línea del archivo y la utiliza como contraseña.

## Probar cada contraseña

```text
archivo2.extractall(pwd=clave_dic.encode())
```

Intenta extraer el ZIP usando cada contraseña del diccionario.

Si funciona, muestra:

```text
Ataque exitoso, Clave: password123
```

## Comprobar si se encontró la clave

Si ninguna contraseña funciona:

```text
No se encontro la clave
```

## Ejemplo

Entrada:

```text
python programa.py protegido1.zip 4 protegido2.zip claves.txt
```

Salida:

```text
Fuerza bruta completada, Clave: ab12
Ataque exitoso, Clave: password123
```
