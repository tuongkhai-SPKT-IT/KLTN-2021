import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';
export const Get_IntroUser = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.getItem(storeKeys.User_Token).then((val) => {
        if (val) {
          const params = {
            type_search: '1',
            token: val,
          };
          const route = 'user/search-v1';
          const headers = {
            Authorization: 'bearer' + val,
          };
          var api = new API();
          api
            .onCallAPI('get', route, {}, params, headers)
            .then((res) => {
              if (res.data.error_code !== 0) {
                dispatch({
                  type: types.Get_IntroUser_Failed,
                  err: res.data.message,
                });
              } else {
                // console.log(res.data.data)
                dispatch({
                  type: types.Get_IntroUser_Success,
                  data: res.data.data,
                });
                AsyncStorage.setItem(
                  storeKeys.User_Avatar,
                  res.data.data.user_avatar,
                );
                localStorage.setItem(
                  storeKeys.User_Cover,
                  res.data.data.user_cover,
                );
              }
            })
            .catch((err) => {
              dispatch({
                type: types.Get_IntroUser_Failed,
                err: err,
              });
            });
        } else {
          dispatch({
            type: types.Get_IntroUser_Failed,
            err: 'No Token',
          });
        }
      });
    } catch (err) {
      dispatch({
        type: types.Get_IntroUser_Failed,
        err: err,
      });
    }
  };
};
