import {
  CLEAR_MESSAGES,
  LOAD_MESSAGES,
  ADD_MESSAGES,
} from "../constants/constants.js";

export const messageList = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      return {
        ...state,
        [action.payload.receiver]: action.payload.messages,
      };
    }

    case ADD_MESSAGES: {
      var a = state[action.payload.receiver];
      a.push(action.payload.message);
      return {
        ...state,
        [action.payload.receiver]: a,
      };
    }

    default:
      return state;
  }
};
