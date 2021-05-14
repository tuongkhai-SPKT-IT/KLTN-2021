import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as myConst from '../../Constants';
var initState = {
  authentication: false,
  err_code: '',
  signingUp: false,
};

var LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case types.Login_Request: {
      return {...state, authentication: true};
    }
    case types.Login_Success: {
      return {...state, err_code: '', authentication: false};
    }
    case types.Login_Fail: {
      const {err} = action;
      return {...state, err_code: err, authentication: false};
    }
    case types.Register_Request: {
      return {...state, signingUp: true};
    }
    case types.Register_Success: {
      return {...state, signingUp: false, err_code: ''};
    }
    case types.Register_Fail: {
      const {err} = action;
      alert(err);
      return {...state, signingUp: false, err_code: err};
    }
    default:
      return state;
  }
};
export default LoginReducer;
