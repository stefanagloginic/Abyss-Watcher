import React, { Component } from 'react'
import DataCommunication from './DataCommunication'
/*-----------------d3----------------------------*/
import worldData from 'world-atlas/world/110m.json'
import worldNames from '../world-110m-country-names'
import usData from '../us-110m.json'
import { geoMercator, geoAlbers, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import * as d3 from 'd3'
import '../Stylesheets/DisastersParent.css'
import d3Tip from 'd3-tip'
import plotTsunamiPoints from '../D3/Tsunami'
import plotEarthquakePoints from '../D3/Earthquake'
// import plotVolcanoPoints from '../D3/Volcano'
// import plotTornadoPoints from '../D3/Tornado'
  
/*----------------Components---------------------*/
import GraphIcon from '../Icons/graph'
import IconButton from './IconButton'

/*----------------Redux---------------------*/
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'

/*---------------Actions--------------------*/
import { getEarthquakesByYear } from '../actions/MenuActions'

class DisastersParent extends Component {
	constructor(props){
		super(props)
	}

	async componentDidMount(){
		// var earthquake_data = await this.getDisasterData();
  //  		this.earthquake_data = earthquake_data;
   		// console.log(this.earthquake_data);
		var newWorldData = this.prepareWorldNamesData();
		this.newWorldData = newWorldData;
		this.createMap();
	}

   	async componentDidUpdate() {
   		// this.earthquake_data = await this.getDisasterData();
		this.createMap();
   	}

   	async getDisasterData(){
   		const { 
			earthquake_options, 
			tsunami_options,
			tornado_options,
			storm_options,
			hurricane_options,
			volcano_options,
			year
		} = this.props.selectionData;

   		await this.props.getEarthquakesByYear(year);
   		var earthquake_data = this.props.disastersData.static_earthquake_data;
   		return earthquake_data;
   	}

	createMap = () => {
    	const node = this.node;
    	var width = window.innerWidth;
		var height = window.innerHeight;
		const { 
			earthquake_options, 
			tsunami_options,
			tornado_options,
			storm_options,
			hurricane_options,
			volcano_options,
			year
		} = this.props.selectionData;

		select(node).selectAll("g").remove();

		// append first group to the svg
    	select(node)
	    	.append('g')

	   	// projection type for the map
	   	var albersProjection = d3.geoMercator()
		    .scale( width/(1.5*Math.PI) )
		    .rotate( [0,0] )
		    .center( [0, 0] )
		    .translate( [width/2, height/2] );

		// setting projection
		var geoPath = d3.geoPath()
    		.projection( albersProjection );

    	this.geoPath = geoPath;

    	// reference to the first group
    	var state_names_g = select(node)
			.select("g");
	
		// setup paths, styling & event listeners for map
    	select(node)
	    	.select('g')
    		.selectAll( "path" )
		    .data([
	    		...this.newWorldData,
	    		...feature(usData, usData.objects.layer1).features,
	    		])
		    .enter()
		    .append( "path" )
		    .attr("class", "state_paths")
		    .on("mouseover",function (d){
		    	var name = d.properties.postal ? d.properties.postal : d.properties.name
				state_names_g.append("svg:text")
					.text(name)
					.attr("pointer-events", "none")
					.style("font-size", "3px")
					.attr("x", function(){
						return geoPath.centroid(d)[0];
					})
					.attr("y", geoPath.centroid(d)[1])
					.attr("text-anchor","middle")
					.attr('fill', 'white')
					.style('font-size', function(){
						if(d.properties && (d.properties.postal || d.properties.name)){
							var name = d.properties.postal ? d.properties.postal : d.properties.name;
							var estFontSize = geoPath.area(d)/( 80 * name.length);
							if(estFontSize <= 1){
								estFontSize = "2px";
							}
							else if(estFontSize > 30){
								estFontSize = '20px';
							}else{
								estFontSize += 'px';
							}

							return estFontSize;
						}
					})
					.attr("class", function() {
						if(d.properties.postal) {
							return d.properties.postal;
						}
						else if(d.properties.name) {
							return d.properties.name.split(' ').join('');
						} 
						else {
							return "no_name"
						}
					});

					d3.select(this)
						.attr( "fill", "#d67f22" )
						.style("cursor", "pointer"); 
			})
			.on("mouseleave",function (d){
				var classname = "";
				if(d.properties.postal) {
					classname = d.properties.postal;
				}
				else if(d.properties.name) {
					classname = d.properties.name.split(' ').join('');
				} 
				else {
					classname = "no_name"
				}

				state_names_g.select("." + classname).remove();

				d3.select(this)
					.attr( "fill", "#00517a" )
					.style("cursor", "default"); 
			})
		    .attr( "fill", "#00517a" )
		    .attr( "stroke", "#7db4d1")
		    .attr("stroke-width", 0.5)
		    .attr( "d", geoPath );

		// append the second group to the DOM
		state_names_g.append("g")
			.attr("class", "us_states_names");

		// plotEarthquakePoints(node, geoPath, this.earthquake_data);

		plotTsunamiPoints(node, geoPath, tsunami_options.visible, this.CreateYearFilter(year, year));

		// plotVolcanoPoints(node, geoPath, volcano_options.visible, this.CreateYearFilter(year, year));

		// plotTornadoPoints(node, geoPath, tornado_options.visible, this.CreateYearFilter(year, year));
		// zoom capability
		var zoom = d3.zoom()
		    .scaleExtent([1, 20])
		    .on("zoom", this.zoomed);

		select(node)
			.call(zoom);
    }

    // iterate through the node world data and add the names in from static json
    prepareWorldNamesData = () => {
    	var obj = {}
    	var newWorldData = [...feature(worldData, worldData.objects.countries).features]
    	for(var i=0; i < newWorldData.length; i++) {
    		for(var j=0; j < worldNames.length; j++) {
    			if(parseInt(newWorldData[i].id) === parseInt(worldNames[j].id)) {
    				newWorldData[i].properties["name"] = worldNames[j].name;
    			}
    		}
    	}

    	return newWorldData;
    }

    CreateYearFilter = (start, end) => {
		return (date) =>{
			let year = (new Date(date)).getFullYear();
			return (year >= start && year <= end)
		}
	}

    zoomed = () => {
    	var node = this.node;

		select(node)
	    	.selectAll('g')
		 	.style("stroke-width", 1.5 / d3.event.transform.k + "px")
		  	.attr("transform", d3.event.transform); 
	}

	render() {
		return (
			<div className="map_wrapper">
				<DataCommunication />
				<IconButton link="/graphs" label="Graphs" icon={<GraphIcon size={65} />} />
				<svg 
					className="map_svg" 
					ref={node => this.node = node} 
					width={ '100%'} 
					height={ '100%' } 
				/>
		    </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectionData: state.menuOptions,
		disastersData: state.disastersData
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getEarthquakesByYear: getEarthquakesByYear, 
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisastersParent);
