import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as myConst from '../../Constants';
var initState = {
  data: null,
};

var HomeReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default HomeReducer;
