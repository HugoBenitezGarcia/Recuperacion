import sys
import hashlib
import itertools

entrada = sys.argv[1:]

if len(entrada) == 2:
    hash_objetivo = entrada[0]
    longitud = int(entrada[1])
    caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"
    encontrado = False

    for intento in itertools.product(caracteres, repeat=longitud):
        if encontrado == False:
            palabra = "".join(intento)
            hash_prueba = hashlib.sha256(palabra.encode()).hexdigest()

            if hash_prueba == hash_objetivo:
                print("Encontrada " + palabra)
                encontrado = True

    if encontrado == False:
        print("No se ha encontrado la Palabra")
else:
    print("Error, introduce el hash y la longitud")