import { SHOW_PROFILE } from "../constants/constants.js";

var INITIAL_STATE = {
  show: false,
};

export const showProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROFILE:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return state;
  }
};
