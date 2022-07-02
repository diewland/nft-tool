import os, json
from pprint import pprint as pp

# config
SEP = '|'
TT_UR = 'ultimate rare'
TT_UNREVEAL = 'unreveal'

# prepare filename
ll = filter(lambda x: x.isnumeric(), os.listdir('json'))
ll = sorted(ll, key=lambda x: int(x))

# loop
for num in ll:
    data = json.load(open('./json/' + num))
    name = data['name']
    attr = data['attributes']
    ftt = attr[0]['trait_type']
    # 1. ultimate rate
    if ftt == TT_UR:
        print(SEP.join((name, ftt)))
    # 2. unreveal
    elif ftt == TT_UNREVEAL:
        print(SEP.join((name, ftt)))
    # 3. common
    else:
        bg = attr[0]['value']       # background
        body = attr[1]['value']     # body
        clothes = attr[2]['value']  # clothes
        eyewear = attr[3]['value']  # eyewear
        head = attr[4]['value']     # head
        mouth = attr[5]['value']    # mouth
        print(SEP.join((name, bg, body, clothes, eyewear, head, mouth)))
