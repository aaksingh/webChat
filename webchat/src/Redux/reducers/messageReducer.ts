import { LOAD_MESSAGES, ADD_MESSAGES } from "../constants/constants.js";

interface State {
  [key: string]: Array<any>;
}

export const messageList = (state: State = {}, action: any) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      return {
        ...state,
        [action.payload.receiver]: action.payload.messages,
      };
    }

    case ADD_MESSAGES: {
      let a = action.payload.message;
      var message = state[action.payload.receiver];

      message.push(a);
      return {
        ...state,
        [action.payload.receiver]: message,
      };
    }

    default:
      return state;
  }
};
