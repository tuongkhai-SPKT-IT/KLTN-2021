import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import HomeReducer from './Home.Reducer';

const myReducer = combineReducers({
  login: LoginReducer,
  HomePage: HomeReducer,
});
export default myReducer;
