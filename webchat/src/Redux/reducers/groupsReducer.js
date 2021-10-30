import { Groups } from "../constants/constantsTypes";

export const INITIAL_STATE = {
  groups: [],
};

export const groupsList = (state = INITIAL_STATE, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case Groups.LOADGROUPS:
      return {
        ...state,
        groups: [action.payload?.data],
      };

    default:
      return state;
  }
};
