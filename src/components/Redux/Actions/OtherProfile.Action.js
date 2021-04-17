import * as types from '../Constant.ActionType';
import API from '../../API/API';

export const Get_Intro_Other = (userId) => {
  return async (dispatch) => {
    try {
      const params = {
        type_search: '1',
        user_id: userId,
      };
      const route = 'user/search-v1';
      const headers = {};
      var api = new API();
      api
        .onCallAPI('get', route, {}, params, headers)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            dispatch({
              type: types.Get_IntroOther_Success,
              data: res.data.data,
            });
          }
        })
        .catch((err) => {
          dispatch({type: types.Get_IntroOther_Failed, err: err});
          console.log(err);
        });
    } catch (err) {
      dispatch({type: types.Get_IntroOther_Failed, err: err});
    }
  };
};

export const Get_Status_Other = (userId) => {
  return async (dispatch) => {
    try {
      const params = {
        user_id: userId,
        type_search: 1,
      };
      const route = 'status/load-personal-status';

      const headers = {};
      const api = new API();
      api
        .onCallAPI('get', route, {}, params, headers)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
            dispatch({
              type: types.GetStatusOther_Failed,
              err: res.data.message,
            });
          } else {
            dispatch({
              type: types.GetStatusOther_Success,
              data: res.data.data,
              err: '',
            });
          }
        })
        .catch((err) => {
          dispatch({type: types.GetStatusOther_Failed, err: err});

          console.log(err);
        });
    } catch (err) {
      dispatch({
        type: types.GetStatusOther_Failed,
        err: err,
      });
    }
  };
};
