import * as types from '../Constant.ActionType';
var initState = {
  ownChatGroup: [],
  err_code: '',
  refresh: false,
};

var ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case types.Get_Chat_List: {
      const {data} = action;
      if (data.length === 0)
        return {...state, err_code: 'No messengers', ownChatGroup: []};
      return {...state, err_code: '', ownChatGroup: data};
    }
    case types.Clear_Chat_List: {
      return {ownChatGroup: [], err_code: '', refresh: true};
    }
    case types.Search_Chat_List: {
      const {term} = action;
      const arr = [...state.ownChatGroup];

      const searchResult = arr.filter((x) => {
        return x.friend_chat
          .toLowerCase()
          .includes(term.toLowerCase().trimEnd());
      });
      console.log(searchResult);
      return state;
      if (searchResult === undefined)
        return {...state, ownChatGroup: [], err_code: 'No result'};
      return {...state, ownChatGroup: searchResult, err_code: ''};
    }
    default:
      return state;
  }
};
export default ChatReducer;
