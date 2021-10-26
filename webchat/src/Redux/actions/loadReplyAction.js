import { LoadReply } from "../constants/constantsTypes";

export const loadReplyFor = (data) => {
  // console.log(data);
  return {
    type: LoadReply.LOAD_MESSAGE,
    payload: { data: data },
  };
};

export const clearReply = () => {
  return {
    type: LoadReply.REMOVE_MESSAGE,
  };
};
