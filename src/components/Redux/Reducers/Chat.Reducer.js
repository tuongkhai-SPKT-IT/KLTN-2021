import * as types from '../Constant.ActionType';
var initState = {
  ownChatGroup: [],
  err_code: '',
};

var ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case types.Get_Chat_List: {
      const {data} = action;
      return {...state, err_code: '', ownChatGroup: data};
    }
    case types.Clear_Chat_List: {
      return {ownChatGroup: [], err_code: ''};
    }
    default:
      return state;
  }
};
export default ChatReducer;
