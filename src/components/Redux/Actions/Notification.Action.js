import { getNotifications } from '../../../services/user';
import * as types from '../Constant.ActionType';

export const Fetch_Notification = () => {
    return async (dispatch) => {
        try {
            const {data, status} = await getNotifications();
            console.log(status);
            if (status) {
                dispatch({
                    type: types.Fetch_Notifications_Success,
                    data: data,
                    err: '',
                });
            }
            
        } catch (err) {
            dispatch({
                type: types.GetStatusProfile_Failed,
                err: err,
            });
        }
    };
};
