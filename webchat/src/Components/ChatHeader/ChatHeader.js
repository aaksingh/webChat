import { memo } from "react";

import "./ChatHeader.scss";
import PhoneIcon from "@material-ui/icons/Phone";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VideoCallOutlinedIcon from "@material-ui/icons/VideoCallOutlined";
import SearchInput from "../SearchInput/SearchInput";
import Users from "../Users/Users";
const ChatHeader = ({ profile, detail, show, videoCalling, audioCalling }) => {
  return (
    <div className="chatHeader flex-row adspbtw">
      <Users userName={detail} image={profile} />

      {show && (
        <div className="headerContent flex-row">
          <SearchInput />
          <PhoneIcon
            className="iconParent flex-column adjust"
            onClick={audioCalling}
            style={{ color: "#a71b1b" }}
          />
          <VideoCallOutlinedIcon
            className="iconParent flex-column adjust"
            onClick={videoCalling}
          />
          <MoreVertIcon className="iconParent flex-column adjust" />
        </div>
      )}
    </div>
  );
};

export default memo(ChatHeader);
