import { ADDONLINEUSER } from "../constants/constants.js";

export const loadOnlineUser = (data) => {
  return {
    type: ADDONLINEUSER,
    payload: data,
  };
};
