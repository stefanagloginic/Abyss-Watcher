import { select } from 'd3-selection'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { feature } from 'topojson-client'
import volcano_with_impacts_data from '../data/volcano_with_impacts_dataset'

// expecting the svg node, the path to plot points along, visible boolean, 
// and a filter function that will define what data points to display
export default (node, geoPath, visible, filter) => {
	if(!visible) {
		return;
	}
	
	var volcanos = select(node)
		.append( "g" )
		.attr("class", "volcano_points");

	var volcano_features = volcano_with_impacts_data.volcano_json.features.filter(function(obj, i) {
		return filter('1/1/' + obj.properties.Year);
	}).sort(function(a, b) {
		return b.properties.Elevation - a.properties.Elevation;
	});

	var radius = d3.scaleSqrt()
	    .domain([0, 5000])
	    .range([0, 15]);

	// setup tooltip
	var tip = d3Tip()
		.attr('class', 'd3-tip-volcano d3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var date = d.properties.Month + "/" + d.properties.Day + "/" + d.properties.Year;
		    return "<div style='text-align:center;'><strong style='font-size:15px;color:#faff72;'>" 
		    	+ d.properties.Type + "</strong></div>" +
		    	"<div><strong style='font-size:12px;'>Date:</strong> <span style='color:#faff72;font-size:12px'>" 
		    	+ date + "</span></div>" +  
		    	"<div><strong style='font-size:12px'>Name:</strong> <span style='color:#faff72;font-size:12px'>" 
		    	+ d.properties.Name + "</span></div>" +
		    	"<div><strong style='font-size:12px'>Elevation:</strong> <span style='color:#faff72;font-size:12px'>" 
		    	+ d.properties.Elevation + "</span></div>" + 
		    	"<div><strong style='font-size:12px'>Location:</strong> <span style='color:#faff72;font-size:12px'>" 
		    	+ d.properties.Location + "</span></div>" + 
		    	"<div><strong style='font-size:12px'>Volcano Type:</strong> <span style='color:#faff72;font-size:12px'>" 
		    	+ d.properties.Volcano_Type + "</span></div>";
		});

	// add volcano points
	volcanos.selectAll( "circle" )
		.data( volcano_features )
		.enter()
		.append( "circle" )
		.attr("transform", function(d) { 
			return "translate(" + geoPath.centroid(d) + ")"; 
		})
    	.attr("r", function(d){
    		console.log(d);
    		return radius(d.properties.Elevation);
    	})
    	.on("mouseover", function(d) {
    		d3.select(this)
				.attr( "fill", "#73ff60" )
				.attr("fill-opacity", "1")
				.attr("stroke", "#8cff7c")
				.style("cursor", "pointer");
			
			tip.show(d, this);
    	})
    	.on("mouseleave", function(d) {
    		d3.select(this)
    			.attr( "stroke", "#fdffba" )
				.attr("fill-opacity", ".5")
				.attr( "fill", "#fbff99" )
				.style("cursor", "default");
			
			tip.hide(d, this);
    	})
    	.attr("stroke-width", "0.2px")
		.attr( "d", geoPath );

	select(node)
		.call(tip);
}