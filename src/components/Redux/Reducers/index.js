import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import UpStatusReducer from './UpStatus.Reducer';
import HomeReducer from './Home.Reducer';

const myReducer = combineReducers({
  login: LoginReducer,
  upstatus: UpStatusReducer,
  HomePage: HomeReducer,
});
export default myReducer;
