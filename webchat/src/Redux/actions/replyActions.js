import { Reply } from "../constants/constantsTypes";

export const loadReply = (data) => {
  return {
    type: Reply.LOAD_REPLY,
    payload: data,
  };
};

export const addReply = (data) => {
  return {
    type: Reply.ADD_REPLY,
    payload: data,
  };
};

export const clearReply = () => {
  return {
    type: Reply.CLEAR_REPLY,
  };
};
