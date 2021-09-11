import { useEffect, useState } from "react";
import "./Message.scss";
import { connect } from "react-redux";
import UserAvatar from "../Avatar/Avatar";
import { replyList } from "../../api/api";
import { ReactComponent as Reply } from "../../Assets/Reply.svg";
import { io } from "socket.io-client";

const Message = ({ message, handleClick, visible, detail, id }) => {
  const [link, setLink] = useState(false);
  const [num, setNum] = useState();

  useEffect(() => {
    (() => {
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
      var re = new RegExp(strRegex);
      setLink(re.test(message?.chat));
    })();
  }, [message]);

  //IIFE practice
  useEffect(() => {
    (async () => {
      let data = await replyList(message._id);
      setNum(data.data.length);
    })();
  }, [message._id]);

  return (
    <div className={"message flex-column" + (visible ? " show" : "")}>
      {visible ? (
        <div className="nameTime flex-row">
          <UserAvatar id="2" />
          <div className="name">
            {localStorage.getItem("userId") === message.senderId
              ? localStorage.getItem("userName")
              : detail}
          </div>
        </div>
      ) : null}

      <div className="messageSection flex-column">
        {id === 1 && (
          <div className={"menulist flex-row"}>
            <Reply
              onClick={handleClick}
              style={{ cursor: "pointer", color: "white", width: "16px" }}
            />
          </div>
        )}
        {/* <div className="time">
          {message?.time[1]} {message?.time[2]}
        </div>{" "} */}
        <span
          onClick={() => (link ? window.open(message?.chat) : null)}
          className={link ? "link" : null}
        >
          {message?.message.message}
        </span>
        <span className="replySpan" onClick={handleClick}>
          {num > 0 ? (num > 1 ? `${num} replies` : `${num} reply`) : null}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state.users;
  const { friendDetail } = state.friendDetails;
  return {
    users: users[0],
    detail: friendDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return;
};
export default connect(mapStateToProps, mapDispatchToProps)(Message);

// <FileCopyOutlinedIcon
// style={{ cursor: "pointer", color: "white" }}
// onClick={() => {
//   window.navigator.clipboard.writeText(message?.chat);
// }}
// />
