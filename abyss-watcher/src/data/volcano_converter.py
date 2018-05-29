import json

with open('volcano.json') as f:
    data = json.load(f)

volcano_json_obj = {}
inner_volcano_json = {}
inner_volcano_json['type'] = 'FeatureCollection'
features_json_obj = []

for obj in data:
	if(obj["Last Known Eruption"] != "Unknown"):
		feature_obj = {}
		properties_obj = {}
		geometry_obj = {}

		properties_obj["Name"] = obj["Name"]
		properties_obj["Country"] = obj["Country"]
		properties_obj["Type"] = "Volcanic Activity"
		properties_obj["Latitude"] = obj["Latitude"]
		properties_obj["Longitude"] = obj["Longitude"]
		properties_obj["Region"] = obj["Region"]
		properties_obj["Volcano Type"] = obj["Type"]
		properties_obj["Elevation"] = obj["Elevation (Meters)"]
		properties_obj["Dominant Rock Type"] = obj["Dominant Rock Type"]
		properties_obj["Tectonic Setting"] = obj["Tectonic Setting"]

		geometry_obj["type"] = "Point"
		geometry_obj["coordinates"] = []
		# append longitude and longitude
		geometry_obj["coordinates"].append(obj['Longitude'])
		geometry_obj["coordinates"].append(obj['Latitude'])

		# setup object to be returned
		feature_obj["type"] = "Feature"
		feature_obj["id"] = obj["Number"]
		feature_obj["properties"] = properties_obj
		feature_obj["geometry"] = geometry_obj
		features_json_obj.append(feature_obj)

inner_volcano_json['features'] = features_json_obj
volcano_json_obj["volcano_json"] = inner_volcano_json
json_data = json.dumps(volcano_json_obj)

with open('volcano_dataset.json', 'w') as outfile:
	json.dump(volcano_json_obj, outfile)