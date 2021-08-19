import { SHOW_PROFILE } from "../constants/constants.js";

export const showProfile = (data) => {
  return {
    type: SHOW_PROFILE,
    payload: data,
  };
};
