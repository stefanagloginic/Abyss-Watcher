import React, { Component } from 'react';
import Main from './Components/Main'
//---------------redux----------------------
import { Provider } from 'react-redux';
import { store } from './store';
//--------------CSS----------------------
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Main />
			</Provider>
		);
	}
}

export default App;
