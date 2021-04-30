import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as myConst from '../../Constants';
var initState = {
  srcData: [],
  err_code: '',
};

var HomeReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ReloadHome_Success: {
      const {data} = action;
      return {...state, err_code: '', srcData: data};
    }
    case types.Clear_Store_HomePage: {
      return {srcData: [], err_code: ''};
    }
    default:
      return state;
  }
};
export default HomeReducer;
