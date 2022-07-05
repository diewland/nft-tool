import os, json
from pprint import pprint as pp

# config
SEP         = '|'
F_TOKEN     = 'token_id'
F_NAME      = 'name'
F_RANK      = 'rank'
F_SCORE     = 'score'
F_AURA      = 'aura'
F_WEAPON    = 'weapon'
F_BODY      = 'body'
F_EYE       = 'eye'
F_CLOTHES   = 'clothes'
F_ACC_EAR   = 'accessory_ear'
F_MOUTH     = 'mouth'
F_ACC_FACE  = 'accessory_face'
F_HAIR      = 'hair'
F_HEADGEAR  = 'headgear'
F_STYLE     = 'style'
F_URL       = 'link'
ATTRS       = [ F_AURA, F_WEAPON, F_BODY, F_EYE, F_CLOTHES, F_ACC_EAR, F_MOUTH, F_ACC_FACE, F_HAIR, F_HEADGEAR, F_STYLE ]
CSV_FIELDS  = [
    F_RANK,
    #F_TOKEN,
    F_NAME,
    F_SCORE,
    F_URL,
    F_AURA, F_WEAPON, F_BODY, F_EYE, F_CLOTHES, F_ACC_EAR, F_MOUTH, F_ACC_FACE, F_HAIR, F_HEADGEAR, F_STYLE,
]

# prepare filename
ll = filter(lambda x: x.endswith('.json'), os.listdir('json'))
ll = sorted([ int(x.split('.')[0]) for x in ll ])

# init items
items = []
attr_score = [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ]

# fill basic attributes
for token_id in ll:
    data = json.load(open('./json/%s.json' % token_id))
    name = data['name']
    attr = data['attributes']
    # build item
    item = {}
    item[F_TOKEN] = token_id
    item[F_NAME] = name
    item[F_URL] = 'https://quixotic.io/asset/0xb91b2276bd5A98994Bf1f496E3886f688f8d4581/%s' % token_id
    item[F_SCORE] = None
    for idx, key in enumerate(ATTRS):
        v = attr[idx]['value']
        item[key] = v
        # collect attr stat
        if attr_score[idx].get(v) is None:
            attr_score[idx][v] = 0
        else:
            attr_score[idx][v] += 1

    # add to list
    items.append(item)

# calc score
item_size = len(items)
for item in items:
    # skip UR, unreveal
    if item[F_SCORE] is not None:
        continue
    # calc score from attributes
    score = 0
    for idx, key in enumerate(ATTRS):
        attr = item[key]
        div = attr_score[idx][attr]
        score += item_size / div
    item[F_SCORE] = score

# calc ranking
prev_score = 0
prev_rank = 0
items.sort(key=lambda it: it[F_SCORE], reverse=True)
for idx, item in enumerate(items):
    cur_score = item[F_SCORE]
    # next rank
    if cur_score != prev_score:
        cur_rank = idx + 1
        prev_score = cur_score
        prev_rank = cur_rank
        item[F_RANK] = cur_rank
    else:
        item[F_RANK] = cur_rank

# print csv
print(SEP.join(CSV_FIELDS))
for item in items:
    row = [ item.get(k) or '' for k in CSV_FIELDS ]
    row = [ str(r) for r in row  ]
    print(SEP.join(row))
