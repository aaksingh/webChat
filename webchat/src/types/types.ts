export interface UserOnline {
  socketId: string;
  userId: string;
}

export interface UserDetails {
  username: string;
  _id: string;
}

export interface MessageData {
  time: Array<string>;
  senderId: string;
  receiverId: string;
  messageID: string;
  message: string | number;
  referenceId: string;
  read: boolean;
  attachments: Array<any>;
}

export interface message {
  message: string | number;
  read: boolean;
  attachments: Array<any>;
  referenceId: string;
}
export interface MessageState {
  time: Array<string>;
  senderId: string;
  receiverId: string;
  messageId: string;
  message: {
    message: string | number;
    read: boolean;
    attachments: Array<any>;
    referenceId: string;
  };
  referenceId: string;
  read: boolean;
  attachments: Array<any>;
}
