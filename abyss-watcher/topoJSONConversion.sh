#!/bin/bash
env OUTPUT_FILE=build/topoData.topojson \
bash -c 'geo2topo -q 1e5 -n topoData=\
<(\
shp2json -n 10m_physical/ne_10m_coastline.shp
shp2json -n cultural_data/ne_10m_admin_1_states_provinces_lines/ne_10m_admin_1_states_provinces_lines.shp
) \
| geostitch -n \
> $OUTPUT_FILE'
