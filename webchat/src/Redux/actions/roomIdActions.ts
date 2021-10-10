import { RoomId } from "../constants/constantsTypes";

export const setRoomId = (id: string) => {
  return {
    type: RoomId.SET_ROOMID,
    payload: id,
  };
};
