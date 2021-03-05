import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as myConst from '../../Constants';
var initState = {
  err: '',
  liked: false,
  loading: false,
};

var StatusReducer = (state = initState, action) => {
  switch (action.type) {
    case types.Like_Request:
    case types.DisLike_Request: {
      return {loading: true};
    }
    case types.DisLike_Failed:
    case types.Like_Failed: {
      const {errCode} = action;
      return {...state, err: errCode, loading: false};
    }
    case types.Like_Success: {
      return {liked: true, loading: false, err: ''};
    }
    case types.DisLike_Success: {
      return {liked: false, loading: false, err: ''};
    }

    default:
      return state;
  }
};
export default StatusReducer;
