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

    if encontrado1 == False:
        print("No se encontro la clave")

    encontrado2 = False
    archivo2 = zipfile.ZipFile(zip_diccionario)

    try:
        diccionario = open(txt_diccionario, "r", encoding="utf-8")
        for linea in diccionario:
            if encontrado2 == False:
                clave_dic = linea.strip()
                try:
                    archivo2.extractall(pwd=clave_dic.encode())
                    print("Ataque exitoso, Clave; " + clave_dic)
                    encontrado2 = True
                except:
                    pass
        diccionario.close()
    except:
        print("Error al abrir el txt")
    if encontrado2 == False:
        print("No se encontro la clave")
else:
    print("Error, usa: python modulo_python.py zip_1 longitud zip_2 archivo_texto")