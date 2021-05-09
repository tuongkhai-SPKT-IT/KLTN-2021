import * as types from '../Constant.ActionType';
import API from '../../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../../Constants';

export const Change_Dob_Setting = (day, month, year) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(storeKeys.User_Token);
      const param = {
        //'00/00/0000'
        dOb: day + '/' + month + '/' + year,
        update_type: 0,
        password: document.getElementById('password2').value,
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
            // console.log(res.data.data)
            document.getElementById('btnStart').click();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Store_Settings});
    }
  };
};

export const Change_User_Name = (firstname, lastname, password) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(storeKeys.User_Token);
      const param = {
        last_name: lastname,
        first_name: firstname,
        update_type: 0,
        password: password,
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
            dispatch({
              type: types.Change_Setting_Failed,
              error_code: res.data.message,
            });
          } else {
            console.log(res.data.data);

            dispatch({
              type: types.Change_Data_UserName,
              firstname: firstname,
              lastname: lastname,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: types.Change_Setting_Failed,
            error_code: err,
          });
        });
    } catch (err) {
      dispatch({
        type: types.Change_Setting_Failed,
        error_code: err,
      });
    }
  };
};
export const Change_User_Contact = (email, phone, password) => {
  return async (dispatch) => {
    try {
      let param = {update_type: 0, password: password};
      const token = await AsyncStorage.getItem(storeKeys.User_Token);
      if (email.length > 0) param.email = email;
      if (phone.length > 0) param.phone = phone;
      const header = {
        Authorization: 'bearer' + token,
      };
      const route = 'user/update/info';
      const api = new API();
      api
        .onCallAPI('post', route, {}, param, header)
        .then((res) => {
          if (res.data.error_code !== 0) {
            dispatch({
              type: types.Change_Setting_Failed,
              error_code: res.data.message,
            });
          } else {
            // console.log(res.data.data);

            dispatch({
              type: types.Change_Data_Contact,
              email: email ? email : '',
              phone: phone ? phone : '',
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: types.Change_Setting_Failed,
            error_code: err,
          });
        });
    } catch (err) {
      dispatch({
        type: types.Change_Setting_Failed,
        error_code: err,
      });
    }
  };
};
export const Fetch_Setting = () => {
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
            alert(res.data.message);
          } else {
            const data = {
              userName: res.data.data.user_name,
              email: res.data.data.email,
              phone: res.data.data.phone,
              dob: res.data.data.dOb,
              sex: res.data.data.sex,
              firstName: res.data.data.first_name,
              lastName: res.data.data.last_name,
            };
            dispatch({
              type: types.Fetch_Data_Setting,
              data: data,
            });
          }
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  };
};
// export const Fetch_Setting = () => {
//   return async (dispatch) => {
//     try {
//       const val = await AsyncStorage.getItem(storeKeys.User_Token);
//       const param = {
//         type_search: '1',
//         token: val,
//       };
//       const route = 'user/search-v1';
//       const header = {
//         Authorization: 'bearer' + val,
//       };
//       const api = API();

//       //   const data = {
//       //     userName: res.data.data.userName,
//       //     email: res.data.data.email,
//       //     phone: res.data.data.phone,
//       //     dob: res.data.data.dob,
//       //     sex: res.data.data.sex,
//       //     firstName: res.data.data.firstName,
//       //     lastName: res.data.data.lastName,
//       //   };
//       dispatch({
//         type: types.Fetch_Data_Setting,
//         data: {},
//         // data,
//       });
//     } catch (err) {
//       alert(err);
//     }
//   };
// };
export const Clear_Setting = () => {
  return async (dispatch) => {
    try {
      dispatch({type: types.Clear_Store_Settings});
    } catch (err) {
      alert(err);
      dispatch({type: types.Clear_Store_Settings});
    }
  };
};
