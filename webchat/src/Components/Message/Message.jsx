import { useState, useEffect, memo } from "react";
import "./Message.scss";
import { days, months } from "../../Constants/Array.js";
import Reply from "../Rep/Reply";
import { useSelector, useDispatch } from "react-redux";
import { loadReplyFor } from "../../Redux/actions/loadReplyAction";

const Message = ({ message, visible, userName, attachments, sender }) => {
  // const [link, setLink] = useState(false);
  const dispatch = useDispatch();

  const [t, setTime] = useState("");
  useEffect(() => {
    function call() {
      let currentTimestamp = new Date(message?.time);

      let time = [];
      time.push(currentTimestamp.getHours());
      time.push(currentTimestamp.getMinutes());
      time.push(currentTimestamp.getFullYear());
      time.push(days[currentTimestamp.getDay()]);
      time.push(months[currentTimestamp.getMonth()]);
      time.push(currentTimestamp.getDate());
      time.push([currentTimestamp.getMonth()]);

      setTime(time);
    }
    // (() => {
    //   var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
    //   var re = new RegExp(strRegex);
    //   setLink(re.test(message?.message.message));
    // })();

    call();
  }, [message]);
  const handleReply = () => {
    dispatch(loadReplyFor(message));
  };
  return (
    <div className={`message flex-column  ${visible ? " show" : ""}`}>
      {visible ? (
        <div className="nameTime flex-row">
          <span className="name">
            {localStorage.getItem("userId") === message.senderId
              ? localStorage.getItem("userName")
              : userName}
          </span>
          <span className="date">
            {" "}
            {t[0]}:{t[1]},&nbsp;{t[2]},&nbsp;{t[3]},&nbsp;{t[4]}
          </span>
        </div>
      ) : null}

      <div className="messageSection flex-column">
        <div className="replyIcon">
          <Reply handleReply={handleReply} />
        </div>
        <div className="flex-row">
          <span className="date flex-row">
            {t[0]}&nbsp;:&nbsp;{t[1]},&nbsp;&nbsp;{t[2]}
          </span>
          <li>
            {!message?.message.attachments ? (
              message?.message.message
            ) : (
              <div className="replyMessage">
                <div className="repliedSpan">{message?.message.replied}</div>
                <span className="repliedMessageSpan">
                  {message?.message.message}
                </span>
              </div>
            )}
          </li>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);

{
  /* <li>
{!attachments ? (
  message?.message.message
) : (
  <a
    href={`http://localhost:3001/${message?.message.message}`}
    target="_blank"
    rel="noreferre"
    download
  >
    <img
      src={`http://localhost:3001/${message?.message.message}`}
      alt="receiverImage"
      style={{ width: "400px", height: "400px" }}
    />
  </a>
)}
</li> */
}
