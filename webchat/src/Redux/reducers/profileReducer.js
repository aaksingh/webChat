import { Profile } from "../constants/constantsTypes";

var INITIAL_STATE = {
  show: false,
};

export const showProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Profile.SHOW_PROFILE:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return state;
  }
};
