# ABYSS WATCHERS

### INTRODUCTION AND MISSION STATEMENT
Many tools online depicting natural disasters only focus on single events, and are outdated representations according to modern UI designs. Likewise, these representations are restricted only to real time displays, or are represented in list form for historical natural disasters. This can be frustrating when trying to determine all of the potential hazards an area might pose, and the lack of visual representation of historical references makes it more difficult to see trends over time.
	Our mission is to create a visual aid that includes a variety of natural disasters (i.e. Earthquakes, Tsunamis, Tornadoes …) and provides a seamless way to view the trends and economic impacts of natural disasters across the world. 
	
### PROJECT DESCRIPTION
This project features two forms of visualization for natural disasters. 
1) The main screen consists of a map representation, that plots the specified type of natural disaster according to its lat, long position. The points are scaled according to the severity of the occurrence. An example would be a very large circle, for an earthquake of large magnitude (7.5). 
2) The second visualization involves graph representations of such occurrences. Economic, social, or cultural impacts of these disasters are shown in the form of bar graphs, scatter plots, histograms and more. 

Both data visualization types are utilizing data on a yearly basis. The year of interest could be adjusted for both map or graph views through interaction with a slider found on the bottom middle of the page. 
The data displayed on the map could likewise be filtered according to user specifications form the dropdown in the menu.
 
## WHEN YOU FIRST PULL CODE
* run command `npm install`

## TO RUN CODE
In terminal window
```
$ npm start
```

Go to [http://localhost:3000/](http://localhost:3000/) to view main page

## CURRENT DISASTER TYPES
* Earthquake *(scaled points according to magnitude)*
* Tsunami *(scaled points according to wave height)*
* Volcanic Acivity
* Hurricane
* Tornado
* Wildfire *(found in the USA)*
* Storm

## TECHNOLOGIES USED
* ReactJS
* Redux
* NodeJS
* D3.js *(for data visualization and map)*

## STATIC DATASETS USED 
[Tsunami Data](https://www.kaggle.com/noaa/seismic-waves)
[Earthquake Data](https://www.kaggle.com/usgs/earthquake-database/data)
[Wildfire Data](https://catalog.data.gov/dataset/combined-wildfire-dataset-for-the-united-states-and-certain-territories-1870-2015)