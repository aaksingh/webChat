import { NewMessages } from "../constants/constantsTypes";

var initial = {
  ids: [],
};

export const newMessageList = (state = initial, action) => {
  switch (action.type) {
    case NewMessages.ADD_NEW_MESSAGE: {
      return {
        ...state,
        ids: [...state.ids, action.payload.data.id],
      };
    }

    case NewMessages.CLEAR_NEW_MESSAGE: {
      return {
        ...state,
        ids: state.ids.filter((ids) => ids === action.payload.data.id),
      };
    }
    default:
      return state;
  }
};
