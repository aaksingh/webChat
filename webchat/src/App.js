import DashBoard from "./Components/DashBoard/DashBoard.js";
import { signIn, signUp } from "./api/api";
import { useEffect, useState } from "react";
// import SignUp from "./Components/SignUp/aa.tsx";
// import { io } from "socket.io-client";
import Login from "./Components/SignUp/Login.js";

import React from "react";

const App = () => {
  const [socket, setSocket] = React.useState();
  const [id, setID] = React.useState();
  const [login, setlogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  // useEffect(() => {
  //   const newSocket = io("http://localhost:3002", {
  //     transports: ["websocket"],
  //   });

  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, []);

  // useEffect(() => {
  //   socket?.on("chat-message", (message) => {
  //     console.log(message, "here in useEffect socket");
  //   });
  // }, [socket]);

  useEffect(() => {
    if (localStorage.getItem("Login") === "true") {
      setlogin(true);
    } else if (localStorage.getItem("Login") === "false") {
      setlogin(false);
    }
  }, []);

  // useEffect(() => {
  //   socket?.on("chat-message", (message) => {
  //     console.log(message, "here in useEffect socket");
  //   });

  //   socket?.emit("id", {
  //     id: localStorage.getItem("userId"),
  //   });

  //   socket?.on("userId", (data) => {
  //     setID(data.id);
  //   });
  // }, [socket]);

  const handleClick = async (e, i) => {
    e.preventDefault();

    if (password === "" || username === "") {
      alert("Enter Valid Credentials");
      return;
    }

    if (i === 0) {
      await signUp({
        username: username,
        password: password,
      });
    } else if (i === 1) {
      const data = await signIn({
        username: username,
        password: password,
      });

      if (data.data.status === "ok") {
        localStorage.setItem("Login", true);
        localStorage.setItem("userName", data.data.user?.username);

        localStorage.setItem("userId", data.data.user?._id);
        localStorage.setItem("conversationId", data.data.user?._id);

        setlogin(true);
      } else {
        alert("Invalid credentials");
        setlogin(false);
      }
    }
  };

  function logout() {
    localStorage.setItem("Login", false);
    setlogin(false);
  }

  return (
    <div className="App flex-row">
      {!login ? (
        <Login
          onClick={handleClick}
          {...{ username, setUsername }}
          {...{ password, setpassword }}
          {...{ passwordConfirm, setpasswordConfirm }}
        />
      ) : (
        <>
          <DashBoard
            onClick={logout}
            userName={localStorage.getItem("userName")}
          />
        </>
      )}
    </div>
  );
};

export default App;
