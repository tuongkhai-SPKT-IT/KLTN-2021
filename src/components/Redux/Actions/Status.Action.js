import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const PostStatus = (info) => {
  return async (dispatch) => {
    dispatch({type: types.Post_Status_Request});
    try {
      const params = info;
      const route = 'status/upload-status';
      var api = new API();
      api
        .onCallAPI('post', route, {}, params, {})
        .then((res) => {
          if (res.data.error_code !== 0) {
            window.alert(res.data.message);
            AsyncStorage.setItem(storeKeys.Already_login, 'false');
            dispatch({
              type: types.Login_Fail,
              err: res.data.message,
            });
          } else {
            console.log(res.data.data);
            if (res.data.data.phone_verified) {
              AsyncStorage.setItem(storeKeys.User_Token, res.data.data.token);
              AsyncStorage.setItem(
                storeKeys.User_Avatar,
                res.data.data.user_avatar,
              );
              AsyncStorage.setItem(
                storeKeys.User_Name,
                res.data.data.user_name,
              );
              AsyncStorage.setItem(
                storeKeys.User_Cover,
                res.data.data.user_cover,
              );
              AsyncStorage.setItem(
                storeKeys.User_ProfLink,
                res.data.data.no_sign_profile,
              );
              dispatch({
                type: types.Login_Success,
                err: '',
              });
            } else {
              dispatch({
                type: types.Login_Fail,
                err: 'Phone is not verifed',
              });
            }
          }
        })
        .catch((err) => {
          AsyncStorage.setItem(storeKeys.Already_login, 'false');
          dispatch({
            type: types.Login_Fail,
            err: err,
          });
          console.log(err);
        });
    } catch (err) {
      AsyncStorage.setItem(storeKeys.Already_login, 'false');

      dispatch({
        type: types.Login_Fail,
        err: err,
      });
    }
  };
};