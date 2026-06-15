import sys

entrada = sys.argv[1:]

if len (entrada) == 1:
    ip = entrada[0]
    bloques = ip.split('.')

    if len(bloques) == 4:
        o1 = int(bloques[0])
        o2 = int(bloques[1])
        o3 = int(bloques[2])
        o4 = int(bloques[3])

        if 0 <= o1 <= 255 and 0 <= o2 <= 255 and 0 <= o3 <= 255 and 0 <= o4 <= 255:
            print("IP válida")

            if 1 <= o1 <= 126:
                print("Clase: A")
            if 128 <= o1 <= 191:
                print("Clase: B")
            if 192 <= o1 <= 223:
                print("Clase: C")
            if 224 <= o1 <= 239:
                print("Clase: D")
            if 240 <= o1 <= 254:
                print("Clase: E")
        else:
            print("Error, La ip debe de estar entre 0 y 255")
    else:
        print("Error, La IP de tener 4 bloques")
else:
    print("Error, Solo se puede introducir una IP")