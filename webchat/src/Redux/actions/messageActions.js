import {
  LOAD_MESSAGES,
  CLEAR_MESSAGES,
  ADD_MESSAGES,
} from "../constants/constants.js";

export const loadMeesages = (data) => {
  return {
    type: LOAD_MESSAGES,
    payload: data,
  };
};

export const addMessage = (data) => {
  return {
    type: ADD_MESSAGES,
    payload: data,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
