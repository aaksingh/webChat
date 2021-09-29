import {
  CLEAR_MESSAGES,
  LOAD_MESSAGES,
  ADD_MESSAGES,
} from "../constants/constants.js";

var MESSAGE_STATE = {};

let hash = new Map();

export const messagesList = (state = MESSAGE_STATE, action) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      hash = [[action.payload.receiverId, action.payload.messages]];

      console.log(hash);
      return {
        ...state,
        messages: [...state.messages, hash],
      };
    }
    default:
      return state;
  }
};
