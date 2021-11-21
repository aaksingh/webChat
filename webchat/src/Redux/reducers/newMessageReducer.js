import { NewMessages } from "../constants/constantsTypes";

var initial = {
  ids: [],
};

export const newMessageList = (state = initial, action) => {
  switch (action.type) {
    case NewMessages.ADD_NEW_MESSAGE: {
      // let result = storeMessage(action, state);
      let mess = [];
      if (localStorage.getItem("unread")) {
        console.log("erer");
        mess.push(localStorage.getItem("unread"));
      }

      mess.push(action.payload.data.id);

      localStorage.setItem("unread", mess);
      console.log(localStorage.getItem("unread"));
      return mess;
    }

    case NewMessages.CLEAR_NEW_MESSAGE: {
      return {
        ...state,
        ids: state.ids.filter((ids) => ids === action.payload.data.id),
      };
    }

    default:
      return state;
  }
};
