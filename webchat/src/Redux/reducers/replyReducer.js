import { CLEAR_REPLY, LOAD_REPLY, ADD_REPLY } from "../constants/constants.js";

var STATE = {
  reply: [],
};

export const myReply = (state = STATE, action) => {
  switch (action.type) {
    case LOAD_REPLY:
      return {
        ...state,
        reply: [...state.reply, action.payload],
      };

    case CLEAR_REPLY: {
      STATE.reply = [];
      return STATE;
    }

    case ADD_REPLY:
      return {
        ...state,
        reply: [...state.reply, state.reply[0].push(action.payload)],
      };

    default:
      return state;
  }
};
