import { useState, useEffect, useRef, useCallback } from "react";

import { userDetails } from "../../api/api";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import { String } from "../../Constants/String";
import { userDetail } from "../../Redux/actions/friendDetails";
import { loadOnlineUsers } from "../../Redux/actions/socketActions";
import "./DashBoard.scss";
import { addMessage, clearMessages } from "../../Redux/actions/messageActions";
import Users from "../../Components/Users/Users";
import { loadNewMessage } from "../../Redux/actions/newMessageAction";
import { setRoomId } from "../../Redux/actions/roomIdActions";
import WDialog from "../../Components/Dialog/Dialog";
import Input from "../../Components/InputComponents/Input";

import loadable from "@loadable/component";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../../Components/InputComponents/MyButton";

const Chat = loadable(() => import("../../Components/Chat/Chat"));
const Wait = loadable(() => import("../../Components/Wait/Wait"), {
  fallback: <></>,
});

const Welcome = loadable(() => import("../../Components/Welcome/Welcome"), {
  fallback: <></>,
});
const UserInfo = loadable(() => import("../../Components/UserInfo/UserInfo"), {
  fallback: <></>,
});

const Connected = loadable(
  () => import("../../Components/Connected/Connected"),
  {
    fallback: <></>,
  }
);

const DashBoard = ({ onClick, image }) => {
  const { users } = useSelector((state) => state.users);
  const roomId = useSelector((state) => state.roomId);
  console.log(roomId?.roomId, "roomid");
  const dispatch = useDispatch();
  const [user, setuser] = useState();
  const val = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [senderId, setsenderId] = useState("");
  const [receiverId, setreceiverId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [groupD, setGroupD] = useState(false);
  const socket = useRef();

  useEffect(() => {
    setuser(users[0]);
  }, [users]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await userDetails();
        setLoading(false);
        dispatch(loadUsers(data.data));
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    socket.current = io("ws://localhost:3002");

    return () => {
      socket.current.close();
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", localStorage.getItem("userId"));
  }, [val]);

  useEffect(() => {
    socket.current.on("getUsers", (data) => {
      dispatch(loadOnlineUsers(data));
    });
  }, [socket, loadOnlineUsers]);

  const handleChat = async (j, image) => {
    setreceiverId(null);
    dispatch(clearMessages());
    let user = users[0];
    // console.log(user[j]._id, "Setting roomId");
    dispatch(setRoomId(user[j]._id));
    localStorage.setItem("roomId", user[j]._id);
    setreceiverId(user[j]._id);
    setsenderId(localStorage.getItem("userId"));
    setProfile(image);
  };
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      let messageData = {
        time: data.time,
        senderId: data.senderId,
        receiverId: data.receiverId,
        messageId: data.messageId,
        message: {
          message: data.message,
          referenceId: data.referenceId,
          read: data.read,
          attachments: data.attachments,
        },
      };

      if (data.senderId === localStorage.getItem("roomId")) {
        dispatch(
          addMessage({ message: messageData, receiver: messageData.senderId })
        );
      } else {
        dispatch(loadNewMessage({ id: messageData.senderId }));
      }
    });
  }, [dispatch]);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <>
      {loading ? (
        <Wait />
      ) : (
        <>
          <div className="dashboard flex-column font-family">
            <div className="logo flex-row adjust">WebChat</div>
            <UserInfo
              detail={localStorage.getItem("userName")}
              onClick={handleClick}
            />
            {/* <Welcome /> */}

            <div className="dm adspbtw font-h2 font-600">{String.CHAT}</div>
            <div className="userList flex-column">
              {user &&
                user.map((user, i) => {
                  return (
                    user?._id !== localStorage.getItem("userId") && (
                      <div
                        className="list flex-row"
                        onClick={() => {
                          dispatch(userDetail(user.username));

                          handleChat(i, user.image);
                        }}
                        key={i}
                      >
                        <Users
                          userName={user.username}
                          id={user._id}
                          image={user.image}
                        />
                      </div>
                    )
                  );
                })}
            </div>
            <div
              className="dm adspbtw font-h2 font-600"
              style={{ cursor: "pointer" }}
              onClick={() => setGroupD(true)}
            >
              Groups
            </div>
            <div>--None--</div>
            {/* <CButton title="Logout" disabled={false} onClick={handleClick} /> */}
            <MyButton title="Logout" id="2" handleClick={handleClick} />
          </div>
          <WDialog show={groupD} maxWidth="50%" minWidth="50%" height="60%">
            <span>Enter Group Name</span>
            <Input
              id="3"
              // value={}
              // onChange={(e) => props.setUsername(e.target.value)}
            />
            <span>Please Choose atleast One User</span>
            <Input
              id=""
              // value={props.username}
              // onChange={(e) => props.setUsername(e.target.value)}
            />
          </WDialog>
          {receiverId ? (
            <Chat
              profile={profile}
              socket={socket}
              sender={senderId}
              receiver={receiverId}
            />
          ) : (
            <>
              <Connected />
            </>
          )}
        </>
      )}
    </>
  );
};

export default DashBoard;
