import { USER_DETAIL } from "../constants/constants.js";

export const INITIAL_STATE = {
  friendDetail: "",
};

export const detailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        friendDetail: action.payload,
      };

    default:
      return state;
  }
};

//User Details will be saved later
