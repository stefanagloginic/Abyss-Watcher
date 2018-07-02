//---------------redux modules and reducers-------
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import allReducers from '../reducers';

const defaultStoreValues = {
	menuOptions: {
		earthquake_options: {type: "EARTHQUAKES", visible: true},
		hurricane_options: {type: "HURRICANES", visible: false},
		storm_options: {type: "STORMS", visible: false},
		tornado_options: {type: "TORNADOES", visible: false},
		tsunami_options: {type: "TSUNAMIS", visible: false},
		volcano_options: {type: "VOLCANOES", visible: false},
		year: 2005,
	},
	disastersData: {
		static_earthquake_data: [],
		static_tsunami_data: [],
		static_volcanoes_data: [],
		static_tornadoes_data: [],
	}
};

export const store = createStore(
	allReducers,
	defaultStoreValues,
	applyMiddleware(thunk, promise, logger)
)