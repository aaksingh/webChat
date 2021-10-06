import { ADD_NEW_MESSAGE, CLEAR_NEW_MESSAGE } from "../constants/constants.js";

var initial = {
  ids: [],
};

export const newMessageList = (state = initial, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE: {
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case CLEAR_NEW_MESSAGE: {
      return {
        ...state,
        ids: state.ids.filter((ids) => ids === action.payload.id),
      };
    }
    default:
      return state;
  }
};
