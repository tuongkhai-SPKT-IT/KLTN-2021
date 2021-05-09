import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constant.ActionType';
const initState = {
  introUser: {},
  statusUser: [],
  err_code: '',
};

var UserInfo = (state = initState, action) => {
  switch (action.type) {
    case keys.Get_IntroUser_Success: {
      const {data} = action;
      return {...state, introUser: data, err_code: ''};
    }
    case keys.GetStatusProfile_Success: {
      const {data} = action;
      return {...state, statusUser: data, err_code: ''};
    }
    case keys.GetStatusProfile_Failed: {
      const {err} = action;
      return {...state, statusUser: [], err_code: err};
    }
    case keys.GetStatusProfile_Success: {
      const {data} = action;
      return {...state, statusUser: data, err_code: ''};
    }
    case keys.GetStatusProfile_Failed: {
      const {err} = action;
      return {...state, statusUser: [], err_code: err};
    }
    case keys.Clear_Store_Profile: {
      return {introUser: {}, statusUser: [], err_code: ''};
    }
    default:
      return state;
  }
};
export default UserInfo;
