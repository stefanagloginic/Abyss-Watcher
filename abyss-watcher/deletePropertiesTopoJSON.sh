cat build/simplified_topoData.topojson | ndjson-map "(d.id = d.properties.name,delete d.properties,d)" > build/removed_properties_topoJSON.topojson