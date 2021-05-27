import {getNotifications} from '../../../services/user';
import * as types from '../Constant.ActionType';

export const Fetch_Notification = () => {
  return async (dispatch) => {
    try {
      const {data, status} = await getNotifications();
        if (status) {
        dispatch({
          type: types.Fetch_Notifications_Success,
          data: data,
          err: '',
        });
      }
    } catch (err) {
      dispatch({
        type: types.Fetch_Notifications_Failed,
        err: err,
      });
      //   alert(err);
    }
  };
};

export const Clear_Notification = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.Clear_Notification, //        err: '',
      });
    } catch (err) {
      alert(err);
    }
  };
};
