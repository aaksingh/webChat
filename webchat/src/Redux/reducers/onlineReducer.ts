import { ADDONLINEUSER } from "../constants/constants.js";

export interface OnlineUsers {
  socketId: string;
  userId: string;
}
var INITIAL_STATE: OnlineUsers = {
  socketId: "",
  userId: "",
};

export const onlineUserReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: OnlineUsers }
) => {
  switch (action.type) {
    case ADDONLINEUSER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
