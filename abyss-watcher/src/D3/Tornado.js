import { select } from 'd3-selection'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import storms_data from '../data/storms_dataset'

// expecting the svg node, the path to plot points along, visible boolean, 
// and a filter function that will define what data points to display
export default (node, geoPath, visible, filter) => {
	if(!visible) {
		return;
	}
	
	var storms = select(node)
		.append( "g" )
		.attr("class", "tornado_points");

	var storms_features = storms_data.storms_json.features.filter(function(obj) {
		return filter('1/1/' + obj.properties.Year) && obj.properties.Latitude.length != 0;
	}).sort(function(a, b) {
		var storm_rect_area_a = parseInt(a.properties.Width) * parseInt(a.properties.Length);
		var storm_rect_area_b = parseInt(b.properties.Width) * parseInt(b.properties.Length);
		return storm_rect_area_b - storm_rect_area_a;
	});

	var radius = d3.scaleSqrt()
	    .domain([0, 1000])
	    .range([0, 10]);

	// setup tooltip
	var tip = d3Tip()
		.attr('class', 'd3-tip-storm d3-tip')
		.offset([-10, 0])
		.html(function(d) {
			var date = d.properties.Month + "/" + d.properties.Day + "/" + d.properties.Year;
			var location = d.properties.Location.toLowerCase();
		    return "<div style='text-align:center;'><strong style='font-size:15px;color:#dddddd;'>" 
		    	+ d.properties.Type + "</strong></div>" +
		    	"<div><strong style='font-size:12px;'>Date:</strong> <span style='color:#dddddd;font-size:12px'>" 
		    	+ date + "</span></div>" +  
		    	"<div><strong style='font-size:12px'>Location:</strong> <span style='color:#dddddd;font-size:12px'>" 
		    	+ location + "</span></div>" +
		    	"<div><strong style='font-size:12px'>Width:</strong> <span style='color:#dddddd;font-size:12px'>" 
		    	+ d.properties.Width + "</span></div>" + 
		    	"<div><strong style='font-size:12px'>Length:</strong> <span style='color:#dddddd;font-size:12px'>" 
		    	+ d.properties.Height + "km" + "</span></div>";
		});

	// add storms points
	storms.selectAll( "circle" )
		.data( storms_features )
		.enter()
		.append( "circle" )
		.attr("transform", function(d) { 
			return "translate(" + geoPath.centroid(d) + ")"; 
		})
    	.attr("r", function(d){
    		return radius(d.properties.Width);
    	})
    	.on("mouseover", function(d) {
    		d3.select(this)
				.attr( "fill", "#7cffe9" )
				.attr("fill-opacity", "1")
				.attr("stroke", "#9effee")
				.style("cursor", "pointer");
			
			tip.show(d, this);
    	})
    	.on("mouseleave", function(d) {
    		d3.select(this)
    			.attr( "stroke", "#dddddd" )
				.attr("fill-opacity", ".5")
				.attr( "fill", "#cecece" )
				.style("cursor", "default");
			
			tip.hide(d, this);
    	})
    	.attr("stroke-width", "0.2px")
		.attr( "d", geoPath );

	select(node)
		.call(tip);
}
