import UserAvatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import reducer from "../../store";
interface Props {
  userName: string;
  id: string;
}
interface UserDetails {
  userId: string;
  socketId: string;
}
const Users = ({ userName, id }: Props) => {
  type RootState = ReturnType<typeof reducer>;
  const user = useSelector((state: RootState) => state.showOnlineUsers);
  const newMessages = useSelector((state: RootState) => state.newMessages);

  return (
    <>
      <UserAvatar id="2" />
      <div className="nameMessage flex-column">
        <div className="chatName flex-column font-h4 font-600">{userName}</div>
      </div>

      {user?.users &&
        user?.users?.some((user: UserDetails) => user?.userId === id) && (
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
