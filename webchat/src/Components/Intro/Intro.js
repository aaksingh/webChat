import { Avatar } from "@material-ui/core";
import "./Intro.scss";
const Intro = ({ profile, sender, receiver, friendDetail }) => {
  return (
    <div className="intro">
      <Avatar src={profile} style={{ height: "150px", width: "150px" }} />
      <h1>
        {friendDetail} {receiver}
      </h1>
      <span>
        This is the begining of your direct message history with{" "}
        <strong>{friendDetail}</strong>
      </span>
      <div className="divider"></div>
    </div>
  );
};

export default Intro;
