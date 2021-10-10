import { NewMessages } from "../constants/constantsTypes";

export const loadNewMessage = (data: Object) => {
  return {
    type: NewMessages.ADD_NEW_MESSAGE,
    payload: data,
  };
};

export const clearNewMessageses = (id: string) => {
  return {
    type: NewMessages.CLEAR_NEW_MESSAGE,
    payload: id,
  };
};
