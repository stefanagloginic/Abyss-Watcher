import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import '../Stylesheets/DisastersMap.css';

class DisastersMap extends Component {
	componentDidMount() {
		const { google } = this.props;
		this.google = google;
		this.loadMap();
	}

	loadMap() {
		console.log(this.google);
	}

	render() {
		return (
		  <div className="DisastersMap">
		    <Map google={this.props.google} />
		  </div>
		);
	}
}

export default DisastersMap;
