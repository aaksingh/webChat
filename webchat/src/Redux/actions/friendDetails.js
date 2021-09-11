import { USER_DETAIL } from "../constants/constants.js";

export const userDetail = (data) => {
  return {
    type: USER_DETAIL,
    payload: data,
  };
};
