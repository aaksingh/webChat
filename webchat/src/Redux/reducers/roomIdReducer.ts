import { RoomId } from "../constants/constantsTypes";

export interface RoomIdReducer {
  roomId: string;
}

export const INITIAL_STATE: RoomIdReducer = {
  roomId: "",
};

export const roomIdReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case RoomId.SET_ROOMID:
      return {
        roomId: action.payload,
      };

    default:
      return state;
  }
};
