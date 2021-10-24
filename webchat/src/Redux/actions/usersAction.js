import { Users } from "../constants/constantsTypes";

export const loadUsers = (data) => {
  return {
    type: Users.LOAD_USERS,
    payload: { data: data },
  };
};
