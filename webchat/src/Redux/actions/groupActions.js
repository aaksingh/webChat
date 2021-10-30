import { Groups } from "../constants/constantsTypes";

export const loadGroups = (data) => {
  return {
    type: Groups.LOADGROUPS,
    payload: { data: data },
  };
};
