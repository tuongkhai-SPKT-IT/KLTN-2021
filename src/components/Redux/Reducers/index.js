import {combineReducers} from 'redux';
import LoginReducer from './Login.Reducer';
import HomeReducer from './Home.Reducer';
import UserInfo from './UserInfo.Reducer';
import Profile from './Profile.Reducer';
import OtherProfile from './OtherProfile.Reducer';
import ChatReducer from './Chat.Reducer';
import Setting from './Setting.Reducer';
import NotificationsReducer from './Notification.Reducer';

const myReducer = combineReducers({
  login: LoginReducer,
  HomePage: HomeReducer,
  UserInfo: UserInfo,
  ProfileInfo: Profile,
  OtherProfile: OtherProfile,
  ChatReducer: ChatReducer,
  Setting: Setting,
  Notifications: NotificationsReducer,
});
export default myReducer;
