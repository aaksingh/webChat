import React, { useState } from "react";
import "./Login.scss";
import MyButton from "../../Components/InputComponents/MyButton";
import Input from "../../Components/InputComponents/Input";
import PopUp from "../../Components/PopUp/PopUp";
import { String } from "../../Constants/String";
const Login = (props: any) => {
  console.log(props);
  const [active, setActive] = useState(false);
  return (
    <div className="login">
      <div className={"loginContainer"}>
        <div className={"bluebg " + (active ? "" : " blueActive")}>
          {active ? (
            <div className="box" onClick={() => setActive(false)}>
              <h2>{String.WELCOME}</h2>
              <h1>{String.SIGN}</h1>;
              <MyButton title="SIGN IN" id="1" />
            </div>
          ) : (
            <div className="box" onClick={() => setActive(true)}>
              <h2>{String.HELLO}</h2>
              <h1>{String.CREATE}</h1>
              <MyButton title="SIGN UP" id="1" />
            </div>
          )}
        </div>

        <div className={"formBx" + (active ? " active" : "")}>
          {active ? (
            <>
              <span className="signText">{String.SIGNUP}</span>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  props.setUsername(e.target.value)
                }
              />

              <Input
                id="2"
                value={props.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  props.setpassword(e.target.value)
                }
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
