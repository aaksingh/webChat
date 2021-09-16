import { useState } from "react";
import "./Login.scss";
import MyButton from "../InputComponents/MyButton";
import Input from "../InputComponents/Input";

const Login = (props) => {
  const [active, setActive] = useState(false);
  return (
    <div className="login">
      <div className={"loginContainer"}>
        <div className={"bluebg " + (active ? "" : " blueActive")}>
          {active ? (
            <div className="box" onClick={() => setActive(false)}>
              <h2>Welcome Back</h2>
              <h1>Sign in to chat</h1>
              <MyButton title="SIGN IN" id="1" />
            </div>
          ) : (
            <div className="box" onClick={() => setActive(true)}>
              <h2>Hello, Friend!</h2>
              <h1>Create Account</h1>
              <MyButton title="SIGN UP" id="1" />
            </div>
          )}
        </div>

        <div className={"formBx" + (active ? " active" : "")}>
          {active ? (
            <>
              <span className="signText">Sign Up to WebTalk</span>
              <div className="social flex-row">
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png" />
                </div>
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/google-logo.png" />
                </div>
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png" />
                </div>
              </div>
              <span>or signup using credentials</span>
              <Input
                id="1"
                value={props.username}
                onChange={(e) => {
                  props.setUsername(e.target.value);
                }}
              />

              <Input id="2" />

              <Input id="2" />

              <MyButton
                title="Sign Up"
                id="2"
                handleClick={(e) => {
                  props.onClick(e, 0);
                }}
              />
            </>
          ) : (
            <>
              <span className="signText">Sign in to WebTalk</span>
              <div className="social flex-row">
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png" />
                </div>
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/google-logo.png" />
                </div>
                <div className="popUp flex-column">
                  <img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png" />
                </div>
              </div>
              <span>or signin using credentials</span>

              <Input
                id="1"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
              />

              <Input
                id="2"
                value={props.password}
                onChange={(e) => props.setpassword(e.target.value)}
              />

              <MyButton
                title="Sign In"
                id="1"
                handleClick={(e) => {
                  props.onClick(e, 1);
                }}
              />
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;

// <Button
//   variant="contained"
//   className="cButton"
//   onClick={(e) => props.onClick(e, 1)}
//   style={{
//     fontSize: "18px",
//     fontWeight: 600,
//     fontFamily: "Poppins",
//     margin: "5% 0",
//     background: "#4D774E",
//     color: "#ffffff",
//   }}
// >
//   Submit
// </Button>
//   <Button
//     variant="contained"
//     className="cButton"
//     style={{
//       fontSize: "18px",
//       fontWeight: 600,
//       fontFamily: "Poppins",
//       margin: "5% 0",
//       background: "#4D774E",
//       color: "#ffffff",
//     }}
//   >
//     Submit
//   </Button>
