import React, { Component } from 'react';
import DisastersParent from './Components/DisastersParent';
import ScaleMenu from './Components/ScaleMenu';
import YearSlider from './Components/YearSlider';
//---------------redux----------------------
import { Provider} from 'react-redux';
import { store } from './store';
//--------------CSS----------------------
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<div className="App" id="outer-container">
					<ScaleMenu 	
						pageWrapId={ "page-wrap" } 
						outerContainerId={ "outer-container" }
					/>
					<div className="main-content" id="page-wrap">
						<DisastersParent />
						<YearSlider />
					</div>
				</div>
			</Provider>
		);
	}
}

export default App;
