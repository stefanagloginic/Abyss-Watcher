import React, { Component } from 'react'
import DisastersMap from './DisastersMap'
import worldData from 'world-atlas/world/110m.json'
import usData from '../us-110m.json'
import { geoMercator, geoAlbers, geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import * as d3 from 'd3'
import '../Stylesheets/DisastersParent.css'
import earthquake_data from '../data/earthquake_dataset'
import tsunami_data from '../data/tsunami_dataset'
import d3Tip from 'd3-tip'
import wave_path from '../Icons/wave_path'


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

		this.plotEarthquakePoints();

		this.plotTsunamiPoints();
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

    plotTsunamiPoints = () => {
    	const node = this.node;
    	const geoPath = this.geoPath;

    	var tsunamis = select(node)
    		.append("g")
    		.attr("class", "tsunami_points");

    	var yearFilter = this.CreateYearFilter(2015, 2016);

    	var tsunami_features = tsunami_data.tsunami_json.features.filter(function(obj) {
			return yearFilter('1/1/' + obj.properties.Year);
		}).sort(function(a, b) {
			return b.properties.Max_height - a.properties.Max_height;
		});

		var radius = d3.scaleSqrt()
		    .domain([0, 10])
		    .range([0, 12]);

		var tip = d3Tip()
			.attr('class', 'd3-tip-tsunami d3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var location = d.properties.Location.toLowerCase();
				var period = d.properties.Period == "" ? "Unknown" : d.properties.Period;
				var date = d.properties.Month + "/" + d.properties.Day + "/" + d.properties.Year;
			    return "<div style='text-align:center;'><strong style='font-size:15px;color:#84ecff;'>" 
			    	+ d.properties.Type + "</strong></div>" + 
			    	"<div><strong style='font-size:12px;'>Date:</strong> <span style='color:red;font-size:12px'>" 
			    	+ date + "</span></div>" +  
			    	"<div><strong style='font-size:12px'>Location:</strong> <span style='color:red;font-size:12px'>" 
			    	+ location + "</span></div>" +
			    	"<div><strong style='font-size:12px'>Height:</strong> <span style='color:red;font-size:12px'>" 
			    	+ d.properties.Max_height + "m" + "</span></div>" + 
			    	"<div><strong style='font-size:12px'>Wave Period:</strong> <span style='color:red;font-size:12px'>" 
			    	+ period + "</span></div>";
			});

		tsunamis.selectAll("circle")
			.data( tsunami_features )
			.enter()
			.append("circle")
			.attr("transform", function(d) { 
				return "translate(" + geoPath.centroid(d) + ")"; 
			})
	    	.attr("r", function(d){
	    		return radius(d.properties.Max_height);
	    	})
      		.attr("stroke-width", "0.2px")
      		.attr( "d", geoPath )
      		.on("mouseover", function(d) {
	    		d3.select(this)
					.attr( "fill", "#ffae23" )
					.attr("fill-opacity", "1")
					.attr("stroke", "#f9ba4d")
					.style("cursor", "pointer");
				
				tip.show(d, this);
	    	})
	    	.on("mouseleave", function(d) {
	    		d3.select(this)
	    			.attr( "stroke", "#a0efff" )
					.attr("fill-opacity", ".5")
					.attr( "fill", "#84ecff" )
					.style("cursor", "default");
				
				tip.hide(d, this);
	    	});

    	select(node)
			.call(tip);

    }

    plotEarthquakePoints = () => {
	    // add static earthquake group
	    const node = this.node;
	    const geoPath = this.geoPath;

		var earthquakes = select(node)
			.append( "g" )
			.attr("class", "earthquake_points");

		var yearFilter = this.CreateYearFilter(2016, 2016);

		var earthquake_features = earthquake_data.earthquake_json.features.filter(function(obj) {
			return yearFilter(obj.properties.Date);
		}).sort(function(a, b) {
			return b.properties.Magnitude - a.properties.Magnitude;
		});

		var radius = d3.scaleSqrt()
		    .domain([5, 10])
		    .range([0, 15]);

		// setup tooltip
		var tip = d3Tip()
			.attr('class', 'd3-tip-earthquake d3-tip')
			.offset([-10, 0])
			.html(function(d) {
			    return "<div style='text-align:center;'><strong style='font-size:15px;color:#f93f2c;'>" 
			    	+ d.properties.Type + "</strong></div>" +
			    	"<div><strong style='font-size:12px;'>Date:</strong> <span style='color:red;font-size:12px'>" 
			    	+ d.properties.Date + "</span></div>" +  
			    	"<div><strong style='font-size:12px'>Time:</strong> <span style='color:red;font-size:12px'>" 
			    	+ d.properties.Time + "</span></div>" +
			    	"<div><strong style='font-size:12px'>Magnitude:</strong> <span style='color:red;font-size:12px'>" 
			    	+ d.properties.Magnitude + "</span></div>" + 
			    	"<div><strong style='font-size:12px'>Depth:</strong> <span style='color:red;font-size:12px'>" 
			    	+ d.properties.Depth + "km" + "</span></div>";
			});

		// add earthquake points
		earthquakes.selectAll( "circle" )
			.data( earthquake_features )
			.enter()
			.append( "circle" )
			.attr("transform", function(d) { 
				return "translate(" + geoPath.centroid(d) + ")"; 
			})
	    	.attr("r", function(d){
	    		return radius(d.properties.Magnitude);
	    	})
	    	.on("mouseover", function(d) {
	    		d3.select(this)
					.attr( "fill", "#ac4bb7" )
					.attr("fill-opacity", "1")
					.attr("stroke", "#f2cdf7")
					.style("cursor", "pointer");
				
				tip.show(d, this);
	    	})
	    	.on("mouseleave", function(d) {
	    		d3.select(this)
	    			.attr( "stroke", "#c10000" )
					.attr("fill-opacity", ".5")
					.attr( "fill", "#a30000" )
					.style("cursor", "default");
				
				tip.hide(d, this);
	    	})
	    	.attr("stroke-width", "0.2px")
			.attr( "d", geoPath );

			select(node)
				.call(tip);
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
			<svg className="map_svg" ref={node => this.node = node} 
				width={ '100%'} height={ '100%' }>
		    </svg>
		);
	}
}

export default DisastersParent
