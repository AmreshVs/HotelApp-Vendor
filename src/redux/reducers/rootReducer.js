import {combineReducers} from 'redux';
import initialAppState from './initialAppState';
import HomeDataReducer from './homeDataReducer';
import CommonDataReducer from './commonDataReducer';
// import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    initialState: initialAppState,
    common: CommonDataReducer,
    homeData: HomeDataReducer,
    // form: formReducer
});

export default rootReducer;