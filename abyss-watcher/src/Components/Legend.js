import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
//--------------CSS----------------------
import '../Stylesheets/Legend.css';
//--------------Components----------------------
import ColorLegend from './ColorLegend'

class Legend extends Component {
	constructor(props){
		super(props)
	}

	getProps = () => {
		const { plottedND } = this.props;
		this.plottedND = plottedND;
	}

	render() {
		this.getProps();

		var colorLegends = (this.plottedND) ? this.plottedND.map(function(nd) {
			return <ColorLegend name={ nd.type } />
		}) : [];

		return (
			<div className="legend_wrapper">
				{colorLegends}
			</div>
		);
	}
}

export default Legend;
