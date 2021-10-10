import { Cred } from "../constants/constantsTypes.ts";

export const signIn = (formData) => {
  return {
    type: Cred.SIGN_IN,
    payload: formData,
  };
};

export const signUp = (formData) => {
  return {
    type: Cred.SIGN_UP,
    payload: formData,
  };
};

// export const signUp = (formData) => {};
