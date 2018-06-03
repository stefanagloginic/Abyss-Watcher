import React, { Component } from 'react';
import Main from './Components/Main'
import { BrowserRouter } from 'react-router-dom'
//---------------redux----------------------
import { Provider } from 'react-redux';
import { store } from './store';
//--------------CSS----------------------
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
