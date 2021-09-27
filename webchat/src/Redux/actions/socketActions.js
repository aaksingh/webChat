import { UPDATE_USER } from "../constants/constants.js";

export const loadOnlineUsers = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
