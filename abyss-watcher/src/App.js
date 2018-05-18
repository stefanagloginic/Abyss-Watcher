import React, { Component } from 'react';
import DisastersParent from './Components/DisastersParent';
import ScaleMenu from './Components/ScaleMenu';
import menuConfig from './Configs/menu';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App" id="outer-container">
				<ScaleMenu 	
					pageWrapId={ "page-wrap" } 
					outerContainerId={ "outer-container" }
				>
					{menuConfig.items}
				</ScaleMenu>
				<div className="main-content" id="page-wrap">
					<DisastersParent />
				</div>
			</div>
		);
	}
}

export default App;
