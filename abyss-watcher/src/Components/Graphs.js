import React, {Component} from 'react';
import IconButton from './IconButton'
import WorldMap from '../Icons/worldMap'
import '../Stylesheets/Graphs.css'

class Graphs extends Component {
	render() {
		return(
			<div className="graphs_wrapper">
				<p>Hello Graphs!</p>
				<IconButton link="/" label="Maps" icon={<WorldMap size={65} />} />
			</div>
		)
	}
}

export default Graphs;