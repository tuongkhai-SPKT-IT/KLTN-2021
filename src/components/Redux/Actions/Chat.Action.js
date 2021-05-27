import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const Get_Group_Chat = () => {
  return async (dispatch) => {
    try {
      const val = await AsyncStorage.getItem(storeKeys.User_Token);
      const route = 'chat/list-messages';
      const param = {
        token: val,
      };
      const header = {
        Authorization: 'bearer' + val,
      };
      const api = new API();
      api.onCallAPI('get', route, {}, param, header).then((res) => {
        if (res.data.error_code !== 0) {
          alert(res.data.message);
          dispatch({type: types.Clear_Chat_List});
        } else {
          if (res.data.data) {
            dispatch({
              type: types.Get_Chat_List,
              data: res.data.data,
            });
          }
        }
      });
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Chat_List});
    }
  };
};

export const Clear_List_Chat = () => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Clear_Chat_List});
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Chat_List});
    }
  };
};

export const Search_Chat_List = (e) => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Search_Chat_List, term: e});
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Chat_List});
    }
  };
};
