import { useState, useEffect, memo } from "react";
import "./Message.scss";
import { Avatar } from "@material-ui/core";
import { ReactComponent as Image } from "../../Assets/Images.svg";
import WDialog from "../Dialog/Dialog";
const Message = ({ message, visible, userName, image, attachments }) => {
  const [link, setLink] = useState(false);
  const [img, setImg] = useState("");
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
          <Avatar alt="Aakash Singh" src={image} />
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
          ) : (
            <Image style={{ cursor: "pointer" }} />
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(Message);
