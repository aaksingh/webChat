import { UPDATE_USER } from "../constants/constants.js";

var INITIAL_STATE = {
  users: [],
};

export const showOnlineUsers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
