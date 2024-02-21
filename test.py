import sys

for line in sys.stdin:
    a = line.split()
    n = int(a[0])
    m = int(a[1])
    if n < 2 or m < 2:
        print(0)
    else:
        row = 0
        each_row_0 = '1 ' * (m-1) + '1'
        each_row_1 = '1'
        for i in range(m-1):
            if i % 2:
                each_row_1 += ' 1'
            else:
                each_row_1 += ' 0'
        # print(each_row_1)
        for i in range(n):
            if i % 2:
                print(each_row_0)
            else:
                print(each_row_1)