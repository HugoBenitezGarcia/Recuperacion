import sys

entrada = sys.argv[1:]

if len (entrada) == 1:
    ip = entrada[0]
    bloques = ip.split('.')