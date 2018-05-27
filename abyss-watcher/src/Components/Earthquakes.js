import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../Stylesheets/Earthquakes.css';

class Earthquakes extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		console.log(this.props.obtainNodeRef());
		return (
		  <div className="earthquake_wrapper" ></div>
		);
	}
}

export default Earthquakes;
