import { SET_ROOMID } from "../constants/constants";

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
    case SET_ROOMID:
      return {
        roomId: action.payload,
      };

    default:
      return state;
  }
};
