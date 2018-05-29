//---------------redux modules and reducers-------
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import allReducers from '../reducers';

export const store = createStore(
	allReducers,
	applyMiddleware(thunk, promise, logger)
)