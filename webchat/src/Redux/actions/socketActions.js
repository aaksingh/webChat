import { SocketAction } from "../constants/constantsTypes";

export const socketActions = (data) => {
  return {
    type: SocketAction.ADD_SOCKET,
    payload: { data: data },
  };
};
