/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up


export default function (state = {}, action) {
    var payload = action.payload;
    
    switch (action.type) {
        case 'SET_EARTHQUAKE_DATA':
            return {...state, static_earthquake_data: payload}
        default:
            break;
    }
    return state;
}
