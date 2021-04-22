import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import HomeReducer from './Home.Reducer';
import UserInfo from './UserInfo.Reducer';
import Profile from './Profile.Reducer';
import OtherProfile from './OtherProfile.Reducer';
import ChatReducer from './Chat.Reducer';
const myReducer = combineReducers({
  login: LoginReducer,
  HomePage: HomeReducer,
  UserInfo: UserInfo,
  ProfileInfo: Profile,
  OtherProfile: OtherProfile,
  ChatReducer: ChatReducer,
});
export default myReducer;
