import { ADD_NEW_MESSAGE, CLEAR_NEW_MESSAGE } from "../constants/constants";

export const loadNewMessage = (data) => {
  return {
    type: ADD_NEW_MESSAGE,
    payload: data,
  };
};

export const clearNewMessageses = (id) => {
  return {
    type: CLEAR_NEW_MESSAGE,
    payload: id,
  };
};
