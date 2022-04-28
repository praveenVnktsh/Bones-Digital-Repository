import pandas as pd
import json
import glob
import shutil
import os


# {
#     "species" : "Rhesus Macaque",
#     "description": "The rhesus macaque (Macaca mulatta), colloquially rhesus monkey, is a species of Old World monkey. There         are between six and nine recognised subspecies that are split between two groups, the Chinese-derived and        the Indian-derived. Generally brown or grey in colour, it is 47–53 cm (19–21 in) in length with a         20.7–22.9 cm (8.1–9.0 in) tail and weighs 5.3–7.7 kg (12–17 lb). It is native to South, Central, and         Southeast Asia and has the widest geographic range of all non-human primates, occupying a great diversity         of altitudes and a great variety of habitats, from grasslands to arid and forested areas, but also close         to human settlements. Feral colonies are found in the United States, thought to be either released by         humans or escapees after hurricanes destroyed zoo and wildlife park facilities.",
#     "models": [
#         {
#             "name": "Humerus",
#             "url": "data/model/rhesus/models/humerusLeft.glb",
#             "posterurl": "data/model/rhesus/images/humerusLeft.jpg"
#         },
#         {
#             "name": "Cranium",
#             "url": "data/model/rhesus/models/Cranial.glb",
#             "posterurl": "data/model/rhesus/images/Cranial.jpg"
#         }
#     ]
# }

dic = {'models': [],  "species": "Nilgai",
       "description": "Humans (Homo sapiens) are the most abundant and widespread species of primate, characterized by bipedalism and large, complex brains. This has enabled the development of advanced tools, culture, and language. Humans are highly social and tend to live in complex social structures composed of many cooperating and competing groups, from families and kinship networks to political states. Social interactions between humans have established a wide variety of values, social norms, and rituals, which bolster human society. Curiosity and the human desire to understand and influence the environment and to explain and manipulate phenomena have motivated humanity's development of science, philosophy, mythology, religion, and other fields of study."}

with open('inventory.csv', 'r') as f:
    data = f.readlines()

for path in glob.glob(r'data\model\artec/models/*.glb'):
    filename = os.path.basename(path)

    for line in data:
        if filename == line.split(',')[0]:
            break
    line = line.split(',')
    dic['models'].append(
        {
            'name': line[2],
            'url': 'data/model/artec/models/' + filename,
            # "posterurl": "data/model/rhesus/images/Cranial.jpg",           
            "find": line[1],
            "side" :line[-4],
            'OBS SPECIES': line[-3],
            'STATE OF INTEGRITY'  : line[-2],
            'REMARKS' :line[-1],

        }
    )


json.dump(dic, open('data/model/artec/data.json', 'w'))
