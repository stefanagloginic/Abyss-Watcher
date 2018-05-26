import json

with open('tsunami.json') as f:
    data = json.load(f)

tsunami_json_obj = {}
inner_tsunami_json = {}
inner_tsunami_json['type'] = 'FeatureCollection'
features_json_obj = []

for obj in data:
	feature_obj = {}
	properties_obj = {}
	geometry_obj = {}

	properties_obj["Year"] = obj["YEAR"]
	properties_obj["Month"] = obj["MONTH"]
	properties_obj["Day"] = obj["DAY"]
	properties_obj["Country"] = obj["COUNTRY"]
	properties_obj["State_or_province"] = obj["STATE/PROVINCE"]
	properties_obj["Location"] = obj["LOCATION"]
	properties_obj["Day"] = obj["DAY"]
	properties_obj["Latitude"] = obj["LATITUDE"]
	properties_obj["Longitude"] = obj["LONGITUDE"]
	properties_obj["Distance_from_source"] = obj["DISTANCE_FROM_SOURCE"]
	properties_obj["Travel_time_hours"] = obj["TRAVEL_TIME_HOURS"]
	properties_obj["Period"] = obj["PERIOD"]
	properties_obj["Max_height"] = obj["MAXIMUM_HEIGHT"]
	properties_obj["Damage_millions_dollars"] = obj["DAMAGE_MILLIONS_DOLLARS"]
	properties_obj["Damage_estimate"] = obj["DAMAGE_ESTIMATE"]
	properties_obj["Houses_destroyed"] = obj["HOUSES_DESTROYED"]
	properties_obj["Fatalities"] = obj["FATALITIES"]
	properties_obj["Injuries"] = obj["INJURIES"]
	properties_obj["First_motion"] = obj["FIRST_MOTION"]

	geometry_obj["type"] = "Point"
	geometry_obj["coordinates"] = []
	# append longitude and longitude
	geometry_obj["coordinates"].append(obj['LONGITUDE'])
	geometry_obj["coordinates"].append(obj['LATITUDE'])

	# setup object to be returned
	feature_obj["type"] = "Feature"
	feature_obj["id"] = obj["WAVE_ID"]
	feature_obj["properties"] = properties_obj
	feature_obj["geometry"] = geometry_obj
	features_json_obj.append(feature_obj)

inner_tsunami_json['features'] = features_json_obj
tsunami_json_obj["tsunami_json"] = inner_tsunami_json
json_data = json.dumps(tsunami_json_obj)

with open('tsunami_dataset.json', 'w') as outfile:
	json.dump(tsunami_json_obj, outfile)