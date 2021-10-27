import { useRef, useState, useEffect, memo } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Chat.scss";
import "../../Styles/style.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import { create, chatList, upload, friendsList } from "../../api/api";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { loadMeesages, addMessage } from "../../Redux/actions/messageActions";
import { clearNewMessageses } from "../../Redux/actions/newMessageAction";
import Intro from "../Intro/Intro";
import WDialog from "../Dialog/Dialog";
import Cross from "../Cross/Cross";
import { clearReply } from "../../Redux/actions/loadReplyAction";
import { user } from "../../Redux/reducers/authReducer";
const Chat = ({
  profile,
  socket,
  sender,
  receiver,
  audioCalling,
  videoCalling,
}) => {
  const messages = useSelector((state) => state.messages);
  const [file, setFile] = useState("");

  const { friendDetail } = useSelector((state) => state.friendDetails);
  const { users } = useSelector((state) => state.showOnlineUsers);
  const { friends } = useSelector((state) => state.friends);
  const { replyMessage } = useSelector((state) => state.loadReply);
  const dispatch = useDispatch();

  const [mess, setMess] = useState([]);
  const [text, setText] = useState("");
  const scrollRefArray = useRef();
  // const scrollReply = useRef([]);

  const [canMessage, setCanMessage] = useState(false);
  const [unique, setUniqueId] = useState("");
  useEffect(() => {
    localStorage.setItem("receiverId", receiver);

    dispatch(clearNewMessageses(receiver));
  }, [receiver]);

  useEffect(() => {
    async function friendsID() {
      let result = await friendsList(receiver, sender);
      if (result.data.length) setUniqueId(result.data[0]._id);
      setCanMessage(false);
      if (friends.includes(receiver)) {
        setCanMessage(true);
      }
      if (result.data.length) {
        let data = await chatList(result.data[0]._id);

        dispatch(loadMeesages({ messages: data.data, receiver }));
      }
    }
    friendsID();
  }, [friends, receiver, sender]);

  useEffect(() => {
    messages && setMess(messages[receiver]);
  }, [messages, socket, receiver]);

  const handleCreate = async (e) => {
    e.preventDefault();

    replyMessage?.messageId && dispatch(clearReply());
    let id = Date.now();
    if (text) {
      let messageData = {
        time: id,
        senderId: sender,
        receiverId: receiver,
        messageId: id,

        roomId: unique,
        referenceId: replyMessage ? replyMessage?.messageId : null,
        message: {
          message: text,
          replied: replyMessage ? replyMessage.message.message : null,
          read: false,
          attachments: replyMessage ? 1 : null,
        },
      };
      try {
        await create(messageData);
        dispatch(addMessage({ message: messageData, receiver: receiver }));

        users &&
          users?.some((user) => user?.userId === receiver) &&
          socket.current.emit("sendmessage", {
            time: id,
            senderId: sender,
            receiverId: receiver,
            messageId: id,
            message: text,
            referenceId: replyMessage ? replyMessage?.messageId : null,
            replied: replyMessage ? replyMessage.message.message : null,
            read: false,
            attachments: replyMessage ? 1 : null,
            roomId: unique,
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
              time: id,
              senderId: sender,
              receiverId: receiver,
              messageId: result.data.id,
              roomId: unique,
              referenceId: replyMessage ? replyMessage?.messageId : null,

              message: {
                message: result.data.path,
                replied: replyMessage ? replyMessage.message.message : null,
                read: false,
                attachments: replyMessage ? 1 : null,
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
            time: id,
            senderId: sender,
            receiverId: receiver,
            messageId: messageId,
            message: message,
            referenceId: replyMessage ? replyMessage?.messageId : null,
            replied: replyMessage ? replyMessage.message.message : null,
            read: false,
            attachments: replyMessage ? 1 : null,
            roomId: unique,
          });
      }
      setFile("");
    }
  };
  const handleScroll = (i) => {
    let domElement = document.getElementById(i);
    domElement.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  useEffect(() => {
    scrollRefArray.current?.scrollIntoView({ behaviour: "smooth" });
  }, [mess, messages]);

  const handleCrossIcon = () => {
    dispatch(clearReply());
  };
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
        <ChatHeader
          profile={profile}
          detail={friendDetail}
          show={true}
          videoCalling={videoCalling}
          audioCalling={audioCalling}
        />

        <div className="chatSection flex-column">
          <div className="chatStart flex-column">
            <Intro {...{ profile, sender, receiver, friendDetail }} />
            {mess
              ? mess?.map((m, i) => {
                  return (
                    <div
                      className="messageSpan flex-column"
                      ref={scrollRefArray}
                      key={m?.messageId}
                      id={m?.messageId}
                      onClick={() =>
                        m?.referenceId && handleScroll(m?.referenceId)
                      }
                    >
                      {
                        <Message
                          visible={
                            !(
                              i > 0 &&
                              mess[i - 1]?.senderId === mess[i]?.senderId
                            )
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
                })
              : [1, 2, 3, 4, 5, 6]?.map((m, i) => {
                  return (
                    <div className="messageSpan flex-column">
                      <div
                        style={{
                          height: "2rem",
                          background: "#8e9297",
                          margin: "10px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>
                  );
                })}
          </div>
          {replyMessage && (
            <div className="replyContainer">
              {replyMessage?.message.message}
              <Cross handleCross={handleCrossIcon} />
            </div>
          )}

          <div className="chatInput flex-row adjust">
            {canMessage && (
              <Input
                {...{ text, setText }}
                handleCreate={handleCreate}
                variant="Message"
                receiver={receiver}
                sender={sender}
                {...{ file, setFile }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);
