import json

with open('storms_data.json') as f:
    data = json.load(f)

storms_json_obj = {}
inner_storms_json = {}
inner_storms_json['type'] = 'FeatureCollection'
features_json_obj = []

for obj in data:
	feature_obj = {}
	properties_obj = {}
	geometry_obj = {}

	properties_obj["Month"] = obj["mo"]
	properties_obj["Day"] = obj["dy"]
	properties_obj["Year"] = obj["yr"]
	properties_obj["Date"] = obj["date"]
	properties_obj["Time"] = obj["time"]
	properties_obj["Type"] = "Tornado"
	properties_obj["Latitude"] = obj["slat"]
	properties_obj["Longitude"] = obj["slon"]
	properties_obj["End_Latitude"] = obj["elat"]
	properties_obj["End_Longitude"] = obj["elon"]
	properties_obj["Width"] = obj["wid"]
	properties_obj["Length"] = obj["len"]
	properties_obj["Location"] = obj["st"]
	properties_obj["Injuries"] = obj["inj"]
	properties_obj["Deaths"] = obj["fat"]
	properties_obj["Property_Damage"] = obj["loss"]
	properties_obj["Magnitude"] = obj["mag"]

	geometry_obj["type"] = "Point"
	geometry_obj["coordinates"] = []
	# append longitude and longitude
	geometry_obj["coordinates"].append(obj['slon'])
	geometry_obj["coordinates"].append(obj['slat'])

	# setup object to be returned
	feature_obj["type"] = "Feature"
	feature_obj["id"] = obj["om"]
	feature_obj["properties"] = properties_obj
	feature_obj["geometry"] = geometry_obj
	features_json_obj.append(feature_obj)

inner_storms_json['features'] = features_json_obj
storms_json_obj["storms_json"] = inner_storms_json
json_data = json.dumps(storms_json_obj)

with open('storms_dataset.json', 'w') as outfile:
	json.dump(storms_json_obj, outfile)