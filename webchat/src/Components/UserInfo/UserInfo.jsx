import "./UserInfo.scss";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { showProfile } from "../../Redux/actions/profileActions";

const UserInfo = ({ detail, view = true, onClick }) => {
  return (
    <>
      {view ? (
        <div className="userDetails flex-row font-family" onClick={onClick}>
          <Avatar alt="Aakash Singh" src={localStorage.getItem("userImage")} />
          <div>{detail}</div>
        </div>
      ) : (
        <div className="userDetails flex-column font-family" onClick={onClick}>
          <Avatar alt="Aakash Singh" src={null} />
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
