import { OnlineUser } from "../constants/constantsTypes";

var INITIAL_STATE = {
  users: [],
};

export const showOnlineUsers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OnlineUser.UPDATE_USER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
