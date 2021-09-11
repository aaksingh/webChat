import { ADD_REPLY, CLEAR_REPLY, LOAD_REPLY } from "../constants/constants.js";

export const loadReply = (data) => {
  return {
    type: LOAD_REPLY,
    payload: data,
  };
};

export const addReply = (data) => {
  return {
    type: ADD_REPLY,
    payload: data,
  };
};

export const clearReply = () => {
  return {
    type: CLEAR_REPLY,
  };
};
