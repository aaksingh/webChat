import { useState, useEffect, useRef } from "react";
import { userDetails, addFriends, friendlist } from "../../api/api";
import { connect } from "react-redux";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import { String } from "../../Constants/String";
import { userDetail } from "../../Redux/actions/friendDetails";
import { showProfile } from "../../Redux/actions/profileActions";
import { io } from "socket.io-client";
import { loadOnlineUsers } from "../../Redux/actions/socketActions";
import loadable from "@loadable/component";
import "./DashBoard.scss";

const Wait = loadable(() => import("../../Components/Wait/Wait"), {
  fallback: <></>,
});
const Welcome = loadable(() => import("../../Components/Welcome/Welcome"), {
  fallback: <></>,
});
const UserAvatar = loadable(() => import("../../Components/Avatar/Avatar"), {
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

const DashBoard = ({ userName, onClick, send, users, details, profile }) => {
  const [id, setId] = useState(null);

  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [checking, setChecking] = useState("");
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
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", localStorage.getItem("userId"));
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    socket.current.on("getUsers", (data) => {
      // console.log(data, "direct users");
      setChecking(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log(data);
    });
  }, []);

  const handleChat = async (j) => {
    const data = await friendlist(localStorage.getItem("userId"));

    for (let i = 0; i < data.data?.length; i++) {
      let idList = data.data[i]?.members;

      if (idList.includes(localStorage.getItem("userId") && users[j]._id)) {
        setId(users[j]._id);
        setConversationId(data.data[i]?._id);
      }
    }
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
              {users?.map((user, i) => {
                return (
                  user?._id !== localStorage.getItem("userId") && (
                    <div
                      className="list flex-row"
                      onClick={() => {
                        details(user.username);
                        handleChat(i, user._id);
                      }}
                    >
                      <UserAvatar id="2" />
                      <div className="nameMessage flex-column">
                        <div className="chatName flex-column font-h4 font-600">
                          {user.username}
                        </div>
                      </div>
                      {checking?.some(
                        (check) => check.userId === user?._id
                      ) && <div className="onLineTag"></div>}
                    </div>
                  )
                );
              })}
            </div>
            <div className="dm adspbtw font-h2 font-600">Groups</div>
            <div>--None--</div>
            <CButton title="Logout" disabled={false} onClick={handleClick} />
          </div>
          {conversationId ? (
            <Chat
              user={id}
              conversationId={conversationId}
              socket={socket}
              check={checking}
            />
          ) : (
            <>
              <Connected />
              {/* <CreateGroup /> */}
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
    onlineUsers: (data) => {
      dispatch(loadOnlineUsers(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
