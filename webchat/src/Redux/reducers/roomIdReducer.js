import { AddRoomId } from "../constants/constantsTypes";

export const INITIAL_STATE = {
  roomId: "",
};

export const roomIdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddRoomId.ADD_ROOM_ID:
      return {
        roomId: action.payload,
      };

    default:
      return state;
  }
};
