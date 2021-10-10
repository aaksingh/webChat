import { Profile } from "../constants/constantsTypes";

export const showProfile = (data) => {
  return {
    type: Profile.SHOW_PROFILE,
    payload: data,
  };
};
