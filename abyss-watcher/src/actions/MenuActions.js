import obtainData from '../utils/obtainData';

export const setEarthquakeOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_EARTHQUAKE_OPTIONS',
      		payload: options,
    	});
  	}
} 

export const setTsunamiOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_TSUNAMI_OPTIONS',
      		payload: options,
    	});
  	}
} 

export const setTornadoOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_TORNADO_OPTIONS',
      		payload: options,
    	});
  	}
} 

export const setVolcanoOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_VOLCANO_OPTIONS',
      		payload: options,
    	});
  	}
} 


export const setHurricanOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_HURRICANE_OPTIONS',
      		payload: options,
    	});
  	}
}

export const setStormOptions = (options) => {
  	return (dispatch) => {
    	dispatch({
      		type: 'SET_STORM_OPTIONS',
      		payload: options,
    	});
  	}
}

export const setYear = (year) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_YEAR',
      payload: year,
    });
  }
}

export const getEarthquakesByYear = (year) => {
  return async (dispatch) => {
    var data = await obtainData("https://abyss-watcher-backend.herokuapp.com/abyss-watcher/v1/earthquakes?year=" + year.toString());
    dispatch({
      type: 'SET_EARTHQUAKE_DATA',
      payload: data,
    });
  }
}