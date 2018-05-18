import React, { Component } from 'react';
import DisastersMap from './DisastersMap';
import worldData from 'world-atlas/world/110m.json'
import usData from '../us-110m.json'
import { geoMercator, geoAlbers } from 'd3-geo'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'
import * as d3 from 'd3'
import '../Stylesheets/DisastersParent.css'

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

    	select(node)
	    	.append('g')

	   	var albersProjection = d3.geoMercator()
		    .scale( width/(1.5*Math.PI) )
		    .rotate( [0,0] )
		    .center( [0, 0] )
		    .translate( [width/2, height/2] );

		var geoPath = d3.geoPath()
    		.projection( albersProjection );

    	select(node)
	    	.select('g')
    		.selectAll( "path" )
		    .data([
	    		...feature(worldData, worldData.objects.countries).features,
	    		...feature(usData, usData.objects.layer1).features,
	    		])
		    .enter()
		    .append( "path" )
		    .attr( "fill", "#00517a" )
		    .attr( "stroke", "#7db4d1")
		    .attr("stroke-width", 0.5)
		    .attr( "d", geoPath );

		select(node)
			.append("rect")
		    .attr("width", width)
		    .attr("height", height)
		    .style("fill", "none")
		    .style("pointer-events", "all")
		    .call(d3.zoom()
		        .scaleExtent([1 / 2, 4])
		        .on("zoom", this.zoomed.bind(this)));
    }

    zoomed() {
    	var node = this.node;

		select(node)
	    	.select('g')
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
