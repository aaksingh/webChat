import "./Connected.scss";
const Connected = () => {
  console.log("connected");
  return (
    <div
      className="flex-column adjust"
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="flex-column adjust" style={{}}>
        <span className="nameProfile font-h1">
          Hello, {localStorage.getItem("userName")}
        </span>

        <div className="selectChat flex-row font-h3">Stay Connected . . .</div>
      </div>
    </div>
  );
};

export default Connected;
