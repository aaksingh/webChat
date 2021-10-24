import { NewMessages } from "../constants/constantsTypes";

export const loadNewMessage = (data) => {
  return {
    type: NewMessages.ADD_NEW_MESSAGE,
    payload: { data: data },
  };
};

export const clearNewMessageses = (id) => {
  return {
    type: NewMessages.CLEAR_NEW_MESSAGE,
    payload: { data: id },
  };
};
