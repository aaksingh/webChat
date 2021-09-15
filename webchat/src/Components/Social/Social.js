import { ReactComponent as Facebook } from "../../Assets/facebook.svg";
import { ReactComponent as Google } from "../../Assets/google.svg";
import { ReactComponent as Github } from "../../Assets/github.svg";
import "./Social.scss";
const Social = () => {
  return (
    <div className="social flex-row">
      <div className="icons">
        <Google />
      </div>
      <div className="icons">
        <Facebook />
      </div>
      <div className="icons">
        <Github />
      </div>
    </div>
  );
};

export default Social;
