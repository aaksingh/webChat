import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { friendsList } from "../../api/api";
import { setRoomId } from "../../Redux/actions/roomIdActions";
const Users = ({ userName, id, image }) => {
  const user = useSelector((state) => state.showOnlineUsers);
  const { roomId } = useSelector((state) => state.roomId);

  const newMessages = useSelector((state) => state.newMessages);
  const [pop, setpop] = useState([]);
  const [roomid, setRoomid] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setpop(JSON.parse(localStorage.getItem("unread")));
    async function f() {
      try {
        let res = await friendsList(id, localStorage.getItem("userId"));

        if (res.data.length) {
          if (!roomId.includes(res.data[0]._id)) {
            dispatch(setRoomId(res.data[0]._id));
            setRoomid(res.data[0]._id);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    f();
  }, [id, user, newMessages]);
  console.log(roomid, pop, "Inside user");
  return (
    <>
      <Avatar alt="Aakash Singh" src={image} />

      <div className="nameMessage flex-column">
        <li className="chatName flex-column font-h4 font-600">{userName}</li>
      </div>

      {/* {user?.users && user?.users?.some((user) => user?.userId === id) && (
        <span className="onLineTag"></span>
      )} */}

      {pop?.includes(roomid) && (
        <span className="newMessage flex-column adjust">1</span>
      )}
    </>
  );
};

export default Users;
