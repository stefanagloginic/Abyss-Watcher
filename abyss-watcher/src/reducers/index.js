import {combineReducers} from 'redux';

/*import your reducers */
import MenuOptionsReducer from './MenuOptionsReducer';


const allReducers = combineReducers({
    menuOptions: MenuOptionsReducer,
});

export default allReducers 