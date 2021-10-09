import { signIn, signUp } from "./api/api";
import { useEffect, useState } from "react";
import loadable from "@loadable/component";
const Login = loadable(() => import("./Screen/Authentication/Login"), {
  fallback: <></>,
});
const DashBoard = loadable(() => import("./Screen/DashBoard/DashBoard"), {
  fallback: <></>,
});

const App = () => {
  const [login, setlogin] = useState("false");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  useEffect(() => {
    localStorage.removeItem("roomId");
    if (localStorage.getItem("Login") === "true") {
      setlogin("true");
    } else if (localStorage.getItem("Login") === "false") {
      setlogin("false");
    }
  }, []);

  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number
  ) => {
    e.preventDefault();

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
        localStorage.setItem("Login", "true");
        localStorage.setItem("userName", data.data.user?.username);

        localStorage.setItem("userId", data.data.user?._id);
        localStorage.setItem("conversationId", data.data.user?._id);

        setlogin("true");
      } else {
        alert("Invalid credentials");
        setlogin("false");
      }
    }
  };

  function logout() {
    localStorage.setItem("Login", "false");
    setlogin("false");
  }

  return (
    <div className="App flex-row">
      {login === "false" ? (
        <Login
          onClick={handleClick}
          {...{ username, setUsername }}
          {...{ password, setpassword }}
          {...{ passwordConfirm, setpasswordConfirm }}
        />
      ) : (
        <>
          <DashBoard onClick={logout} />
        </>
      )}
    </div>
  );
};

export default App;
