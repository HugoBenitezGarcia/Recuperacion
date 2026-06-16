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

    