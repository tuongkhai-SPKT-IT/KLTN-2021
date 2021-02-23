import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import UpStatusReducer from './UpStatus.Reducer';

const myReducer = combineReducers({
  login: LoginReducer,
  upstatus: UpStatusReducer,
});
export default myReducer;
