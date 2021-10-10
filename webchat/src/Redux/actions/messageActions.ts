import { Messages } from "../constants/constantsTypes";
import { MessageState } from "../../types/types";

interface DataType {
  messages: Array<MessageState>;
  receiver: string;
}

export const loadMeesages = (data: DataType) => {
  return {
    type: Messages.LOAD_MESSAGES,
    payload: data,
  };
};

export const addMessage = (data: any) => {
  return {
    type: Messages.ADD_MESSAGES,
    payload: data,
  };
};

export const clearMessages = () => {
  return {
    type: Messages.CLEAR_MESSAGES,
  };
};
