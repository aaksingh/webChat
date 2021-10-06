import { SET_ROOMID } from "../constants/constants";

export const INITIAL_STATE = {
  roomdId: undefined,
};

export const roomIdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROOMID:
      return {
        roomId: action.payload,
      };

    default:
      return state;
  }
};
