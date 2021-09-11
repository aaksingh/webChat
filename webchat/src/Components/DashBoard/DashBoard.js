import { useState, useEffect } from "react";
import UserInfo from "../UserInfo/UserInfo";
import "./DashBoard.scss";
import { userDetails, addFriends, friendlist } from "../../api/api";
import Chat from "../Chat/Chat";
import { connect } from "react-redux";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import Connected from "../Connected/Connected";
import { String } from "../../Constants/String";
import Welcome from "../Welcome/Welcome";
import UserAvatar from "../Avatar/Avatar";
import { userDetail } from "../../Redux/actions/friendDetails";
import CButton from "../Button/CButton";
import Wait from "../Wait/Wait";
import { showProfile } from "../../Redux/actions/profileActions";
import { io } from "socket.io-client";

const DashBoard = ({ userName, onClick, send, users, details, profile }) => {
  const [id, setId] = useState(null);
  const [socket, setSocket] = useState();
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
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
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3002", {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    socket?.emit("message", localStorage.getItem("userId"));

    socket?.on("Online", (mess) => {
      console.log(mess, "is online");
    });
  }, [socket]);

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
    profile(true);
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
                    </div>
                  )
                );
              })}
            </div>
            <div className="dm adspbtw font-h2 font-600">Groups</div>
            <div>--None--</div>
            <CButton title="Logout" disabled={false} onClick={onClick} />
          </div>
          {conversationId ? (
            <Chat user={id} conversationId={conversationId} socket={socket} />
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

  return {
    users: users[0],
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

// const addFriend = async (i, id) => {
//   const data = await addFriends({
//     userId: localStorage.getItem("userId"),
//     friendId: id,
//   });
//   console.log(data);
// };
{
  /* <CButton title="Logout" disabled={false} onClick={onClick} /> */
}

// {['All mail', 'Trash', 'Spam'].map((text, index) => (
//   <ListItem button key={text}>
//     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//     <ListItemText primary={text} />
//   </ListItem>
// ))}
// </List>
