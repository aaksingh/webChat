import UserAvatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";

const Users = ({ userName, id, index }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  // console.log(user?.users[index]?.userId);
  return (
    <>
      <UserAvatar id="2" />
      <div className="nameMessage flex-column">
        <div className="chatName flex-column font-h4 font-600">{userName}</div>
      </div>

      {user?.users && user?.users[index]?.userId === id && (
        <div className="onLineTag"></div>
      )}
    </>
  );
};

export default Users;
