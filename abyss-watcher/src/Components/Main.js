import React, { Component } from 'react';
import DisastersParent from './DisastersParent';
import ScaleMenu from './ScaleMenu';
//---------------redux----------------------
import { connect } from 'react-redux';
//--------------CSS----------------------

class Menu extends Component {

	render() {
		return (
			<div className="App" id="outer-container">
				<ScaleMenu 	
					pageWrapId={ "page-wrap" } 
					outerContainerId={ "outer-container" }
				/>
				<div className="main-content" id="page-wrap">
					<DisastersParent />
				</div>
			</div>
		);
	}
}


export default Menu;
