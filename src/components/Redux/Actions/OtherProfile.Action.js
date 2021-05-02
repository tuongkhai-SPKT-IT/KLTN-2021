import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';

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
          // dispatch({type: types.Get_IntroOther_Failed, err: err});
          console.log(err);
        });
    } catch (error) {
      dispatch({type: types.Get_IntroOther_Failed, err: err});
    }
  };
};

export const Check_Relationship = (userId) => {
  return async (dispatch) => {
    try {
      let token = '';
      await AsyncStorage.getItem(keys.User_Token).then((val) => {
        if (val) {
          token = val;
        } else return;
      });
      const route = 'user/check-relationship';
      const param = {
        friend_id: userId,
      };
      const header = {
        Authorization: 'bearer' + token,
      };
      const api = new API();
      api
        .onCallAPI('get', route, {}, param, header)
        .then((res) => {
          if (res.data.error_code !== 0) {
            dispatch({
              type: types.checkRelationship_Failed,
              err_code: res.data.message,
            });
          } else {
            if (res.data.data === 0) {
              //bạn bè
              dispatch({
                type: types.checkRelationship_Success,
                buttonFriend: {
                  title: 'Friend',
                  icon: 'user-friends',
                },
                buttonMessage: {
                  title: 'Send a message',
                  icon: 'facebook-messenger',
                },
                relationShip: true,
              });
            }

            if (res.data.data === 1) {
              dispatch({
                type: types.checkRelationship_Success,
                buttonFriend: {
                  title: 'Requested',
                  icon: 'user-times',
                },
                buttonMessage: {
                  title: 'Send a message',
                  icon: 'facebook-messenger',
                },
                relationShip: false,
              });
            }

            if (res.data.data === 2) {
              dispatch({
                type: types.checkRelationship_Success,
                buttonFriend: {title: 'Confirm', icon: 'user-check'},
                buttonMessage: {
                  title: 'Send a message',
                  icon: 'facebook-messenger',
                },
                relationShip: false,
              });
            }

            if (res.data.data === 3) {
              dispatch({
                type: types.checkRelationship_Success,
                buttonFriend: {
                  title: 'Add friend',
                  icon: 'user-plus',
                },
                buttonMessage: {
                  title: 'Send a message',
                  icon: 'facebook-messenger',
                },
                relationShip: false,
              });
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: types.checkRelationship_Failed,
            err_code: err,
          });
        });
    } catch (error) {
      dispatch({
        type: types.checkRelationship_Failed,
        err_code: error,
      });
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
    } catch (error) {
      dispatch({
        type: types.GetStatusOther_Failed,
        err: error,
      });
    }
  };
};

export const Clear_Store_Other = () => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Clear_Store_Other});
    } catch (error) {
      dispatch({type: types.Clear_Store_Other});
      console.log(error);
    }
  };
};

export const call_Add_Friend = (userId) => {
  return async (dispatch) => {
    try {
      let token = '';
      await AsyncStorage.getItem(keys.User_Token).then((val) => {
        if (val) token = val;
      });
      const route = 'request/make-friend';
      const param = {
        receiver: userId,
      };
      const header = {
        Authorization: 'bearer' + token,
      };
      const api = new API();
      api
        .onCallAPI('post', route, {}, param, header)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            dispatch({
              type: types.Add_Friend,
              buttonFriend: {
                title: 'Requested',
                icon: 'user-times',
              },
              buttonMessage: {
                title: 'Send a message',
                icon: 'facebook-messenger',
              },
              relationShip: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({type: types.Clear_Store_Other});
    }
  };
};

export const Cancel_Friend = (userId) => {
  return async (dispatch) => {
    try {
      let token = '';
      await AsyncStorage.getItem(keys.User_Token).then((val) => {
        if (val) token = val;
      });
      const param = {
        friend_id: userId,
      };
      const header = {
        Authorization: 'bearer' + token,
      };
      const route = 'request/delete-request-profile';
      const api = new API();
      api
        .onCallAPI('post', route, {}, param, header)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            dispatch({
              type: types.Cancel_Friend,
              buttonFriend: {
                title: 'Add friend',
                icon: 'user-plus',
              },
              buttonMessage: {
                title: 'Send a message',
                icon: 'facebook-messenger',
              },
              relationShip: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({type: types.Clear_Store_Other});
    }
  };
};

export const Accept_Friend = (userId) => {
  return async (dispatch) => {
    try {
      let token = '';
      await AsyncStorage.getItem(keys.User_Token).then((val) => {
        if (val) token = val;
      });
      const param = {
        friend_id: userId,
        update_type: 3,
      };
      const header = {
        Authorization: 'bearer' + token,
      };

      const route = 'user/update/info';
      const api = new API();
      api
        .onCallAPI('post', route, {}, param, header)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            dispatch({
              type: types.Accept_Friend,
              buttonFriend: {
                title: 'Friend',
                icon: 'user-friends',
              },
              buttonMessage: {
                title: 'Send a message',
                icon: 'facebook-messenger',
              },
              relationShip: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({type: types.Clear_Store_Other});
    }
  };
};

export const Switch_TO_Messenger = (userId) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(keys.User_Token);
      const route = 'chat/create-chat-group';
      const params = {
        user_id: userId,
      };
      const headers = {
        Authorization: 'bearer' + token,
      };
      const api = new API();
      api
        .onCallAPI('post', route, {}, params, headers)
        .then((res) => {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            if (res.data.data) {
              // console.log(res.data.data);
              dispatch({type: types.Get_Group_Chat, room: res.data.data});
            }
          }
        })
        .catch((err) => {
          alert(err);
          dispatch({type: types.Clear_Store_Other});
        });
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Store_Other});
    }
  };
};
