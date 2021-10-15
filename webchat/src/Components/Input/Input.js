import { useState, useEffect } from "react";
import "./Input.scss";
// import MicRoundedIcon from "@material-ui/icons/MicRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
// import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import CButton from "../Button/CButton";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { upload } from "../../api/api";
// import { days, months } from "../../Constants/Array";
import WDialog from "../Dialog/Dialog";
// import MyButton from "../InputComponents/MyButton";
// import { ReactComponent as Cancel } from "../../Assets/Can.svg";
const Input = ({ text, setText, handleCreate, variant, sender, receiver }) => {
  // variant = Message or Group
  const [show] = useState(false);
  const [file, setFile] = useState("");
  const [senderId] = useState(sender);
  const [receiverId] = useState(receiver);

  // useEffect(() => {
  //   setImg(true);
  //   console.log("erher");
  // }, [file]);
  const send = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("file", file);
    data.append("sender", senderId);
    data.append("receiver", receiverId);

    const result = await upload(data);
    if (result?.status === 201) {
      setFile("");
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setText(emojiObject.emoji);
  };

  return (
    <div className="completeInput flex-column adjust">
      <WDialog show={file} maxWidth="100%" minWidth="100%" height="100%">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            className="cancelButton"
            style={{
              fontSize: "30px",
              fontWeight: "800",
              right: "10px",
              position: "absolute",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setFile("");
            }}
          >
            X
          </div>

          <img
            src={file && URL.createObjectURL(file)}
            alt="img"
            style={{
              height: "80%",
              width: "80%",
            }}
          />
          <button onClick={send}>Send</button>
        </div>
      </WDialog>
      {show && (
        <div className="emoji">
          <Picker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            disableSearchBar
          />
        </div>
      )}

      <div className="inputSection flex-row adjust">
        <input
          placeholder={
            variant === "Message" ? "Type your message..." : "Enter Group Name"
          }
          id="textarea"
          className="font-h5"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          autoComplete="off"
        />
        <div
          style={{
            width: "20%",
          }}
          className="flex-row adspbtw"
        >
          {/* <MicRoundedIcon /> */}

          {/* <EmojiEmotionsRoundedIcon
            onClick={() => setShow(!show)}
            style={{ cursor: "pointer" }}
          /> */}
          <form action="#" enctype="multipart/form-data">
            <label for="fileTag" style={{ cursor: "pointer" }}>
              <AttachFileRoundedIcon />
            </label>
            <input
              id="fileTag"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                const val = e.target.files[0];
                setFile(val);
              }}
            />

            <input
              id="sender"
              type="text"
              style={{ display: "none" }}
              value={senderId}
              onChange={(e) => {
                // const val = e.target.files[0];
              }}
            />

            <input
              id="receiver"
              type="text"
              style={{ display: "none" }}
              value={receiverId}
              onChange={(e) => {
                // const val = e.target.files[0];
              }}
            />
          </form>
        </div>

        <CButton
          title="Send"
          disabled={false}
          onClick={(e) => handleCreate(e)}
        />
      </div>
      <div
        className="flex-row adspbtw"
        style={{
          width: "98%",
          background: "white",
        }}
      ></div>
    </div>
  );
};

export default Input;

// const fileHandle = (e) => {
//   e.preventDefault();

//   let im = e.target.files[0];
//   console.log(im);
//   var reader = new FileReader();
//   if (im) {
//     reader.readAsDataURL(im);
//     reader.onload = () => {
//       var base64 = reader.result;
//       // console.log(base64);
//     };
//   }
// };
