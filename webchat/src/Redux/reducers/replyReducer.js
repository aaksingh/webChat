import { Reply } from "../constants/constantsTypes";

var STATE = {
  reply: [],
};

export const myReply = (state = STATE, action) => {
  switch (action.type) {
    case Reply.LOAD_REPLY:
      return {
        ...state,
        reply: [...state.reply, action.payload],
      };

    case Reply.CLEAR_REPLY: {
      STATE.reply = [];
      return STATE;
    }

    case Reply.ADD_REPLY:
      return {
        ...state,
        reply: [...state.reply, state.reply[0].push(action.payload)],
      };

    default:
      return state;
  }
};
