import { Messages } from "../constants/constantsTypes";
interface State {
  [key: string]: Array<any>;
}

var initialState = {};
export const messageList = (
  state: State = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case Messages.LOAD_MESSAGES:
      return {
        [action.payload.receiver]: action.payload.messages,
      };

    case Messages.ADD_MESSAGES:
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
