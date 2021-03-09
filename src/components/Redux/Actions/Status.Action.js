import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const Like = (likeNumber, index) => {
  return async (dispatch) => {
    dispatch({type: types.Like_Request});
    try {
    } catch (err) {
      dispatch({type: types.Like_Failed, errCode: err});
    }
  };
};

export const DisLike = (likeNumber, index) => {
  return async (dispatch) => {
    dispatch({type: types.DisLike_Request});
    try {
      setTimeout(() => {
        AsyncStorage.getItem(storeKeys.User_Token).then((val) => {
          if (val) {
            console.log(index);
            const route = 'status/update-status';
            const param = {
              status_id: props.index,
              like: likeNumber - 1,
              is_unlike: 1,
            };

            const header = {
              Authorization: 'bearer' + val,
            };
            var api = new API();
            api
              .onCallAPI('post', route, {}, param, header)
              .then((res) => {
                if (res.data.error_code !== 0) {
                  window.alert(res.data.message);
                } else {
                  console.log(res.data.data);
                  dispatch({type: types.DisLike_Success, err});
                  console.log(1);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            dispatch({type: types.ReloadHome_Failed, err: 'No Token'});
          }
        });
      }, 2 * 1000);
    } catch (err) {
      dispatch({type: types.DisLike_Failed, err: err});
    }
  };
};
