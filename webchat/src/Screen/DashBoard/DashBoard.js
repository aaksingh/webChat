import { useState, useEffect, useRef } from "react";
import { userDetails } from "../../api/api";
import { connect } from "react-redux";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import { String } from "../../Constants/String";
import { userDetail } from "../../Redux/actions/friendDetails";
import { showProfile } from "../../Redux/actions/profileActions";
import { io } from "socket.io-client";
import { loadOnlineUsers } from "../../Redux/actions/socketActions";
import loadable from "@loadable/component";
import "./DashBoard.scss";
import { addMessage } from "../../Redux/actions/messageActions";
import Users from "../../Components/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import { loadNewMessage } from "../../Redux/actions/newMessageAction";
const Wait = loadable(() => import("../../Components/Wait/Wait"), {
  fallback: <></>,
});
const Welcome = loadable(() => import("../../Components/Welcome/Welcome"), {
  fallback: <></>,
});
const UserInfo = loadable(() => import("../../Components/UserInfo/UserInfo"), {
  fallback: <></>,
});
const Chat = loadable(() => import("../../Components/Chat/Chat"), {
  fallback: <></>,
});
const Connected = loadable(
  () => import("../../Components/Connected/Connected"),
  {
    fallback: <></>,
  }
);
const CButton = loadable(() => import("../../Components/Button/CButton"), {
  fallback: <></>,
});

const DashBoard = ({
  userName,
  onClick,
  send,
  users,
  details,
  add,
  loadOnlineUsers,
}) => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.users);
  // console.log(users);

  const val = localStorage.getItem("userId");

  const [loading, setLoading] = useState(false);
  const [senderId, setsenderId] = useState("");
  const [receiverId, setreceiverId] = useState("");

  const socket = useRef();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await userDetails();
        setLoading(false);
        send(data.data);
      } catch (err) {
        setLoading(false);
        console.log(err.message, "fail");
      }
    })();
  }, [send]);

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
      console.log(data, "Omline");
      loadOnlineUsers(data);
    });
  }, [socket, loadOnlineUsers]);
  // const user = useSelector((state) => state.showOnlineUsers);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      let messageData = {
        time: data.time,
        senderId: data.senderId,
        receiverId: data.receiverId,
        messageID: data.messageID,
        message: {
          message: data.message,
          referenceId: data.referenceId,
          read: data.read,
          attachments: data.attachments,
        },
      };
      // localStorage.removeItem("roomId");
      if (messageData.senderId === localStorage.getItem("roomId")) {
        dispatch(
          addMessage({ message: messageData, receiver: messageData.senderId })
        );
      } else {
        console.log("ewifwenf");
        dispatch(loadNewMessage({ id: messageData.senderId }));
      }
    });
  }, [add]);

  const handleChat = async (j) => {
    console.log(users[j]._id);
    localStorage.setItem("roomId", users[j]._id);

    setreceiverId(users[j]._id);
    setsenderId(localStorage.getItem("userId"));
  };

  function handleClick() {
    onClick();
  }

  return (
    <>
      {loading ? (
        <Wait />
      ) : (
        <>
          <div className="dashboard flex-column font-family">
            <div className="logo flex-row">WebChat</div>
            <UserInfo detail={userName} onClick={handleClick} />
            <Welcome />

            <div className="dm adspbtw font-h2 font-600">{String.CHAT}</div>
            <div className="userList flex-column">
              {users &&
                users.map((user, i) => {
                  return (
                    user?._id !== localStorage.getItem("userId") && (
                      <div
                        className="list flex-row"
                        onClick={() => {
                          details(user.username);
                          handleChat(i, user._id);
                        }}
                        key={i}
                      >
                        <Users
                          userName={user.username}
                          id={user._id}
                          index={i}
                        />
                      </div>
                    )
                  );
                })}
            </div>
            <div className="dm adspbtw font-h2 font-600">Groups</div>
            <div>--None--</div>
            <CButton title="Logout" disabled={false} onClick={handleClick} />
          </div>
          {receiverId ? (
            <Chat socket={socket} sender={senderId} receiver={receiverId} />
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

const mapStateToProps = (state) => {
  const { users } = state.users;
  const { showOnlineUsers } = state.showOnlineUsers;

  return {
    users: users[0],
    showOnlineUsers: showOnlineUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    send: (data) => {
      dispatch(loadUsers(data));
    },
    details: (data) => {
      dispatch(userDetail(data));
    },
    profile: (data) => {
      dispatch(showProfile(data));
    },
    // onlineUsers: (data) => {
    //   dispatch(loadOnlineUsers(data));
    // },
    add: (data) => {
      dispatch(addMessage(data));
    },
    loadOnlineUsers: (data) => {
      dispatch(loadOnlineUsers(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
