import { UPDATE_USER } from "../constants/constants.js";

export const loadOnlineUsers = (data) => {
  console.log(data, "data is");
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
