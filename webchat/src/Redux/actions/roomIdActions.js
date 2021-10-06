import { SET_ROOMID } from "../constants/constants";

export const setRoomId = (id) => {
  return {
    type: SET_ROOMID,
    payload: id,
  };
};
