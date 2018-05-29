import React, { Component } from 'react'
import DataCommunication from './DataCommunication'

/*-----------------d3----------------------------*/
import worldData from 'world-atlas/world/110m.json'
import usData from '../us-110m.json'
import { geoMercator, geoAlbers, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import * as d3 from 'd3'
import '../Stylesheets/DisastersParent.css'
import d3Tip from 'd3-tip'
import plotTsunamiPoints from '../D3/Tsunami'
import plotEarthquakePoints from '../D3/Earthquake'

/*----------------Redux---------------------*/
import { connect } from 'react-redux';

class DisastersParent extends Component {
	constructor(props){
		super(props)
		this.createMap = this.createMap.bind(this);
	}

	componentDidMount() {
    	this.createMap();
   	}

	createMap() {
    	const node = this.node;
    	var width = window.innerWidth;
		var height = window.innerHeight;

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
    	// console.log(feature(usData, usData.objects.layer1).features);

    	this.geoPath = geoPath;

    	// reference to the first group
    	var state_names_g = select(node)
			.select("g");

		// setup paths, styling & event listeners for map
    	select(node)
	    	.select('g')
    		.selectAll( "path" )
		    .data([
	    		...feature(worldData, worldData.objects.countries).features,
	    		...feature(usData, usData.objects.layer1).features,
	    		])
		    .enter()
		    .append( "path" )
		    .attr("class", "state_paths")
		    .on("mouseover",function (d){
				state_names_g.append("svg:text")
					.text(d.properties.postal)
					.attr("pointer-events", "none")
					.style("font-size", "3px")
					.attr("x", function(){
						return geoPath.centroid(d)[0];
					})
					.attr("y", geoPath.centroid(d)[1])
					.attr("text-anchor","middle")
					.attr('fill', 'white')
					.style('font-size', function(){
						if(d.properties && d.properties.postal){
							// console.log(geoPath.area(d)/(80*d.properties.postal.length) + "px");
							var estFontSize = geoPath.area(d)/( 80 * d.properties.postal.length);
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
					.attr("class", d.properties.postal);

					d3.select(this)
						.attr( "fill", "#d67f22" )
						.style("cursor", "pointer"); 
			})
			.on("mouseleave",function (d){
				state_names_g.select("." + d.properties.postal).remove();

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

		plotEarthquakePoints(node, geoPath, true, this.CreateYearFilter(2016, 2016));

		plotTsunamiPoints(node, geoPath, true, this.CreateYearFilter(2014, 2016));
		// zoom capability
		var zoom = d3.zoom()
		    .scaleExtent([1, 20])
		    .on("zoom", this.zoomed);

		select(node)
			.call(zoom);
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
				<svg className="map_svg" ref={node => this.node = node} 
					width={ '100%'} height={ '100%' }>
			    </svg>
		    </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		championData: state.menuOptions
	}
}


export default connect(mapStateToProps)(DisastersParent);
