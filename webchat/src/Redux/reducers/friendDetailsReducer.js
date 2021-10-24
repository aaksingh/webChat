import { UserDetail } from "../constants/constantsTypes.ts";

export const INITIAL_STATE = {
  friendDetail: "",
};

export const detailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserDetail.USER_DETAIL:
      return {
        ...state,
        friendDetail: action.payload.data,
      };

    default:
      return state;
  }
};

//User Details will be saved later
