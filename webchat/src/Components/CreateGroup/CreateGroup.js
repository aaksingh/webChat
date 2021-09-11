import Input from "../Input/Input";
import WDialog from "../Dialog/Dialog";
import { connect } from "react-redux";
import "./CreateGroup.scss";
import { useState } from "react";
const CreateGroup = ({ users }) => {
  const [list, setList] = useState([]);
  function handleList(e, i) {
    e.preventDefault();
    setList([...list, users[i]]);
  }

  return (
    <WDialog show="true">
      Create Group
      <Input variant="Group" />
      <div className="selectUsers flex-row">
        {users?.map((user, i) => {
          if (user._id === localStorage.getItem("userId")) return;
          return (
            <div className="user flex-row" onClick={(e) => handleList(e, i)}>
              {user.username}
            </div>
          );
        })}
      </div>
    </WDialog>
  );
};

const mapStateToProps = (state) => {
  const { users } = state.users;

  return {
    users: users[0],
  };
};

const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
