import sys
import os

entrada = sys.argv[1:]

if len(entrada) == 1:
    ip = entrada[0]
    bloques = ip.split('.')

    if len(bloques) == 4:
        o1 = int(bloques[0])
        o2 = int(bloques[1])
        o3 = int(bloques[2])
        o4 = int(bloques[3])

        if 0 <= o1 <= 255 and 0 <= o2 <= 255 and 0 <= o3 <= 255 and 0 <= o4 <= 255:
            print("IP válida")

            comando_ping = "ping -c 1 " + ip
            resultado = os.system(comando_ping)

            if resultado == 0:
                print("La maquina responde. Buscando MAC ....")
                comando_arp = "arp -a" + ip
                os.system(comando_arp)
            else:
                print("La máquina no responde")
        else:
            print("Error, La IP debe de estar entre 0 y 255")
    else:
        print("Error, La IP debe tener 4 bloques")
else:
    print("Error, Solo se puede introducir una IP")