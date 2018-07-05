import React, { Component } from 'react'

/*-----------------css--------------------------*/
import '../Stylesheets/DisastersParent.css'

/*-----------------d3----------------------------*/
import worldData from 'world-atlas/world/110m.json'
import worldNames from '../world-110m-country-names'
import usData from '../us-110m.json'
import { geoMercator, geoAlbers, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import plotTsunamiPoints from '../D3/Tsunami'
import plotEarthquakePoints from '../D3/Earthquake'
import plotVolcanoPoints from '../D3/Volcano'
import plotTornadoPoints from '../D3/Tornado'
  
/*----------------Components---------------------*/
import GraphIcon from '../Icons/graph'
import IconButton from './IconButton'
import DataCommunication from './DataCommunication'
import Legend from './Legend'

/*----------------Redux---------------------*/
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'

/*---------------Actions--------------------*/
import { getEarthquakesByYear, getTsunamisByYear, getTornadoesByYear, getVolcanoesByYear } from '../actions/MenuActions'

class DisastersParent extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.getProps();
		this.props.getEarthquakesByYear(this.year);
   		this.props.getTsunamisByYear(this.year);
   		this.props.getTornadoesByYear(this.year);
   		this.props.getVolcanoesByYear(this.year);

		var newWorldData = this.prepareWorldNamesData();
		this.newWorldData = newWorldData;

		this.createMap();
	}

   	componentDidUpdate() {
   		this.getProps();
		this.createMap();
   	}

   	getProps(){
   		const { 
			earthquake_options, 
			tsunami_options,
			tornado_options,
			storm_options,
			hurricane_options,
			volcano_options,
			year
		} = this.props.selectionData;

		const { 
			static_earthquake_data,
			static_tsunami_data,
			static_tornado_data,
			static_volcano_data,
		} = this.props.disastersData;

		this.earthquake_options = earthquake_options;
		this.tsunami_options = tsunami_options;
		this.volcano_options = volcano_options;
		this.tornado_options = tornado_options;

		this.static_tsunami_data = static_tsunami_data;
		this.static_earthquake_data = static_earthquake_data;
		this.static_volcano_data = static_volcano_data;
		this.static_tornado_data = static_tornado_data;

		this.year = year;
   	}

	createMap = () => {
    	const node = this.node;
    	var width = window.innerWidth;
		var height = window.innerHeight;

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

		plotEarthquakePoints(node, geoPath, this.earthquake_options.visible, this.static_earthquake_data);

		plotTsunamiPoints(node, geoPath, this.tsunami_options.visible, this.static_tsunami_data);

		plotVolcanoPoints(node, geoPath, this.volcano_options.visible, this.static_volcano_data);

		plotTornadoPoints(node, geoPath, this.tornado_options.visible, this.static_tornado_data);
		// zoom capability
		var zoom = d3.zoom()
		    .scaleExtent([1, 20])
		    .on("zoom", this.zoomed);

		select(node)
			.call(zoom);
    }

    getPlottedNaturalDisasters = () => {
    	return Object.values(this.props.selectionData).filter(function(NDObj) {
    		if(NDObj.type && NDObj.visible) {
    			return NDObj;
    		}
    	});
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
				<Legend plottedND={ this.getPlottedNaturalDisasters() } />
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
		getTsunamisByYear: getTsunamisByYear,
		getTornadoesByYear: getTornadoesByYear,
		getVolcanoesByYear: getVolcanoesByYear,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisastersParent);
