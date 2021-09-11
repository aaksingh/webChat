import { LOAD_USERS } from "../constants/constants.js";

export const loadUsers = (data) => {
  return {
    type: LOAD_USERS,
    payload: data,
  };
};
