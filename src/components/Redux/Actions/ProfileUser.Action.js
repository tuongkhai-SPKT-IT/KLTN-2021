import * as types from '../Constant.ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';
import API from '../../API/API';
export const Get_IntroUser = () => {
  return async (dispatch) => {
    try {
      const val = await AsyncStorage.getItem(storeKeys.User_Token);
    
      const params = {
        type_search: '1',
        token: val,
      };
      const route = 'user/search-v1';
      const headers = {
        Authorization: 'bearer' + val,
      };
      const api = new API();

      api
        .onCallAPI('get', route, {}, params, headers)
        .then((res) => {
          if (res.data.error_code !== 0) {
            dispatch({
              type: types.Get_IntroUser_Failed,
              err: res.data.message,
            });
          } else {
            // console.log(res.data.data);
            dispatch({
              type: types.Get_IntroUser_Success,
              data: res.data.data,
            });

            AsyncStorage.setItem(
              storeKeys.User_Avatar,
              res.data.data.user_avatar,
            );
            AsyncStorage.setItem(
              storeKeys.User_Cover,
              res.data.data.user_cover,
            );
            AsyncStorage.setItem(storeKeys.User_Name, res.data.data.user_name);
          }
        })
        .catch((err) => {
          dispatch({
            type: types.Get_IntroUser_Failed,
            err: err,
          });
          console.log(err);
        });
    } catch (err) {
      dispatch({
        type: types.Get_IntroUser_Failed,
        err: err,
      });
      console.log(err);
    }
  };
};

export const Clear_Store_Profile = () => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Clear_Store_Profile});
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Store_Profile});
    }
  };
};

export const Get_StatusProfile = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.getItem(storeKeys.User_Token).then((val) => {
        if (val) {
          const params = {
            token: val,
          };
          const route = 'status/load-personal-status';

          const headers = {};
          const api = new API();
          api
            .onCallAPI('get', route, {}, params, headers)
            .then((res) => {
              if (res.data.error_code !== 0) {
                alert(res.data.message);
              } else {
                dispatch({
                  type: types.GetStatusProfile_Success,
                  data: res.data.data,
                  err: '',
                });
              }
            })
            .catch((err) => {
              dispatch({type: types.GetStatusProfile_Failed, err: err});
            });
        } else {
          dispatch({
            type: types.GetStatusProfile_Failed,
            err: 'No Token',
          });
        }
      });
    } catch (err) {
      dispatch({
        type: types.GetStatusProfile_Failed,
        err: err,
      });
    }
  };
};
