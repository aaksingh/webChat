import { useState, useEffect, useRef } from "react";
import { userDetails } from "../../api/api";
import { loadUsers } from "../../Redux/actions/usersAction.js";
import { String } from "../../Constants/String";
import { userDetail } from "../../Redux/actions/friendDetails";
import { io } from "socket.io-client";
import { loadOnlineUsers } from "../../Redux/actions/socketActions";
import loadable from "@loadable/component";
import "./DashBoard.scss";
import { addMessage, clearMessages } from "../../Redux/actions/messageActions";
import Users from "../../Components/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import { loadNewMessage } from "../../Redux/actions/newMessageAction";
import { reducer } from "../../store";

import { MessageData, UserDetails, UserOnline } from "../../types/types";
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
const CButton = loadable(() => import("../../Components/Button/CButton"), {
  fallback: <></>,
});

interface Props {
  onClick: () => void;
}

const DashBoard = ({ onClick }: Props) => {
  type RootState = ReturnType<typeof reducer>;

  const { users } = useSelector((state: RootState) => state.users);
  const [user, setuser] = useState<UserDetails[]>();

  useEffect(() => {
    setuser(users[0]);
  }, [users]);

  const dispatch = useDispatch();
  const val = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [senderId, setsenderId] = useState<string | null>("");
  const [receiverId, setreceiverId] = useState<string>("");
  const socket: any = useRef();

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
    socket.current.on("getUsers", (data: UserOnline) => {
      dispatch(loadOnlineUsers(data));
    });
  }, [socket, loadOnlineUsers]);

  useEffect(() => {
    socket.current.on("getMessage", (data: MessageData) => {
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
        dispatch(loadNewMessage({ id: messageData.senderId }));
      }
    });
  }, [dispatch]);

  const handleChat = async (j: number) => {
    dispatch(clearMessages());
    let user: UserDetails[] = users[0];
    localStorage.setItem("roomId", user[j]?._id);
    setreceiverId(user[j]._id);
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
            <UserInfo
              detail={localStorage.getItem("userName")}
              onClick={handleClick}
            />
            <Welcome />

            <div className="dm adspbtw font-h2 font-600">{String.CHAT}</div>
            <div className="userList flex-column">
              {user &&
                user.map((user: UserDetails, i: number) => {
                  return (
                    user?._id !== localStorage.getItem("userId") && (
                      <div
                        className="list flex-row"
                        onClick={() => {
                          dispatch(userDetail(user.username));

                          handleChat(i);
                        }}
                        key={i}
                      >
                        <Users
                          userName={user.username}
                          id={user._id}
                          // index={i}
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

export default DashBoard;
