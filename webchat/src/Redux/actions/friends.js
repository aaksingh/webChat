import { Friends } from "../constants/constantsTypes";

export const addFriend = (data) => {
  return {
    type: Friends.ADD_FRIEND,
    payload: { data: data },
  };
};
