import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import HomeReducer from './Home.Reducer';
import UserInfo from './UserInfo.Reducer';
import Profile from './Profile.Reducer';
const myReducer = combineReducers({
  login: LoginReducer,
  HomePage: HomeReducer,
  UserInfo: UserInfo,
  ProfileInfo: Profile,
});
export default myReducer;
