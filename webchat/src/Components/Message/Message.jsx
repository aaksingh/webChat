import { useState, useEffect, memo } from "react";
import "./Message.scss";

const Message = ({ message, visible, userName, attachments, sender }) => {
  const [link, setLink] = useState(false);
  useEffect(() => {
    (() => {
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
      var re = new RegExp(strRegex);
      setLink(re.test(message?.message.message));
    })();
  }, [message]);

  return (
    <div className={`message flex-column  ${visible ? " show" : ""}`}>
      {visible ? (
        <div className="nameTime flex-row">
          <div className="name">
            {localStorage.getItem("userId") === message.senderId
              ? localStorage.getItem("userName")
              : userName}
          </div>
          <div className="date">
            &nbsp;&nbsp;
            {message.time[0]}&nbsp;{message.time[3]}&nbsp;{message.time[1]}
            &nbsp;{message.time[2]}
          </div>
        </div>
      ) : null}

      <div className="messageSection flex-column">
        <div className="flex-row">
          <div className="date flex-row">
            &nbsp;{message.time[1]}
            &nbsp;{message.time[2]}&nbsp;&nbsp;
          </div>
          <span
            onClick={() =>
              link ? window.open(message?.message.message) : null
            }
            className={link ? " link" : ""}
          >
            {!attachments ? (
              message?.message.message
            ) : sender !== localStorage.getItem("userId") ? (
              <a
                href={`http://localhost:3001/${message?.message.message}`}
                download
                target="_blank"
              >
                <img
                  src={`http://localhost:3001/${message?.message.message}`}
                  alt="receiverImage"
                  style={{ width: "400px", height: "400px" }}
                />
              </a>
            ) : (
              <a
                href={`http://localhost:3001/${message?.message.message}`}
                download
                target="_blank"
              >
                <img
                  src={`http://localhost:3001/${message?.message.message}`}
                  alt="SendImage"
                  style={{ width: "400px", height: "400px" }}
                />
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
