import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "../../Styles/style.scss";
import "./aa.scss";

const SignUp = (props: any) => {
  const [loginTab, setLoginTab] = useState(true);

  return (
    <div className="signUp flex-column adjust">
      <div className="signUpContainer flex-column">
        <div className="authBar flex-row font-h3">
          <Heading
            heading="SignUp"
            onClick={() => setLoginTab(true)}
            loginTab={loginTab}
          />
          <Heading
            heading="Login"
            onClick={() => setLoginTab(false)}
            loginTab={loginTab}
          />
        </div>
        {loginTab ? (
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
        )}
      </div>
    </div>
  );
};

function Heading(props: any) {
  return (
    <div
      className="authSignUp flex-row font-700"
      onClick={props.onClick}
      style={{ opacity: props.loginTab ? 0.5 : 1 }}
    >
      {props.heading}
    </div>
  );
}

export default SignUp;
