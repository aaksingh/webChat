import { LoadReply } from "../constants/constantsTypes";

var initialState = {};
export const loadReplyList = (state = initialState, action) => {
  // console.log(action.payload?.data);
  switch (action.type) {
    case LoadReply.LOAD_MESSAGE:
      return {
        replyMessage: action.payload.data,
      };

    case LoadReply.REMOVE_MESSAGE:
      return {};

    default:
      return state;
  }
};
