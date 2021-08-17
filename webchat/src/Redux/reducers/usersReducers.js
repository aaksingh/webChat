import { LOAD_USERS } from "../constants/constants.js";

export const INITIAL_STATE = {
  users: [],
};

export const usersList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
