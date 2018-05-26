import json

with open('earthquake_data.json') as f:
    data = json.load(f)

earthquake_json_obj = {}
inner_earthquake_json = {}
inner_earthquake_json['type'] = 'FeatureCollection'
features_json_obj = []

for obj in data:
	feature_obj = {}
	properties_obj = {}
	geometry_obj = {}

	properties_obj["Date"] = obj["Date"]
	properties_obj["Time"] = obj["Time"]
	properties_obj["Type"] = obj["Type"]
	properties_obj["Latitude"] = obj["Latitude"]
	properties_obj["Longitude"] = obj["Longitude"]
	properties_obj["Depth"] = obj["Depth"]
	properties_obj["Depth_Error"] = obj["Depth Error"]
	properties_obj["Magnitude"] = obj["Magnitude"]

	geometry_obj["type"] = "Point"
	geometry_obj["coordinates"] = []
	# append longitude and longitude
	geometry_obj["coordinates"].append(obj['Longitude'])
	geometry_obj["coordinates"].append(obj['Latitude'])

	# setup object to be returned
	feature_obj["type"] = "Feature"
	feature_obj["id"] = obj["ID"]
	feature_obj["properties"] = properties_obj
	feature_obj["geometry"] = geometry_obj
	features_json_obj.append(feature_obj)

inner_earthquake_json['features'] = features_json_obj
earthquake_json_obj["earthquake_json"] = inner_earthquake_json
json_data = json.dumps(earthquake_json_obj)

with open('earthquake_dataset.json', 'w') as outfile:
	json.dump(earthquake_json_obj, outfile)