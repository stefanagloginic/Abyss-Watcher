import React, {Component} from 'react';
import IconButton from './IconButton'
import GlobeIcon from '../Icons/globe'
import '../Stylesheets/Graphs.css'

class Graphs extends Component {
	render() {
		return(
			<div className="graphs_wrapper">
				<p>Hello Graphs!</p>
				<IconButton link="/" label="Maps" icon={<GlobeIcon size={65} />} />
			</div>
		)
	}
}

export default Graphs;