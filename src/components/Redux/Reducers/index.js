import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import StatusReducer from './Status.Reducer';
import HomeReducer from './Home.Reducer';

const myReducer = combineReducers({
  login: LoginReducer,
  status: StatusReducer,
  HomePage: HomeReducer,
});
export default myReducer;
