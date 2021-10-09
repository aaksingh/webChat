import { useState, useEffect } from "react";
import "./Message.scss";
import UserAvatar from "../Avatar/Avatar";

type IMessageProps = {
  message: {
    attachments: Array<any>;
    message: string | number;
    read: boolean;
    referenceId: string;
  };
  messageId: string;
  receiverId: string;
  senderId: string;
  time: Array<string>;
};

interface IProps {
  message: IMessageProps;
  visible: boolean;
  userName: string;
}

const Message = ({ message, visible, userName }: IProps) => {
  const [link, setLink] = useState(false);

  useEffect(() => {
    (() => {
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
      var re = new RegExp(strRegex);
      setLink(re.test(message?.message.message as string));
    })();
  }, [message]);

  return (
    <div className={"message flex-column" + (visible ? " show" : "")}>
      {visible ? (
        <div className="nameTime flex-row">
          <UserAvatar id="2" />
          <div className="name">
            {localStorage.getItem("userId") === message.senderId
              ? localStorage.getItem("userName")
              : userName}
          </div>
        </div>
      ) : null}

      <div className="messageSection flex-column">
        <span
          onClick={() =>
            link ? window.open(message?.message.message as string) : null
          }
          className={link ? "link" : ""}
        >
          {message?.message.message}
        </span>
      </div>
    </div>
  );
};

export default Message;
