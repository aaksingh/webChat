import { useState } from "react";
import "./Login.scss";
import MyButton from "../../Components/InputComponents/MyButton";
import Input from "../../Components/InputComponents/Input";
import PopUp from "../../Components/PopUp/PopUp";
import { String } from "../../Constants/String";
const Login = (props) => {
  const [active, setActive] = useState(false);

  function profilePicture(e) {
    e.preventDefault();

    let im = e.target.files[0];

    var reader = new FileReader();
    if (im) {
      reader.readAsDataURL(im);
      reader.onload = () => {
        var base64 = reader.result;
        console.log(base64);
        props.setImage(base64);
      };
    }
  }
  return (
    <div className="login">
      <div className={"loginContainer"}>
        <div className={`bluebg " ${active ? "" : " blueActive"}`}>
          {active ? (
            <div className="box" onClick={() => setActive(false)}>
              <h2>{String.WELCOME}</h2>
              <h1>{String.SIGN}</h1>;
              <div style={{ width: "50%" }}>
                <MyButton title="SIGN IN" id="1" />
              </div>
            </div>
          ) : (
            <div className="box" onClick={() => setActive(true)}>
              <h2>{String.HELLO}</h2>
              <h1>{String.CREATE}</h1>
              <div style={{ width: "50%" }}>
                <MyButton title="SIGN UP" id="1" />
              </div>
            </div>
          )}
        </div>

        <div className={`formBx ${active ? " active" : ""}`}>
          {active ? (
            <>
              <span className="signText">{String.SIGNUP}</span>
              <div
                className="social"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <PopUp />
              </div>
              {props.image && (
                <img
                  src={props.image}
                  alt="aakash"
                  style={{ height: "80px", width: "80px" }}
                />
              )}
              <span>{String.CREAD}</span>
              <Input
                id="1"
                value={props.name}
                onChange={(e) => {
                  props.setName(e.target.value);
                }}
              />

              <Input
                id="2"
                value={props.p2}
                onChange={(e) => props.setP2(e.target.value)}
              />

              <Input
                id="2"
                value={props.p3}
                onChange={(e) => props.setP3(e.target.value)}
              />
              <label for="profileImage" className="uploadButton">
                Upload Profile Pic
              </label>
              <input
                id="profileImage"
                type="file"
                style={{ display: "none" }}
                onChange={profilePicture}
              />
              <div style={{ width: "50%", marginTop: "1rem" }}>
                <MyButton
                  title="Sign Up"
                  id="2"
                  handleClick={(e) => {
                    props.onClick(e, 0);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <span className="signText">{String.SIGNIN}</span>
              <div
                className="social"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <PopUp />
              </div>
              <span>{String.CREAD}</span>

              <Input
                id="1"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
              />

              <Input
                id="2"
                value={props.p1}
                onChange={(e) => props.setP1(e.target.value)}
              />
              <div style={{ width: "50%", marginTop: "1rem" }}>
                <MyButton
                  title="Sign In"
                  id="2"
                  handleClick={(e) => {
                    props.onClick(e, 1);
                  }}
                />
              </div>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
