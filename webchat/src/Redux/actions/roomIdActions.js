import { AddRoomId } from "../constants/constantsTypes.ts";

export const setRoomId = (id) => {
  return {
    type: AddRoomId.ADD_ROOM_ID,
    payload: { data: id },
  };
};
