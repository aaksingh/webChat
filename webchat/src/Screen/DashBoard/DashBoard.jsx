import { useState, useEffect, useRef, useCallback } from "react";

import {
  addFriends,
  creategroup,
  groupDetails,
  userDetails,
} from "../../api/api";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import { String } from "../../Constants/String";
import { userDetail } from "../../Redux/actions/friendDetails";
import { loadOnlineUsers } from "../../Redux/actions/onlineActions";
import "./DashBoard.scss";
import { addMessage, clearMessages } from "../../Redux/actions/messageActions";
import Users from "../../Components/Users/Users";
import { loadNewMessage } from "../../Redux/actions/newMessageAction";
import { setRoomId } from "../../Redux/actions/roomIdActions";
import WDialog from "../../Components/Dialog/Dialog";

import loadable from "@loadable/component";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../../Components/InputComponents/MyButton";
import Follow from "../../Components/Follow/Follow";
import { socketActions } from "../../Redux/actions/socketActions";
import { loadGroups } from "../../Redux/actions/groupActions";
import Toggle from "../../Components/Toggle/Toggle";

const Chat = loadable(() => import("../../Components/Chat/Chat"));
const Wait = loadable(() => import("../../Components/Wait/Wait"), {
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

const DashBoard = ({ onClick }) => {
  const { users } = useSelector((state) => state.users);

  const { groups } = useSelector((state) => state.groups);

  const dispatch = useDispatch();
  const [user, setuser] = useState();
  const val = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [senderId, setsenderId] = useState("");
  const [receiverId, setreceiverId] = useState("");
  const [profile, setProfile] = useState(null);

  const [create, setCreate] = useState(false);
  const [roomName, setRoomName] = useState("");
  const socket = useRef();
  const [gm, setGm] = useState(false);

  useEffect(() => {
    setuser(users[0]);
  }, [users]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await userDetails();
        dispatch(loadUsers(data.data));
        const g = await groupDetails();
        dispatch(loadGroups(g.data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
    socket.current = io("ws://localhost:3002");

    dispatch(socketActions(socket.current));
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

  const handleChat = (j, image) => {
    setGm(false);

    dispatch(clearMessages());
    let user = users[0];

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
        referenceId: data.referenceId,
        message: {
          message: data.message,
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

  useEffect(() => {
    socket.current.on("room", (data) => {
      console.log(data);
    });

    socket.current.on("takeMessage", (data) => {
      console.log(data);
    });
  }, []);

  const [groupName, setgroupName] = useState("");
  const submit = async () => {
    const result = await creategroup({
      ownerId: localStorage.getItem("userId"),
      onwerName: "Aakash",
      roomName: roomName,
    });
    console.log(result);
    setgroupName(result.data.roomName);
    console.log(result.data);
    // socket.current.emit("room-created", roomName);
    setCreate(false);
  };
  const [roomList, setRoomList] = useState();
  const handleGroup = (g) => {
    console.log(g);
    setsenderId(localStorage.getItem("userId"));
    setreceiverId(g._id);
    setRoomList(g.room);
    setGm(true);

    socket.current.emit("user_join", { groupName: g.roomName });
  };

  useEffect(() => {
    groups[0]?.map((user) => {
      if (user.room.includes(localStorage.getItem("userId"))) {
        socket.current.emit("user_join", { groupName: user.roomName });
      }
    });
  }, [groups]);

  const [toggle, setToggle] = useState(true);

  function handleToggle() {
    setToggle((toggle) => !toggle);
  }
  return (
    <>
      {loading ? (
        <Wait />
      ) : (
        <>
          <div
            className="dashboard flex-column font-family"
            style={{ position: "relative" }}
          >
            <div className="toggleButton">
              <Toggle {...{ toggle, setToggle }} handleToggle={handleToggle} />
            </div>
            <div className="logo flex-row adjust">WebChat</div>
            <UserInfo
              detail={localStorage.getItem("userName")}
              onClick={handleClick}
            />

            <div className="dm adspbtw font-h2 font-600">{String.CHAT}</div>
            <div className="userList flex-column">
              {user &&
                user?.map((user, i) => {
                  let friendId = user._id;
                  let userId = localStorage.getItem("userId");

                  return (
                    user?._id !== localStorage.getItem("userId") && (
                      <div
                        className="flex-row"
                        style={{
                          width: "100%",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        key={i}
                      >
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

                        <Follow {...{ friendId, userId }} />
                      </div>
                    )
                  );
                })}
            </div>
            <div
              className="dm adspbtw font-h2 font-600"
              onClick={() => setCreate(true)}
            >
              Groups
            </div>
            <div className="userList flex-column">
              {groups &&
                groups[0]?.map((gro, i) => {
                  return (
                    <div
                      className="list flex-row"
                      key={i}
                      onClick={() => handleGroup(gro)}
                    >
                      <Users
                        userName={gro.roomName}
                        id={gro._id}
                        image={null}
                      />
                    </div>
                  );
                })}
            </div>
            <div style={{ bottom: "0", position: "absolute", width: "100%" }}>
              <MyButton title="Logout" id="2" handleClick={handleClick} />
            </div>
          </div>
          <WDialog show={create} maxWidth="50%" minWidth="50%" height="60%">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={submit}>Send</button>
          </WDialog>
          {!gm && receiverId ? (
            <Chat
              privateChat={gm}
              profile={profile}
              socket={socket}
              sender={senderId}
              receiver={receiverId}
            />
          ) : (
            <>{!gm && <Connected />}</>
          )}
          {gm && (
            <Chat
              room={roomList}
              privateChat={gm}
              profile={null}
              socket={socket}
              sender={senderId}
              receiver={receiverId}
            />
          )}
          {/* {gm && (
            <div>
              {" "}
              <input value={mm} onChange={(e) => setMm(e.target.value)} />
              <button
                onClick={() =>
                  sendG({ senderId, name: localStorage.getItem("userName") })
                }
              >
                {" "}
                send
              </button>
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default DashBoard;
