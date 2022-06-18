# Python script that filters json data such that ipdDate is earlier than 2020 1st Jan
# This prevents the error of not having enough data points to last the entire game


import json
f = open('src/data/listing_status.json')
data = json.load(f)
output_dic = []

for item in data:
    if item["ipoDate"] < '2020-01-01':
        output_dic.append(item)


output_json = json.dumps(output_dic)
with open('filtered_listing.json', 'w') as outfile:
    outfile.write(output_json)
