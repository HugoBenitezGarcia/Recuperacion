import sys
import socket

entrada = sys.argv[1:]

if len(entrada) == 1 or len(entrada) == 3:
    ip = entrada[0]
    bloques = ip.split('.')

    if len(bloques) == 4:
        o1 = int(bloques[0])
        o2 = int(bloques[1])
        o3 = int(bloques[2])
        o4 = int(bloques[3])

        if 0 <= o1 <= 255 and 0 <= o2 <= 255 and 0 <= o3 <= 255 and 0 <= o4 <= 255:
            valido = True
            puertos = [21, 22, 80, 443, 8080]

            if len(entrada) == 3:
                if entrada[1] == "-p":
                    partes_puertos = entrada[2].split(',')
                    puertos = []

                    for p in partes_puertos:
                        if p.isdigit():
                            num_p = int(p)
                            if 1 <= num_p <= 65535:
                                if num_p not in puertos:
                                    puertos.append(num_p)
                            else:
                                valido = False
                                print("Error, Los puertos tienen que estar entre 1 y 65535")
                        else:
                            valido = False
                            print("Error, Los puertos tienen que ser numeros enteros")
                else:
                    valido = False
                    print("Error, Opcion incorrecta, usa -p")

            if valido == True:
                abiertos = 0
                total = len(puertos)

                print("Escaneando " + ip)

                for puerto in puertos:
                    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    s.settimeout(0.5)
                    resultado = s.connect_ex((ip, puerto))

                    if resultado == 0:
                        print("Puerto " + str(puerto) + " ABIERTO")
                        abiertos = abiertos + 1
                    else:
                        print("Puerto " + str(puerto) + " CERRADO")

                    s.close()
                print("Resumen: " + str(abiertos) + " puertos abiertos de " + str(total) + " analizados.")
        else:
            print("Error, La IP debe de estar entre 0 y 255")
    else:
        print("Error, La IP debe tener 4 bloques")
else:
    print("Error, Solo se puede introducir una IP")