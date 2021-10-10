import { useState, useEffect } from "react";
import "./Message.scss";
import UserAvatar from "../Avatar/Avatar";

const Message = ({ message, visible, userName }) => {
  const [link, setLink] = useState(false);

  useEffect(() => {
    (() => {
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
      var re = new RegExp(strRegex);
      setLink(re.test(message?.message.message));
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
          onClick={() => (link ? window.open(message?.message.message) : null)}
          className={link ? "link" : ""}
        >
          {message?.message.message}
        </span>
      </div>
    </div>
  );
};

export default Message;
