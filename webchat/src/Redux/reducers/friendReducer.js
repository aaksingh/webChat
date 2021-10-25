import { Friends } from "../constants/constantsTypes.ts";

export const INITIAL_STATE = {
  friends: [],
};

export const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Friends.ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload.data],
      };

    default:
      return state;
  }
};

//User Details will be saved later
