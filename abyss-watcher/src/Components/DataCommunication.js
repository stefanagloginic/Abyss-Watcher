import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../Stylesheets/DataCommunication.css';

import { select } from 'd3-selection'
import * as d3 from 'd3'

class DataCommunication extends Component {
	constructor(props){
		super(props)
		this.createCommunications = this.createCommunications.bind(this);
	}

	componentDidMount() {
    	this.createCommunications();
   	}

	createCommunications = () => {
		const inner_node = this.inner_node;
		var width = 30,
    		height = 55;

    	var div = select(inner_node)
    		.append("div")
    		.attr("class", "earthquake_wrapper_div")

		var svg = d3.select(".earthquake_wrapper_div")
			.append("svg")
			.attr("class", "comm_quake_svg");

    	var radius = d3.scaleSqrt()
		    .domain([5, 10])
		    .range([5, 15]);

    	var legend = svg.append("g")
    		.attr("class", "legend")
    		.attr("transform", "translate(" + (width) + "," + (height) + ")")
			.selectAll("g")
				.data([5, 10, 15])
			.enter().append("g");

		legend.append("circle")
		    .attr("cy", function(d) {
		    	return -radius(d); 
		    })
		    .attr("r", function(d) {
		    	return radius(d);
		    })
		    .attr("class", "earthquake_circle");

		legend.append("text")
		    .attr("y", function(d) { 
		    	return -2.4 * radius(d); 
			})
		    .attr("dy", "2em")
		    .text(function(d) {
		    	return d;
		    });

		d3.select(".earthquake_wrapper_div")
			.append("p")
			.text("Earthquake")
			.attr("class", "earthquake_p p")

		this.createTsunamiComm();

	}

	createTsunamiComm = () => {
		const inner_node = this.inner_node;
		var width = 30,
    		height = 55;

    	var div = select(inner_node)
    		.append("div")
    		.attr("class", "tsunami_wrapper_div")

		var svg = d3.select(".tsunami_wrapper_div")
			.append("svg")
			.attr("class", "comm_tsunami_svg");

    	var radius = d3.scaleSqrt()
		    .domain([5, 10])
		    .range([5, 15]);

    	var legend = svg.append("g")
    		.attr("class", "legend")
    		.attr("transform", "translate(" + (width) + "," + (height) + ")")
			.selectAll("g")
				.data([5, 9, 12])
			.enter().append("g");

		legend.append("circle")
		    .attr("cy", function(d) {
		    	return -radius(d); 
		    })
		    .attr("r", function(d) {
		    	return radius(d);
		    })
		    .attr("class", "tsunami_circle");;

		legend.append("text")
		    .attr("y", function(d) { 
		    	return -2.6 * radius(d); 
			})
		    .attr("dy", "2.1em")
		    .text(function(d) {
		    	return Math.floor(d/2)-1;
		    });

		d3.select(".tsunami_wrapper_div")
			.append("p")
			.text("Tsunami")
			.attr("class", "tsunami_p p")
	}

	render() {
		return (
		  <div className="comm_wrapper">
		    <div className="inner_comm" ref={inner_node => this.inner_node = inner_node}></div>
		  </div>
		);
	}
}

export default DataCommunication;
