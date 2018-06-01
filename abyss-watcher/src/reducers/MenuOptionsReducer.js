/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up


export default function (state = {}, action) {
    var payload = action.payload;
    
    switch (action.type) {
        case 'SET_EARTHQUAKE_OPTIONS':
            return {...state, earthquake_options: payload};
        case 'SET_TSUNAMI_OPTIONS':
        	return {...state, tsunami_options: payload};
        case 'SET_TORNADO_OPTIONS':
            return {...state, tornado_options: payload};
        case 'SET_VOLCANO_OPTIONS':
            return {...state, volcano_options: payload};
        case 'SET_HURRICANE_OPTIONS':
            return {...state, hurricane_options: payload};
        case 'SET_STORM_OPTIONS':
            return {...state, storm_options: payload};
        case 'SET_YEAR':
            return {...state, year: payload };
        default:
            break;
    }
    return state;
}