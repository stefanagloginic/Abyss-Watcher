import { select } from 'd3-selection'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import earthquake_data from '../data/earthquake_dataset'

// expecting the svg node, the path to plot points along, visible boolean, 
// and a filter function that will define what data points to display
export default (node, geoPath, visible, filter) => {
	if(!visible) {
		return;
	}
	
	var earthquakes = select(node)
		.append( "g" )
		.attr("class", "earthquake_points");

	var earthquake_features = earthquake_data.earthquake_json.features.filter(function(obj) {
		return filter(obj.properties.Date);
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