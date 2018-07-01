import {combineReducers} from 'redux';

/*import your reducers */
import MenuOptionsReducer from './MenuOptionsReducer';
import DisastersDataReducer from './DisastersDataReducer';


const allReducers = combineReducers({
    menuOptions: MenuOptionsReducer,
    disastersData: DisastersDataReducer,
});

export default allReducers 