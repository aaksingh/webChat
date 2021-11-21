import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
const Users = ({ userName, id, image }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  const newMessages = useSelector((state) => state.newMessages);

  const [pop, setpop] = useState([]);
  useEffect(() => {
    setpop(localStorage.getItem("unread"));
  }, [user, newMessages]);
  console.log(pop);
  return (
    <>
      <Avatar alt="Aakash Singh" src={image} />

      <div className="nameMessage flex-column">
        <li className="chatName flex-column font-h4 font-600">{userName}</li>
      </div>

      {/* {user?.users && user?.users?.some((user) => user?.userId === id) && (
        <span className="onLineTag"></span>
      )} */}

      {pop?.includes(id) && (
        <span className="newMessage flex-column adjust">1</span>
      )}
    </>
  );
};

export default Users;
