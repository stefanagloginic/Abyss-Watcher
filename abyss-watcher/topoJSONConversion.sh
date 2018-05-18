#!/bin/bash
env OUTPUT_FILE=build/topoData.topojson \
bash -c 'geo2topo -q 1e5 -n topoData=\
<(\
shp2json -n 10m_physical/ne_10m_coastline.shp
shp2json -n cultural_data/ne_10m_admin_1_states_provinces_lines/ne_10m_admin_1_states_provinces_lines.shp
shp2json -n 10m_physical/ne_10m_antarctic_ice_shelves_lines.shp
shp2json -n 10m_physical/ne_10m_coastline.shp
shp2json -n 10m_physical/ne_10m_geography_regions_points.shp
shp2json -n 10m_physical/ne_10m_glaciated_areas.shp
shp2json -n 10m_physical/ne_10m_land.shp
shp2json -n 10m_physical/ne_10m_land_ocean_label_points.shp
shp2json -n 10m_physical/ne_10m_minor_islands.shp
shp2json -n 10m_physical/ne_10m_minor_islands2.shp
shp2json -n 10m_physical/ne_10m_minor_islands_coastline.shp
shp2json -n 10m_physical/ne_10m_minor_islands_label_points.shp
shp2json -n 10m_physical/ne_10m_ocean.shp
shp2json -n 10m_physical/ne_10m_playas.shp
shp2json -n 10m_physical/ne_10m_reefs.shp
shp2json -n cultural_data/ne_10m_admin_0_countries/ne_10m_admin_0_countries.shp
shp2json -n cultural_data/ne_10m_admin_1_states_provinces_lines/ne_10m_admin_1_states_provinces_lines.shp
shp2json -n cultural_data/ne_10m_populated_places/ne_10m_populated_places.shp
shp2json -n cultural_data/ne_10m_urban_areas/ne_10m_urban_areas.shp
) \
| geostitch -n \
> $OUTPUT_FILE'
