import { useEffect, useState } from "react";
import "./Reply.scss";
import { ReactComponent as Cross } from "../../Assets/Cross.svg";
import { connect } from "react-redux";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { days, months } from "../../Constants/Array.js";
import { chatList, create } from "../../api/api";
import {
  addReply,
  clearReply,
  loadReply,
} from "../../Redux/actions/replyActions";
const Reply = ({
  message,
  show,
  setShow,
  addreply,
  sendreply,
  myReply,
  user,
  clear,
}) => {
  console.log(myReply);
  const handleCreate = async (e) => {
    e.preventDefault();

    let currentTimestamp = new Date();
    const dateDetails = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    }).format(currentTimestamp);

    let time = dateDetails.split(" ");

    time.push(days[currentTimestamp.getDay()]);
    time.push(months[currentTimestamp.getMonth()]);

    if (text) {
      let messageData = {
        time: time,
        senderId: localStorage.getItem("userId"),
        receiverId: user,
        messageId: message._id,
        roomId: null,
        referenceId: message._id,
        message: {
          message: text,
          read: false,
          attachments: false,
        },
      };
      try {
        await create(messageData);
        addreply(messageData);
      } catch (err) {
        console.log(err.message, "Fail to send message");
        return;
      }

      setText("");
    }
  };

  useEffect(() => {
    (async () => {
      clear();
      let data = await chatList(message._id);
      console.log(data);
      sendreply(data.data);
    })();
  }, [message._id]);

  const [text, setText] = useState("");
  return (
    <div
      className={`side flex-column ${show ? " sideReply" : " sideReplyHide"}`}
    >
      <div className="thread flex-column">
        Thread
        <Cross className="cross" onClick={() => setShow(!show)} />
      </div>
      {/* <div className="header flex-row">
        <ChatHeader detail={detail} show={false} />
      </div> */}
      <div className="sideMessage">
        <Message
          id={message?._id}
          message={message}
          handleClick={null}
          visible={"false"}
        />
      </div>
      <div className="messageSpan flex-column">
        {myReply?.map((r, i) => {
          return (
            <Message
              visible={
                !(i > 0 && myReply[i - 1].senderId === myReply[i].senderId)
              }
              message={r}
              handleClick={null}
            />
          );
        })}
      </div>
      <div className="replyInput">
        <Input
          {...{ text, setText }}
          handleCreate={handleCreate}
          variant="Message"
        />
      </div>
    </div>
  );
};

const mapReplyToProps = (s) => {
  const { friendDetail } = s.friendDetails;
  const myReply = s.reply;
  const { users } = s.users;

  return {
    detail: friendDetail,
    myReply: myReply.reply[0],
    users: users[0],
  };
};

const mapReplyToDispatch = (dispatch) => {
  return {
    addreply: (data) => {
      dispatch(addReply(data));
    },

    sendreply: (data) => {
      dispatch(loadReply(data));
    },
    clear: () => {
      dispatch(clearReply());
    },
  };
};

export default connect(mapReplyToProps, mapReplyToDispatch)(Reply);
