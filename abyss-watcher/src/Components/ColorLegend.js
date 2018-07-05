import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
//--------------CSS----------------------
import '../Stylesheets/ColorLegend.css';

class ColorLegend extends Component {
	constructor(props){
		super(props)
	}

	render() {
		const { name, color } = this.props;

		return (
			<div>
				<div className="d3_wrapper"></div>
				<p>{ name }</p>
			</div>
		);
	}
}

ColorLegend.propTypes = {
	// color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default ColorLegend;
