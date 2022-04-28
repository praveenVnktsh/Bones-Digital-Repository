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

dic = {
    "species" : "Rhesus Macaque",
    "description": "The rhesus macaque (Macaca mulatta), colloquially rhesus monkey, is a species of Old World monkey. There         are between six and nine recognised subspecies that are split between two groups, the Chinese-derived and        the Indian-derived. Generally brown or grey in colour, it is 47–53 cm (19–21 in) in length with a         20.7–22.9 cm (8.1–9.0 in) tail and weighs 5.3–7.7 kg (12–17 lb). It is native to South, Central, and         Southeast Asia and has the widest geographic range of all non-human primates, occupying a great diversity         of altitudes and a great variety of habitats, from grasslands to arid and forested areas, but also close         to human settlements. Feral colonies are found in the United States, thought to be either released by         humans or escapees after hurricanes destroyed zoo and wildlife park facilities.",
    "models": [
    ]
}


for path in glob.glob(r'data\model\rhesus/models/*.glb'):
    filename = os.path.basename(path)

    dic['models'].append(
        {
            'name': str.title(filename.split('.')[0].split('_')[1]) + ' ' + filename.split('.')[0].split('_')[0],
            'url': 'data/model/rhesus/models/' + filename,
            # "posterurl": "data/model/rhesus/images/Cranial.jpg",           
            "find":"NA",
            "side" :"NA",
            'OBS SPECIES': "NA",
            'STATE OF INTEGRITY'  : "NA",
            'REMARKS' :"NA",

        }
    )


json.dump(dic, open('data/model/rhesus/data.json', 'w'))
