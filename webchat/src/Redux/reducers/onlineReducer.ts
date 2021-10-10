import { AddOnlineUser } from "../constants/constantsTypes";

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
    case AddOnlineUser.ADDONLINEUSER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
