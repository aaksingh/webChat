import { LOAD_MESSAGES, ADD_MESSAGES } from "../constants/constants.js";

interface State {
  [key: string]: Array<any>;
}

var initialState = {};
export const messageList = (
  state: State = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        [action.payload.receiver]: action.payload.messages,
      };

    case ADD_MESSAGES:
      let a = action.payload.message;
      var message = state[action.payload.receiver];

      message.push(a);
      return {
        ...state,
        [action.payload.receiver]: message,
      };

    default:
      return state;
  }
};
