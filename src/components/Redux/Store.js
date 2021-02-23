import {createStore, applyMiddleware} from 'redux';
import myReducer from './Reducers/index';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(myReducer, composedEnhancer);
export default store;
    