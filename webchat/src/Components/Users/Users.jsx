import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";

const Users = ({ userName, id, image }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  const newMessages = useSelector((state) => state.newMessages);

  return (
    <>
      <Avatar alt="Aakash Singh" src={image} />

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
