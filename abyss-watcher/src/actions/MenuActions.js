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