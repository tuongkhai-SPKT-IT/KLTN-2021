import * as types from '../Constant.ActionType';
var initState = {
  userName: '',
  email: '',
  phone: '',
  dob: '01/01/0001',
  sex: true,
  lastName: '',
  firstName: '',
  err_code: '',
};

var Setting = (state = initState, action) => {
  switch (action.type) {
    case types.Fetch_Data_Setting: {
      const {data} = action;
      const fetch = {
        userName: data.userName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        sex: data.sex,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      return {...fetch, err_code: ''};
    }
    case types.Change_Data_UserName: {
      const {firstname, lastname} = action;
      const username = lastname + ' ' + firstname;
      return {
        ...state,
        err_code: '',
        firstName: firstname,
        lastName: lastname,
        userName: username,
      };
    }
    case types.Change_Data_Contact: {
      const {email, phone} = action;
      if (email !== '') return {...state, err_code: '', email: email};
      if (phone !== '') return {...state, err_code: '', phone: phone};
    }
    case types.Change_Setting_Failed: {
      const {error_code} = action;
      alert(error_code);
      return {...state, err_code: error_code};
    }
    case types.Clear_Store_Settings: {
      return {
        userName: '',
        email: '',
        phone: '',
        dob: '01/01/0001',
        sex: true,
        err_code: '',
      };
    }
    default:
      return state;
  }
};
export default Setting;
