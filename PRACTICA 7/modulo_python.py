import sys
import  zipfile
import itertools

entrada = sys.argv[1:]

if len(entrada) == 4:
    zip_fuerza = entrada[0]
    longitud =  int(entrada[1])
    zip_diccionario = entrada[2]
    txt_diccionario = entrada[3]

    caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"
    encontrado1 = False
    archivo1 = zipfile.ZipFile(zip_fuerza)

    for intento in itertools.product(caracteres, repeat=longitud):
        if encontrado1 == False:
            clave_bruta = "".join(intento)
            try:
                archivo1.extractall(pwd=clave_bruta.encode())
                print("Fuerza bruta completada, Clave: " + clave_bruta)
                encontrado1 = True
            except:
                pass