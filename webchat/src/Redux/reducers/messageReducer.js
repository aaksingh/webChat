import { LOAD_MESSAGES, ADD_MESSAGES } from "../constants/constants.js";

export const messageList = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      return {
        ...state,
        [action.payload.receiver]: action.payload.messages,
      };
    }

    case ADD_MESSAGES: {
      let a = action.payload.message;
      var message = state[action.payload.receiver];

      message.push(a);
      return {
        ...state,
        [action.payload.receiver]: message,
      };
    }

    default:
      return state;
  }
};
