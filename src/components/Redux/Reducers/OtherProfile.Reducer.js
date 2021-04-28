import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constant.ActionType';
var initState = {
  intro: {},
  status: [],
  err_code: '',
};

var OtherProfile = (state = initState, action) => {
  switch (action.type) {
    case keys.checkRelationship_Failed: {
      const {err_code} = action;
      alert(err_code);
      return;
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
      console.log(state);
      const test = {
        ...state,
        buttonFriend: buttonFriend,
        buttonMessage: buttonMessage,
        err_code: '',
        relationShip: relationShip,
      };
      console.log(test);
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
    case keys.GetStatusOther_Failed: {
      const {err} = action;
      return {...state, status: [], err_code: err};
    }

    case keys.Get_IntroOther_Failed: {
      const {err} = action;
      return {...state, intro: [], err_code: err};
    }
    case keys.Clear_Store_Other: {
      return {intro: {}, status: [], err: ''};
    }
    default:
      return state;
  }
};
export default OtherProfile;
