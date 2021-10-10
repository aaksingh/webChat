import {
  LOAD_MESSAGES,
  CLEAR_MESSAGES,
  ADD_MESSAGES,
} from "../constants/constants.js";
import { MessageState } from "../../types/types";

interface DataType {
  messages: Array<MessageState>;
  receiver: string;
}

export const loadMeesages = (data: DataType) => {
  console.log(data, "Dqwdq");
  return {
    type: LOAD_MESSAGES,
    payload: data,
  };
};

export const addMessage = (data: MessageState) => {
  return {
    type: ADD_MESSAGES,
    payload: data,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
