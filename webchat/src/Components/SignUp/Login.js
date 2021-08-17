import React, { useState } from "react";
import "./Login.scss";
import { Button } from "@material-ui/core";

const Login = (props) => {
  const [active, setActive] = useState(false);
  return (
    <div className={"login" + (active ? " activeColor" : " inactive")}>
      <div className={"loginContainer"}>
        <div className="bluebg">
          <div className="box signin" onClick={() => setActive(false)}>
            <h2>Already have an Account?</h2>
            <button className="signinButton">Sign In</button>
          </div>
          <div className="box signUp" onClick={() => setActive(true)}>
            <h2>Don't have an Account?</h2>
            <button signupButton>Sign Up</button>
          </div>
        </div>

        <div className={"formBx" + (active ? " active" : "")}>
          {active ? (
            <>
              <span className="font-h4">Enter Name</span>
              <input
                className="font-h4"
                type="text"
                value={props.username}
                onChange={(e) => {
                  props.setUsername(e.target.value);
                }}
              />

              <span className="font-h4">Password</span>

              <input
                className="font-h4"
                type="password"
                value={props.password}
                onChange={(e) => props.setpassword(e.target.value)}
                id="passwordInput"
              />

              <span className="font-h4">Password</span>

              <input
                className="font-h4"
                type="password"
                value={props.passwordConfirm}
                onChange={(e) => props.setpasswordConfirm(e.target.value)}
                id="passwordInput"
              />
              <Button
                variant="contained"
                className="cButton"
                onClick={(e) => props.onClick(e, 0)}
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                  margin: "5% 0",
                  background: "#4D774E",
                  color: "#ffffff",
                }}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <span className="font-h4">Username</span>
              <input
                className="font-h4"
                type="text"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
              />

              <span className="font-h4">Password</span>

              <input
                className="font-h4"
                type="password"
                value={props.password}
                onChange={(e) => props.setpassword(e.target.value)}
                id="passwordInput"
              />
              <Button
                variant="contained"
                className="cButton"
                onClick={(e) => props.onClick(e, 1)}
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                  margin: "5% 0",
                  background: "#4D774E",
                  color: "#ffffff",
                }}
              >
                Submit
              </Button>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
