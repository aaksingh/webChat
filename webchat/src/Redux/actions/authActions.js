import { Cred } from "../constants/constantsTypes.ts";

export const signIn = (formData) => {
  return {
    type: Cred.SIGN_IN,
    payload: { data: formData },
  };
};

export const signUp = (formData) => {
  return {
    type: Cred.SIGN_UP,
    payload: { data: formData },
  };
};

// export const signUp = (formData) => {};
