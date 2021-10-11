import { signIn, signUp } from "./api/api";
import { useEffect, useState } from "react";
import loadable from "@loadable/component";
import WDialog from "./Components/Dialog/Dialog";
import MyButton from "./Components/InputComponents/MyButton";
const Login = loadable(() => import("./Screen/Authentication/Login"), {
  fallback: <></>,
});
const DashBoard = loadable(() => import("./Screen/DashBoard/DashBoard"), {
  fallback: <></>,
});

const App = () => {
  console.log(localStorage.getItem("userImage"));
  const [login, setlogin] = useState("false");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [images, setImages] = useState("");
  useEffect(() => {
    localStorage.removeItem("roomId");
    if (localStorage.getItem("Login") === "true") {
      setlogin("true");
    } else if (localStorage.getItem("Login") === "false") {
      setlogin("false");
    }
  }, []);

  const handleClick = async (e, i) => {
    e.preventDefault();

    if (i === 0) {
      if (p2 === p3) {
        console.log(image);
        await signUp({
          username: name,
          password: p2,
          image: image,
        });
      } else {
        alert("Invalid Credentials");
      }
    } else if (i === 1) {
      const data = await signIn({
        username: username,
        password: p1,
      });

      if (data.data.status === "ok") {
        setImages(data.data.user?.image);
        console.log(data.data.user?.image, "images is");
        localStorage.setItem("userImage", data.data.user.image);
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
    setShow(true);
    // localStorage.setItem("Login", "false");
    // setlogin("false");
  }
  function Done() {
    localStorage.setItem("Login", "false");
    setlogin("false");
    setShow(false);
  }

  return (
    <div className="App flex-row">
      {login === "false" ? (
        <Login
          onClick={handleClick}
          {...{ name, setName }}
          {...{ username, setUsername }}
          {...{ p1, setP1 }}
          {...{ p2, setP2 }}
          {...{ p3, setP3 }}
          {...{ image, setImage }}
        />
      ) : (
        <>
          <DashBoard onClick={logout} image={images} />
          <WDialog show={show} maxWidth="30%" minWidth="30%" height="30%">
            <div
              className="flex-column"
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "92%",
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  paddingTop: "4%",
                  paddingBottom: "4%",
                }}
              >
                Logout?
              </span>
              <div
                className="flex-row"
                style={{
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <MyButton
                  title="Yes"
                  id="2"
                  handleClick={() => {
                    Done();
                  }}
                />
                <MyButton
                  title="No"
                  id="1"
                  handleClick={(e) => {
                    setShow(false);
                  }}
                />
              </div>
            </div>
          </WDialog>
        </>
      )}
    </div>
  );
};

export default App;
