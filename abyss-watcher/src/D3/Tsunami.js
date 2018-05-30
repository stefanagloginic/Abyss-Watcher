import { select } from 'd3-selection'
import * as d3 from 'd3'
import tsunami_data from '../data/tsunami_dataset'
import d3Tip from 'd3-tip'

// expecting the svg node, the path to plot points along, visible boolean, 
// and a filter function that will define what data points to display
export default (node, geoPath, visible, filter) => {
	if(!visible) {
		return;
	}
	
	var tsunamis = select(node)
		.append("g")
		.attr("class", "tsunami_points");


	var tsunami_features = tsunami_data.tsunami_json.features.filter(function(obj) {
		return filter('1/1/' + obj.properties.Year);
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