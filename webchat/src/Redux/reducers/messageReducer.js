import { Messages } from "../constants/constantsTypes";

var initialState = {};
export const messageList = (state = initialState, action) => {
  switch (action.type) {
    case Messages.LOAD_MESSAGES:
      return {
        [action.payload.data.receiver]: action.payload.data.messages,
      };

    case Messages.ADD_MESSAGES:
      let a = action.payload.data.message;
      var message = state[action.payload.data.receiver];

      message.push(a);
      return {
        ...state,
        [action.payload.data.receiver]: message,
      };

    default:
      return state;
  }
};
