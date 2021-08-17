import React from "react";
import "./UserInfo.scss";
import UserAvatar from "../Avatar/Avatar";

const UserInfo = ({ detail }) => {
  return (
    <div className="userDetails flex-row font-family">
      <UserAvatar id="2" />
      <div>{detail}</div>
    </div>
  );
};

export default UserInfo;
