import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const ReloadHome = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.getItem(storeKeys.User_Token).then((val) => {
        if (val) {
          var param = {
            token: val,
          };
          var route = 'status/news-feed';
          var header = {
            Authorization: 'bearer' + val,
          };
          var api = new API();
          api
            .onCallAPI('get', route, {}, param, header)
            .then((res) => {
              if (res.data.error_code !== 0) {
                window.alert(res.data.message);
              } else {
                dispatch({
                  type: types.ReloadHome_Success,
                  data: res.data.data,
                  err: '',
                });
              }
            })
            .catch((err) => {
              dispatch({type: types.ReloadHome_Failed, err: err});

              console.log(err);
            });
        } else {
          dispatch({type: types.ReloadHome_Failed, err: 'No Token'});
        }
      });
    } catch (err) {
      dispatch({type: types.ReloadHome_Failed, err: err});
    }
  };
};

export const clear_Home = () => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Clear_Store_HomePage});
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Store_HomePage});
    }
  };
};
