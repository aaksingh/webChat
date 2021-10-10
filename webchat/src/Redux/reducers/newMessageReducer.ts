import { NewMessages } from "../constants/constantsTypes";

interface STATE {
  ids: Array<string>;
}
var initial: STATE = {
  ids: [],
};

export const newMessageList = (state = initial, action: any) => {
  switch (action.type) {
    case NewMessages.ADD_NEW_MESSAGE: {
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case NewMessages.CLEAR_NEW_MESSAGE: {
      return {
        ...state,
        ids: state.ids.filter((ids) => ids === action.payload.id),
      };
    }
    default:
      return state;
  }
};
