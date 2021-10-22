import { memo } from "react";

import "./ChatHeader.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import SearchInput from "../SearchInput/SearchInput";
import Users from "../Users/Users";
const ChatHeader = ({ profile, detail, show }) => {
  return (
    <div className="chatHeader flex-row adspbtw">
      <Users userName={detail} image={profile} />

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

export default memo(ChatHeader);
