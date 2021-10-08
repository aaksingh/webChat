import { UPDATE_USER } from "../constants/constants.js";

export interface OnlineUsers {
  socketId: string;
  userId: string;
}

export const loadOnlineUsers = (data: OnlineUsers) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
