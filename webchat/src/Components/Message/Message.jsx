import { useState, useEffect, memo } from "react";
import "./Message.scss";
import sendImage from "../../Assets/sendImage.png";
import receiveImage from "../../Assets/receiveimage.png";
const Message = ({ message, visible, userName, attachments, sender }) => {
  const [link, setLink] = useState(false);
  useEffect(() => {
    (() => {
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
      var re = new RegExp(strRegex);
      setLink(re.test(message?.message.message));
    })();
  }, [message]);
  console.log("erer");
  return (
    <div className={"message flex-column" + (visible ? " show" : "")}>
      {visible ? (
        <div className="nameTime flex-row">
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
          {!attachments ? (
            message?.message.message
          ) : sender !== localStorage.getItem("userId") ? (
            <a
              href={`http://localhost:3001/${message?.message.message}`}
              download
              target="_blank"
            >
              <img src={receiveImage} alt="receiverImage" />
            </a>
          ) : (
            <a
              href={`http://localhost:3001/${message?.message.message}`}
              download
              target="_blank"
            >
              <img src={sendImage} alt="SendImage" />
            </a>
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(Message);
