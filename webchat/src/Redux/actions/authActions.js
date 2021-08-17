import { SIGN_IN, SIGN_UP } from "../constants/constants.js";

export const signIn = (formData) => {
  return {
    type: SIGN_IN,
    payload: formData,
  };
};

export const signUp = (formData) => {
  return {
    type: SIGN_UP,
    payload: formData,
  };
};

export const signUp = (formData) => {};
