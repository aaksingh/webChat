import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
const Users = ({ userName, id, image }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  const newMessages = useSelector((state) => state.newMessages);

  return (
    <>
      <Avatar alt="Aakash Singh" src={image} />

      <div className="nameMessage flex-column">
        <li className="chatName flex-column font-h4 font-600">{userName}</li>
      </div>

      {user?.users && user?.users?.some((user) => user?.userId === id) && (
        <span className="onLineTag"></span>
      )}

      {newMessages.ids.includes(id) && (
        <span className="newMessage flex-column adjust">1</span>
      )}
    </>
  );
};

export default Users;
