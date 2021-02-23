import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as myConst from '../../Constants';
var initState = {
  authentication: false,
  err_code: '',
  signingUp: false,
};

var UpStatusReducer = (state = initState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};
export default UpStatusReducer;
