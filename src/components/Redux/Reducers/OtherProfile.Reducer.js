import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constant.ActionType';
var initState = {
  intro: {},
  status: [],
  err_code: '',
  chat_room_id: '',
  arrPrevious: [],
};

var OtherProfile = (state = initState, action) => {
  switch (action.type) {
    case keys.checkRelationship_Failed: {
      const {err_code} = action;
      if (err_code === 'Same UserID') return {...state, err_code: err_code};
      alert(err_code);
      // return {err_code: err_code};
    }
    case keys.checkRelationship_Success: {
      const {buttonFriend, buttonMessage, relationShip} = action;
      return {
        ...state,
        buttonFriend: buttonFriend,
        buttonMessage: buttonMessage,
        err_code: '',
        relationShip: relationShip,
      };
    }
    case keys.Add_Friend:
    case keys.Cancel_Friend: {
      const {buttonFriend, relationShip, buttonMessage} = action;
      return {
        ...state,
        buttonFriend: buttonFriend,
        buttonMessage: buttonMessage,
        err_code: '',
        relationShip: relationShip,
      };
    }
    case keys.Get_IntroOther_Success: {
      const {data} = action;
      return {...state, intro: data, err_code: ''};
    }
    case keys.GetStatusOther_Success: {
      const {data} = action;
      return {...state, status: data, err_code: ''};
    }
    case keys.Push_Arr_Previous: {
      const {userid} = action;
      const arrUser = state.arrPrevious;
      const value = arrUser.findIndex((x) => x === userid);
      if (value === -1) arrUser.push(userid);
      else {
        arrUser.slice(value, 1);
        arrUser.push(userid);
      }
      return {...state, arrPrevious: arrUser, err_code: ''};
    }
    case keys.Pop_Arr_Previous: {
      const arrUser = state.arrPrevious;
      arrUser.pop();
      return {...state, arrPrevious: arrUser, err_code: ''};
    }
    case keys.GetStatusOther_Failed:
    case keys.Get_IntroOther_Failed: {
      const {err} = action;
      return {err_code: err};
    }
    case keys.Get_Group_Chat: {
      const {room} = action;
      return {...state, chat_room_id: room, err_code: ''};
    }
    case keys.Clear_Store_Other: {
      return {
        ...state,
        intro: {},
        status: [],
        err_code: '',
        chat_room_id: '',
        // arrPrevious: [],
      };
    }
    default:
      return state;
  }
};
export default OtherProfile;
