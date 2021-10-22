import { memo } from "react";
import "./UserInfo.scss";
import { Avatar } from "@material-ui/core";

// view = true,
const UserInfo = ({ detail, onClick }) => {
  return (
    <div className="userDetails flex-row font-family" onClick={onClick}>
      <Avatar alt="Aakash Singh" src={localStorage.getItem("userImage")} />
      <div>{detail}</div>
    </div>
  );
};

export default memo(UserInfo);
