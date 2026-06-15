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
        