import { useRef, useState, useEffect, memo } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useSelector, useDispatch } from "react-redux";

import "./Chat.scss";
import "../../Styles/style.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import {
  create,
  chatList,
  upload,
  friendsList,
  addUserToRoom,
} from "../../api/api";
import Message from "../Message/Message";
import Input from "../Input/Input";
import { loadMeesages, addMessage } from "../../Redux/actions/messageActions";
import { clearNewMessageses } from "../../Redux/actions/newMessageAction";
import Intro from "../Intro/Intro";
import WDialog from "../Dialog/Dialog";
import Cross from "../Cross/Cross";
import { clearReply } from "../../Redux/actions/loadReplyAction";
import MyButton from "../InputComponents/MyButton";
import PhotoViewer from "../PhotoViewer/PhotoViewer";
const Chat = ({ privateChat, profile, socket, sender, receiver, room }) => {
  const messages = useSelector((state) => state.messages);
  const [file, setFile] = useState("");

  const { friendDetail } = useSelector((state) => state.friendDetails);
  const { users } = useSelector((state) => state.showOnlineUsers);
  const { friends } = useSelector((state) => state.friends);
  const { replyMessage } = useSelector((state) => state.loadReply);
  const { roomId } = useSelector((state) => state.roomId);
  console.log(roomId, "RoomId iss");
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
    !privateChat && friendsID();
  }, [friends, receiver, sender]);
  const [join, setJoin] = useState(true);
  useEffect(() => {
    if (room?.includes(sender)) {
      setJoin(false);
      setCanMessage(true);
    } else {
      setCanMessage(false);

      setJoin(true);
    }
  }, [room]);

  useEffect(() => {
    setText("");
    setFile("");
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
        let res = await create(messageData);

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
      dispatch(clearReply());
    }
    if (file) {
      let data = new FormData();

      data.append("file", file);
      data.append("sender", sender);
      data.append("receiver", receiver);

      let result = await upload(data);

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
        alert(unique);
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

  const joinGroup = async () => {
    const result = await addUserToRoom({ sender, receiver });
    if (result.status === 201) {
      setJoin(false);
      setCanMessage(true);
    }
  };

  const sendG = async (e) => {
    e.preventDefault();
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
        let res = await create(messageData);
        console.log(res);

        dispatch(addMessage({ message: messageData, receiver: receiver }));

        // socket.current.emit("gmessage", {
        //   roomName: "dqwdqw",
        //   time: id,
        //   senderId: sender,
        //   receiverId: receiver,
        //   messageId: id,
        //   message: text,
        //   referenceId: replyMessage ? replyMessage?.messageId : null,
        //   replied: replyMessage ? replyMessage.message.message : null,
        //   read: false,
        //   attachments: replyMessage ? 1 : null,
        //   roomId: unique,
        // });
      } catch (err) {
        console.log(err.message, "Fail to send message");
        return;
      }

      setText("");
    }
  };
  return (
    <div className="chatReply flex-row">
      <PhotoViewer {...{ file, setFile, handleCreate }} />
      <div className="chat flex-column font-family">
        <ChatHeader profile={profile} detail={friendDetail} show={true} />

        <div className="chatSection flex-column">
          <div className="chatStart flex-column">
            <Intro {...{ profile, sender, receiver, friendDetail }} />
            {mess ? (
              mess?.map((m, i) => {
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
                            i > 0 && mess[i - 1]?.senderId === mess[i]?.senderId
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
            ) : (
              <>
                <Skeleton duration={1} count={5} height={10} width={`100%`} />

                <Skeleton duration={1} count={5} height={10} width={`100%`} />
              </>
            )}
          </div>
          {replyMessage && (
            <div className="replyContainer">
              {replyMessage?.message.message}
              <Cross handleCross={handleCrossIcon} />
            </div>
          )}

          <div className="chatInput flex-row adjust">
            {!privateChat ? (
              <Input
                {...{ text, setText }}
                handleCreate={handleCreate}
                variant="Message"
                receiver={receiver}
                sender={sender}
                {...{ file, setFile }}
              />
            ) : (
              canMessage && (
                <>
                  <Input
                    {...{ text, setText }}
                    handleCreate={sendG}
                    variant="Message"
                    receiver={receiver}
                    sender={sender}
                    {...{ file, setFile }}
                  />
                </>
              )
            )}

            <div style={privateChat && join ? { width: "100%" } : null}>
              {privateChat && join && (
                <MyButton title="Join" handleClick={joinGroup} id="2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);

// let val = {
//   name: data.name,
//   id: data.receiverId,
//   roomName: "dqwdqw",
//   message: mm,
// };
// socket.current.emit("gmessage", val);
