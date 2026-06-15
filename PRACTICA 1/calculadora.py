import sys

entrada = sys.argv[1:]
num1 = entrada[0]
num2 = entrada[-1]

if 1 <= len(num1) <= 8 and 1 <= len(num2) <= 8:
    op1 = int(num1, 2)
    op2 = int(num2, 2)

    if len(entrada) == 3:
        if entrada[1] == "+":
            print(format((op1 + op2) & 255, '08b'))
        if entrada[1] == "-":
            print(format((op1 - op2) & 255, '08b'))

    if len(entrada) == 2:
        print(format((op1 + op2) & 255, '08b'))
        print(format((op1 - op2) & 255, '08b'))