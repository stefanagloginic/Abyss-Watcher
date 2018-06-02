import json

with open('volcano_data.json') as f:
    data = json.load(f)

volcano_json_obj = {}
inner_volcano_json = {}
inner_volcano_json['type'] = 'FeatureCollection'
features_json_obj = []
i = 0
for obj in data:
	feature_obj = {}
	properties_obj = {}
	geometry_obj = {}

	properties_obj["Year"] = obj["Year"]
	properties_obj["Month"] = obj["Month"]
	properties_obj["Day"] = obj["Day"]
	properties_obj["Status"] = obj["Status"]
	properties_obj["Agent"] = obj["Agent"]
	properties_obj["Tsunami_Caused"] = obj["TSU"]
	properties_obj["Earthquake_Caused"] = obj["EQ"]
	properties_obj["Type"] = "Volcanic Activity"
	properties_obj["Latitude"] = obj["Latitude"]
	properties_obj["Longitude"] = obj["Longitude"]
	properties_obj["Name"] = obj["Name"]
	properties_obj["Volcano_Type"] = obj["Type"]
	properties_obj["Location"] = obj["Location"]
	properties_obj["Country"] = obj["Country"]
	properties_obj["Elevation"] = obj["Elevation"]
	properties_obj["VEI"] = obj["VEI"]
	properties_obj["Deaths"] = obj["TOTAL_DEATHS"]
	properties_obj["Missing"] = obj["TOTAL_MISSING"]
	properties_obj["Damage_Millions_Dollars"] = obj["TOTAL_DAMAGE_MILLIONS_DOLLARS"]
	properties_obj["Injuries"] = obj["TOTAL_INJURIES"]
	properties_obj["Houses_Destroyed"] = obj["TOTAL_HOUSES_DESTROYED"]

	geometry_obj["type"] = "Point"
	geometry_obj["coordinates"] = []
	# append longitude and longitude
	geometry_obj["coordinates"].append(obj['Longitude'])
	geometry_obj["coordinates"].append(obj['Latitude'])

	# setup object to be returned
	feature_obj["type"] = "Feature"
	feature_obj["id"] = i
	feature_obj["properties"] = properties_obj
	feature_obj["geometry"] = geometry_obj
	features_json_obj.append(feature_obj)
	i+=1

inner_volcano_json['features'] = features_json_obj
volcano_json_obj["volcano_json"] = inner_volcano_json
json_data = json.dumps(volcano_json_obj)

with open('volcano_with_impacts_dataset.json', 'w') as outfile:
	json.dump(volcano_json_obj, outfile)