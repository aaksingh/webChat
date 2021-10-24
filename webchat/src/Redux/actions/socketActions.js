import { OnlineUser } from "../constants/constantsTypes";

export const loadOnlineUsers = (data) => {
  return {
    type: OnlineUser.UPDATE_USER,
    payload: { data: data },
  };
};
