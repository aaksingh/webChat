import { NewMessages } from "../constants/constantsTypes";

var initial = {
  ids: [],
};

export const newMessageList = (state = initial, action) => {
  // console.log(action);
  switch (action.type) {
    case NewMessages.ADD_NEW_MESSAGE: {
      // let result = storeMessage(action, state);
      let mess = [];

      // if (localStorage.getItem("unread")) {
      //   mess.push(localStorage.getItem("unread"));
      // }

      mess.push(action.payload.data.id);

      localStorage.setItem("unread", JSON.stringify(mess));

      return mess;
    }
    case NewMessages.CLEAR_NEW_MESSAGE: {
      let mess = JSON.parse(localStorage.getItem("unread"));
      mess = mess.filter((ids) => ids !== action.payload.data);
      console.log(mess);
      localStorage.setItem("unread", JSON.stringify(mess));
      return mess;
    }
    // case NewMessages.CLEAR_NEW_MESSAGE: {
    // return {
    //   ...state,
    //   ids: state.ids.filter((ids) => ids === action.payload.data.id),
    // };
    // }

    default:
      return state;
  }
};
