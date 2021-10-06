import WDialog from "../Dialog/Dialog";
import "./Welcome.scss";
import ClearTwoToneIcon from "@material-ui/icons/ClearTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import MoodRoundedIcon from "@material-ui/icons/MoodRounded";
import MoreHorizTwoToneIcon from "@material-ui/icons/MoreHorizTwoTone";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { showProfile } from "../../Redux/actions/profileActions";
import { useState } from "react";
import { String } from "../../Constants/String";

function Welcome({ show, profile }) {
  const handleClose = () => {
    profile(false);
  };

  const [set, setSet] = useState(false);

  return (
    <WDialog full={set} show={show}>
      <div className={"profile flex-column adjust" + (set ? " flexSet" : "")}>
        {/* <ClearTwoToneIcon className="cancel" onClick={handleClose} /> */}
        <Avatar
          alt="Aakash Singh"
          src="https://thumbs.dreamstime.com/b/portrait-lion-black-detail-face-lion-hight-quality-portrait-lion-portrait-animal-portrait-lion-black-detail-145612151.jpg"
        />
        <div>{localStorage.getItem("userName")}</div>
        <div className="status font-700">
          Life Shrinks, or expand in proportion to one's courage
        </div>
        <ProfileOptions onClick={() => setSet(!set)} />
      </div>
    </WDialog>
  );
}

function ProfileOptions({ onClick }) {
  return (
    <div className="profileOptions flex-row">
      <div className="icon-1 flex-column adjust font-700">
        <MoodRoundedIcon onClick={onClick} />
        {String.SET_STATUS}
      </div>
      <div className="icon-2 flex-column adjust font-700">
        <EditTwoToneIcon onClick={onClick} />
        {String.PROFILE};
      </div>
      <div className="icon-3 flex-column adjust font-700">
        <MoreHorizTwoToneIcon onClick={onClick} />
        {String.MORE}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { show } = state.showProfile;
  return {
    show: show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (data) => {
      dispatch(showProfile(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
