import UserAvatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Users = ({ userName, id, index }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  const newMessages = useSelector((state) => state.newMessages);

  useEffect(() => {
    console.log(newMessages.ids.includes(id));
  }, [newMessages]);
  return (
    <>
      <UserAvatar id="2" />
      <div className="nameMessage flex-column">
        <div className="chatName flex-column font-h4 font-600">{userName}</div>
      </div>

      {user?.users && user?.users?.some((user) => user?.userId === id) && (
        <div className="onLineTag"></div>
      )}
      {/* {
        Show Message one message received
      } */}
      {newMessages.ids.includes(id) && (
        <div className="newMessage">
          <div className="new">1</div>
        </div>
      )}
    </>
  );
};

export default Users;
