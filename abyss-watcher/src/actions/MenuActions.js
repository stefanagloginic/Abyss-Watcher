import obtainData from '../utils/obtainData';
import strings from '../utils/strings';

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
    var data = await obtainData(strings.earthquakes_path + year.toString());
    dispatch({
      type: 'SET_EARTHQUAKE_DATA',
      payload: data,
    });
  }
}

export const getTsunamisByYear = (year) => {
  return async (dispatch) => {
    var data = await obtainData(strings.tsunamis_path + year.toString());
    dispatch({
      type: 'SET_TSUNAMI_DATA',
      payload: data,
    });
  }
}

export const getVolcanoesByYear = (year) => {
  return async (dispatch) => {
    var data = await obtainData(strings.volcanoes_path + year.toString());
    dispatch({
      type: 'SET_VOLCANO_DATA',
      payload: data,
    });
  }
}

export const getTornadoesByYear = (year) => {
  return async (dispatch) => {
    var data = await obtainData(strings.tornadoes_path + year.toString());
    dispatch({
      type: 'SET_TORNADO_DATA',
      payload: data,
    });
  }
}