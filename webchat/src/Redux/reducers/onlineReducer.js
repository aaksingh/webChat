import { ADDONLINEUSER } from "../constants/constants.js";

var INITIAL_STATE = {};

export const onlineUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDONLINEUSER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
