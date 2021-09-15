import { useRef, useState, useEffect } from "react";
import "./Chat.scss";
import "../../Styles/style.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { create, chatList } from "../../api/api";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { connect } from "react-redux";
import { days, months } from "../../Constants/Array.js";
import {
  clearMessages,
  loadMeesages,
  addMessage,
} from "../../Redux/actions/messageActions";
import Reply from "../Reply/Reply";

const Chat = ({
  user,
  conversationId,
  messages,
  send,
  clear,
  add,
  detail,
  socket,
}) => {
  const [text, setText] = useState("");
  const [repMessage, setRepMessage] = useState("");
  const [show, setShow] = useState(false);
  const scrollRefArray = useRef();

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("privatemessage", (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleCreate = async (e) => {
    e.preventDefault();

    socket.emit("private message", {
      content: text,
      to: user,
      from: localStorage.getItem("userId"),
    });

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
        conversationId: conversationId,
        message: {
          message: text,
          referenceId: null,
          read: false,
          authorId: localStorage.getItem("userId"),
          attachments: [],
        },
      };
      try {
        await create(messageData);
        setMessage(messageData);
        add(messageData);
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
      let data = await chatList(conversationId);
      send(data.data);
    })();
  }, [conversationId]);

  useEffect(() => {
    scrollRefArray.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <div className="chatReply flex-row">
      <div className="chat flex-column font-family">
        <div className="chat__Header flex-row">
          <ChatHeader detail={detail} show={true} />
        </div>
        <div className="chatSection flex-column">
          <div className="chatStart flex-column">
            {messages?.map((m, i) => {
              return (
                <div className="messageSpan flex-column" ref={scrollRefArray}>
                  <Message
                    visible={
                      !(
                        i > 0 &&
                        messages[i - 1]?.senderId === messages[i]?.senderId
                      )
                    }
                    userName={detail}
                    conId={conversationId}
                    id={m?._id}
                    i={i}
                    message={m}
                    handleClick={() => {
                      setShow(true);
                      setRepMessage(m);
                    }}
                    id={1}
                  />
                </div>
              );
            })}
          </div>
          <div className="chatInput flex-row adjust">
            <Input
              {...{ text, setText }}
              handleCreate={handleCreate}
              variant="Message"
            />
          </div>
        </div>
      </div>
      {show && (
        <Reply message={repMessage} {...{ show, setShow }} user={user} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { messages } = state.messages;

  const { friendDetail } = state.friendDetails;

  return {
    messages: messages[0],

    detail: friendDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (data) => {
      dispatch(addMessage(data));
    },
    clear: () => {
      dispatch(clearMessages());
    },
    send: (data) => {
      dispatch(loadMeesages(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

// onClick={m.referenceId ? () => showDiv(m?.referenceId) : null}

// function addToRefs(el) {
//   console.log(el);
//   if (el) {
//     scrollRefArray.current.push(el);
//   }
// }

// function showDiv(id) {
// for (let j = 0; j < messages.length; j++) {
//   if (messages[j]?._id === id) {
//     setfocus(j);
//     scrollRefArray.current[j]?.scrollIntoView({
//       behaviour: "smooth",
//       block: "start",
//     });
//     return;
//   }
// }
// }
