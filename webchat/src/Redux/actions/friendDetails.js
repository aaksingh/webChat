import { UserDetail } from "../constants/constantsTypes";

export const userDetail = (data) => {
  return {
    type: UserDetail.USER_DETAIL,
    payload: data,
  };
};
