import { memo } from "react";
import "./UserInfo.scss";
import { Avatar } from "@material-ui/core";

// view = true,
const UserInfo = ({ detail, onClick }) => {
  console.log("In  userinfo");
  return (
    // <>
    // {view ? (
    <div className="userDetails flex-row font-family" onClick={onClick}>
      {/* <div className="userDetails flex-row font-family" onClick={onClick}> */}
      <Avatar alt="Aakash Singh" src={localStorage.getItem("userImage")} />
      <div>{detail}</div>
    </div>
    //   ) : (
    //     <div className="userDetails flex-column font-family" onClick={onClick}>
    //       <Avatar alt="Aakash Singh" src={null} />
    //       <div>{detail}</div>
    //     </div>
    //   )}
    // </>
  );
};

export default memo(UserInfo);
