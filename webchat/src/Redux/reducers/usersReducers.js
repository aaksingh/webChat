import { Users } from "../constants/constantsTypes";

export const INITIAL_STATE = {
  users: [],
};

export const usersList = (state = INITIAL_STATE, action) => {
  // console.log(action.payload);

  switch (action.type) {
    case Users.LOAD_USERS:
      return {
        ...state,
        users: [action.payload.data],
      };

    default:
      return state;
  }
};
