import { signIn, signUp } from "./api/api";
import { useEffect, useState, useRef } from "react";

import loadable from "@loadable/component";
import Peer from "simple-peer";

import WDialog from "./Components/Dialog/Dialog";
import MyButton from "./Components/InputComponents/MyButton";
import { useSelector } from "react-redux";

const Login = loadable(() => import("./Screen/Authentication/Login"), {
  fallback: <></>,
});
const DashBoard = loadable(() => import("./Screen/DashBoard/DashBoard"), {
  fallback: <></>,
});

const App = () => {
  const [login, setlogin] = useState("false");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [images, setImages] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [stream, setStream] = useState("");
  const [caller, setCaller] = useState();

  const { users } = useSelector((state) => state.showOnlineUsers);

  useEffect(() => {
    if (localStorage.getItem("Login") === "true") {
      setlogin("true");
    } else if (localStorage.getItem("Login") === "false") {
      setlogin("false");
    }
  }, []);

  const { socketVal } = useSelector((state) => state.socketValue);

  // useEffect(() => {
  //   socketVal?.on("me", (id) => setMe(id));

  //   socketVal?.on("callUser", ({ from, name: callerName, signal }) => {
  //     setCall({
  //       isReceivingCall: true,
  //       from,
  //       name: callerName,
  //       signal,
  //     });
  //   });
  // }, []);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [callAccepted, setCallAccepted] = useState(false);
  var currentStream = {};
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socketVal?.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  const [showVideo, setShowVideo] = useState(false);

  const audioCalling = () => {
    alert("Shanti");
  };
  const videoCalling = async () => {
    // console.log(users, receiver);
    let online = false;
    users.map((user) => {
      if (user?.userId === localStorage.getItem("receiverId")) {
        online = true;
      }
    });
    if (online) {
      setCaller(users[1]?.socketId);

      currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setShowVideo(true);
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;

      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        socketVal?.emit("callUser", {
          userToCall: localStorage.getItem("receiverId"),
          signalData: data,
          from: localStorage.getItem("senderId"),
        });
      });

      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });

      socketVal?.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
      connectionRef.current = peer;
    } else {
      alert("User Not Online");
    }
  };

  const endCall = async () => {
    const streamClose = stream;
    const tracks = streamClose.getTracks();

    tracks.forEach((track) => track.stop());

    connectionRef.current.destroy();
    setShowVideo(false);
  };

  const handleClick = async (e, i) => {
    e.preventDefault();

    if (i === 0) {
      if (p2 === p3) {
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
  }
  // function Done() {
  //   localStorage.setItem("Login", "false");
  //   setlogin("false");
  //   setShow(false);
  // }

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
          <DashBoard
            onClick={logout}
            image={images}
            videoCalling={videoCalling}
            audioCalling={audioCalling}
          />
          {/* <WDialog show={show} maxWidth="30%" minWidth="30%" height="30%">
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
                <div style={{ width: "100%" }}>
                  <MyButton
                    title="Yes"
                    id="2"
                    handleClick={() => {
                      Done();
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <MyButton
                    title="No"
                    id="1"
                    handleClick={(e) => {
                      setShow(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </WDialog> */}
          <WDialog
            show={showVideo}
            maxWidth="100%"
            minWidth="100%"
            height="100%"
          >
            <div className="video">
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="videoCont"
              />
            </div>
            <button onClick={endCall}>End</button>
          </WDialog>
        </>
      )}
    </div>
  );
};

export default App;
