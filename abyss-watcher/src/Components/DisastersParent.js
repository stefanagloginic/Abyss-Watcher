import React, { Component } from 'react';
import DisastersMap from './DisastersMap';
import key from '../Credentials/key'

//import the GoogleApiWrapper
import {Map, GoogleApiWrapper, Marker } from 'google-maps-react'


class DisastersParent extends Component {
  render() {
    return (
 		<DisastersMap google={this.props.google} />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key.googleMapKey
})(DisastersParent)
