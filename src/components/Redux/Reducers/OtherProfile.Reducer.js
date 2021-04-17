import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constant.ActionType';
var initState = {
  intro: [],
  status: [],
  err_code: '',
};

var OtherProfile = (state = initState, action) => {
  switch (action.type) {
    case keys.Get_IntroOther_Success: {
      const {data} = action;
      return {...state, intro: data, err_code: ''};
    }
    case keys.GetStatusOther_Success: {
      const {data} = action;
      return {...state, status: data, err_code: ''};
    }
    case keys.GetStatusOther_Failed: {
      const {err} = action;
      return {...state, status: [], err_code: err};
    }

    case keys.Get_IntroOther_Failed: {
      const {err} = action;
      return {...state, intro: [], err_code: err};
    }
    default:
      return state;
  }
};
export default OtherProfile;
