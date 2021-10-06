import UserAvatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";

const Users = ({ userName, id, index }) => {
  const user = useSelector((state) => state.showOnlineUsers);

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
    </>
  );
};

export default Users;
