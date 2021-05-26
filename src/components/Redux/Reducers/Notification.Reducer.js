import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constant.ActionType';
const initState = {
  notifications: [],
  err_code: '',
};

var NotificationReducer = (state = initState, action) => {
  switch (action.type) {
    case keys.Fetch_Notifications_Success: {
      const {data} = action;
      return {...state, notifications: data, err_code: ''};
    }
    default:
      return state;
  }
};
export default NotificationReducer;
