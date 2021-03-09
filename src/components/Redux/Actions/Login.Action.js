import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const Login_Request = (info) => {
  return async (dispatch) => {
    dispatch({type: types.Login_Request});
    try {
      const params = info;
      const route = 'user/log-in';
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
            // console.log(res.data.data);
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
export const Register_Request = (info) => {
  return async (dispatch) => {
    dispatch({type: types.Register_Request});
    try {
      var params = info;
      const route = 'user/register';
      var api1 = new API();
      api1
        .onCallAPI('post', route, {}, params, {})
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
            dispatch({
              type: types.Register_Fail,
              err: err,
            });
            return;
          } else {
            dispatch({type: types.Register_Success, err: ''});
          }
        })
        .catch((err) => {
          dispatch({
            type: types.Register_Fail,
            err: err,
          });
        });
    } catch (err) {
      dispatch({
        type: types.Register_Fail,
        err: err,
      });
    }
  };
};
