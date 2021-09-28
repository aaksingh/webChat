import { useRef, useState, useEffect } from "react";
import "./Chat.scss";
import "../../Styles/style.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { create, chatList } from "../../api/api";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { days, months } from "../../Constants/Array.js";
import { useSelector, useDispatch } from "react-redux";
import {
  clearMessages,
  loadMeesages,
  addMessage,
} from "../../Redux/actions/messageActions";
// import WDialog from "../Dialog/Dialog";
const Chat = ({ socket, sender, receiver }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(clearMessages());
      setTimeout(() => {}, 100);
      let data = await chatList(sender, receiver);
      console.log(data);
      dispatch(loadMeesages(data.data));
    })();
  }, [sender, receiver]);

  const { messages } = useSelector((state) => state.messages);
  const { detail } = useSelector((state) => state.friendDetails);

  const [mess, setMess] = useState([]);
  useEffect(() => {
    setMess(messages[0]);
  }, [messages, socket]);

  const [text, setText] = useState("");
  const scrollRefArray = useRef();

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
        senderId: sender,
        receiverId: receiver,
        messageID: new Date(),
        message: {
          message: text,
          referenceId: null,
          read: false,
          attachments: [],
        },
      };
      try {
        await create(messageData);

        dispatch(addMessage(messageData));
        // if (check?.some((check) => check.userId === receiver)) {
        //   socket.current.emit("sendmessage", {
        //     time: time,
        //     senderId: sender,
        //     receiverId: receiver,
        //     messageId: new Date(),
        //     message: text,
        //     referenceId: null,
        //     read: false,
        //     attachments: [],
        //   });
        // }
      } catch (err) {
        console.log(err.message, "Fail to send message");
        return;
      }

      setText("");
    }
  };

  useEffect(() => {
    scrollRefArray.current?.scrollIntoView({ behaviour: "smooth" });
  }, [mess, messages]);
  return (
    <div className="chatReply flex-row">
      {/* <WDialog show={true}>
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
      </WDialog> */}
      <div className="chat flex-column font-family">
        <div className="chat__Header flex-row">
          <ChatHeader detail={detail} show={true} />
        </div>
        <div className="chatSection flex-column">
          <div className="chatStart flex-column">
            {mess?.map((m, i) => {
              return (
                <div className="messageSpan flex-column" ref={scrollRefArray}>
                  <Message
                    visible={
                      !(i > 0 && mess[i - 1]?.senderId === mess[i]?.senderId)
                    }
                    userName={detail}
                    // id={m?._id}
                    i={i}
                    message={m}
                    // handleClick={() => {
                    // setShow(true);
                    // setRepMessage(m);
                    // }}
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
    </div>
  );
};

export default Chat;
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
