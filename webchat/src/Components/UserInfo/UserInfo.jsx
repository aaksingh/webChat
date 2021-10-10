import React from "react";
import "./UserInfo.scss";
import UserAvatar from "../Avatar/Avatar";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { showProfile } from "../../Redux/actions/profileActions";

const UserInfo = ({ detail, view = true, onClick }) => {
  return (
    <>
      {view ? (
        <div className="userDetails flex-row font-family" onClick={onClick}>
          <UserAvatar id="2" />
          <div>{detail}</div>
        </div>
      ) : (
        <div className="userDetails flex-column font-family" onClick={onClick}>
          <Avatar
            alt="Aakash Singh"
            src="https://thumbs.dreamstime.com/b/portrait-lion-black-detail-face-lion-hight-quality-portrait-lion-portrait-animal-portrait-lion-black-detail-145612151.jpg"
          />
          <div>{detail}</div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (data) => {
      dispatch(showProfile(data));
    },
  };
};

export default connect(mapDispatchToProps, mapStateToProps)(UserInfo);
