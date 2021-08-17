import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import "./ChatHeader.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import SearchInput from "../SearchInput/SearchInput";
const ChatHeader = ({ detail, show }) => {
  return (
    <div className="chatHeader flex-row adspbtw">
      <UserInfo detail={detail} />

      {show && (
        <div className="headerContent flex-row">
          <SearchInput />
          <div className="iconParent flex-column adjust">
            <PhoneIcon style={{ color: "#a71b1b" }} />
          </div>
          <div className="iconParent flex-column adjust">
            <VideoCallOutlinedIcon />
          </div>
          <div className="iconParent flex-column adjust">
            <MoreVertIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
