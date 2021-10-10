import { OnlineUser } from "../constants/constantsTypes";

export interface OnlineUsers {
  socketId: string;
  userId: string;
}

export const loadOnlineUsers = (data: OnlineUsers) => {
  return {
    type: OnlineUser.UPDATE_USER,
    payload: data,
  };
};
