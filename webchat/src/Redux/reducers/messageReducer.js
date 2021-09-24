import {
  CLEAR_MESSAGES,
  LOAD_MESSAGES,
  ADD_MESSAGES,
} from "../constants/constants.js";

var INITIAL_STATE = {
  messages: [],
};

export const messageList = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case CLEAR_MESSAGES: {
      INITIAL_STATE.messages = [];
      return INITIAL_STATE;
    }

    case ADD_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, state.messages[0].push(action.payload)],
      };
    }

    default:
      return state;
  }
};
