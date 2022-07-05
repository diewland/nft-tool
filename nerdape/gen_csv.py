import os, json
from pprint import pprint as pp

# config
SEP         = '|'
TT_UR       = 'ultimate rare'
TT_UNREVEAL = 'unreveal'
SCORE_UR    = 9999
SCORE_UNREVEAL = 0
F_TOKEN     = 'token_id'
F_NAME      = 'name'
F_RANK      = 'rank'
F_SCORE     = 'score'
F_BG        = 'background'
F_BODY      = 'body'
F_CLOTHES   = 'clothes'
F_EYEWEAR   = 'eyewear'
F_HEAD      = 'head'
F_MOUTH     = 'mouth'
F_URL       = 'link'
ATTRS       = [ F_BG, F_BODY, F_CLOTHES, F_EYEWEAR, F_HEAD, F_MOUTH ]
CSV_FIELDS  = [
    F_RANK,
    F_TOKEN,
    F_NAME,
    F_SCORE,
    F_URL,
    F_BG, F_BODY, F_CLOTHES, F_EYEWEAR, F_HEAD, F_MOUTH,
]

# prepare filename
ll = filter(lambda x: x.isnumeric(), os.listdir('json'))
ll = sorted([ int(x) for x in ll ])

# init items
items = []
attr_score = [ {}, {}, {}, {}, {}, {} ]

# fill basic attributes
for token_id in ll:
    data = json.load(open('./json/%s' % token_id))
    name = data['name']
    attr = data['attributes']
    ftt = attr[0]['trait_type']
    # build item
    item = {}
    item[F_TOKEN] = token_id
    item[F_NAME] = name
    item[F_URL] = 'https://quixotic.io/asset/0x824BB1f0438A38Ea424e19171eF6665A4bCCe3A5/%s' % token_id
    item[F_SCORE] = None
    # 1. ultimate rate
    if ftt == TT_UR:
        item[F_BG] = attr[0]['value']
        item[F_SCORE] = SCORE_UR
    # 2. unreveal
    elif ftt == TT_UNREVEAL:
        item[F_BG] = attr[0]['value']
        item[F_SCORE] = SCORE_UNREVEAL
    # 3. common
    else:
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
