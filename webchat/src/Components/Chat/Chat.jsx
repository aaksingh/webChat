import { useRef, useState, useEffect, memo } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Chat.scss";
import "../../Styles/style.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { create, chatList, upload } from "../../api/api";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { days, months } from "../../Constants/Array.js";
import { loadMeesages, addMessage } from "../../Redux/actions/messageActions";
import { clearNewMessageses } from "../../Redux/actions/newMessageAction";
import Intro from "../Intro/Intro";
import WDialog from "../Dialog/Dialog";
const Chat = ({ profile, socket, sender, receiver }) => {
  const messages = useSelector((state) => state.messages);
  const [file, setFile] = useState("");

  const { friendDetail } = useSelector((state) => state.friendDetails);
  const { users } = useSelector((state) => state.showOnlineUsers);

  const dispatch = useDispatch();

  const [mess, setMess] = useState();
  const [text, setText] = useState("");
  const scrollRefArray = useRef();

  useEffect(() => {
    dispatch(clearNewMessageses(receiver));
  }, [receiver]);

  useEffect(() => {
    (async () => {
      setTimeout(() => {}, 100);
      let data = await chatList(sender, receiver);

      dispatch(loadMeesages({ messages: data.data, receiver }));
    })();
  }, [sender, receiver, dispatch]);

  useEffect(() => {
    messages && setMess(messages[receiver]);
  }, [messages, socket, receiver]);

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

    let id = Date.now();
    if (text) {
      let messageData = {
        time: time,
        senderId: sender,
        receiverId: receiver,
        messageId: id,
        timestamp: Date.now(),
        message: {
          message: text,
          referenceId: null,
          read: false,
          attachments: false,
        },
      };
      try {
        await create(messageData);
        dispatch(addMessage({ message: messageData, receiver: receiver }));

        users &&
          users?.some((user) => user?.userId === receiver) &&
          socket.current.emit("sendmessage", {
            time: time,
            senderId: sender,
            receiverId: receiver,
            messageId: id,
            message: text,
            referenceId: null,
            read: false,
            attachments: false,
          });
      } catch (err) {
        console.log(err.message, "Fail to send message");
        return;
      }

      setText("");
    }
    if (file) {
      const data = new FormData();

      data.append("file", file);
      data.append("sender", sender);
      data.append("receiver", receiver);

      const result = await upload(data);

      if (result) {
        dispatch(
          addMessage({
            message: {
              time: time,
              senderId: sender,
              receiverId: receiver,
              messageId: result.data.id,
              message: {
                message: result.data.path,
                referenceId: null,
                read: false,
                attachments: true,
              },
            },

            receiver: receiver,
          })
        );
        let messageId = result.id;
        let message = result.path;

        users &&
          users?.some((user) => user?.userId === receiver) &&
          socket.current.emit("sendmessage", {
            time: time,
            senderId: sender,
            receiverId: receiver,
            messageId: messageId,
            message: message,
            referenceId: null,
            read: false,
            attachments: true,
          });
      }
      setFile("");
    }
  };

  useEffect(() => {
    scrollRefArray.current?.scrollIntoView({ behaviour: "smooth" });
  }, [mess, messages]);

  return (
    <div className="chatReply flex-row">
      <WDialog show={file} maxWidth="100%" minWidth="100%" height="100%">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            className="cancelButton"
            style={{
              fontSize: "30px",
              fontWeight: "800",
              right: "10px",
              position: "absolute",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setFile("");
            }}
          >
            X
          </div>

          <img
            src={file && URL.createObjectURL(file)}
            alt="img"
            style={{
              height: "80%",
              width: "80%",
            }}
          />

          <button onClick={handleCreate}>Send</button>
        </div>
      </WDialog>
      <div className="chat flex-column font-family">
        <ChatHeader profile={profile} detail={friendDetail} show={true} />

        <div className="chatSection flex-column">
          <div className="chatStart flex-column">
            <Intro {...{ profile, sender, receiver, friendDetail }} />
            {mess?.map((m, i) => {
              return (
                <div
                  className="messageSpan flex-column"
                  ref={scrollRefArray}
                  key={i}
                >
                  {
                    <Message
                      visible={
                        !(i > 0 && mess[i - 1]?.senderId === mess[i]?.senderId)
                      }
                      userName={friendDetail}
                      message={m}
                      image={profile}
                      attachments={m?.message?.attachments}
                      sender={m?.senderId}
                      receiver={m?.receiverId}
                    />
                  }
                </div>
              );
            })}
          </div>
          <div className="chatInput flex-row adjust">
            <Input
              {...{ text, setText }}
              handleCreate={handleCreate}
              variant="Message"
              receiver={receiver}
              sender={sender}
              {...{ file, setFile }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);
/* {show && (
  <Reply message={repMessage} {...{ show, setShow }} user={user} />
  )} */

// import Reply from "../Reply/Reply";
// import { ReactComponent as ShareScreen } from "../../Assets/ShareScreen.svg";

// const [repMessage, setRepMessage] = useState("");
// const [show, setShow] = useState(false);

// const screenShare = () => {
//   navigator.mediaDevices
//     .getDisplayMedia({ video: true })
//     .then((currentStream) => {
//       setStream(currentStream);
//       myVideo.current.srcObject = currentStream;
//     })
//     .catch((err) => console.log(err));
// };

//Video call code ends here

// Video call code
// const [stream, setStream] = useState(null);
// const [screen, setScreen] = useState(null);
// const myVideo = useRef();

// const videoCall = () => {
//   navigator.mediaDevices
//     .getUserMedia({ video: true, audio: true })
//     .then((currentStream) => {
//       setStream(currentStream);
//       myVideo.current.srcObject = currentStream;
//     })
//     .catch((err) => console.log(err));
// };
// useEffect(() => {
//   videoCall();
// }, []);

// import WDialog from "../Dialog/Dialog";

/* <WDialog show={true}>
            {" "}
            118
            <div className="video">
            <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className="videoCont"
            />
            </div>
            </WDialog> */

// dispatch(clearMessages());
