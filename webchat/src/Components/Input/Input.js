import { useState } from "react";
import "./Input.scss";
// import MicRoundedIcon from "@material-ui/icons/MicRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
// import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import CButton from "../Button/CButton";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { upload } from "../../api/api";
import { days, months } from "../../Constants/Array";

const Input = ({ text, setText, handleCreate, variant, sender, receiver }) => {
  // variant = Message or Group
  const [show] = useState(false);
  const [file, setFile] = useState("");
  const [senderId, setSender] = useState(sender);
  const [receiverId, setReceiver] = useState(receiver);
  console.log(senderId, receiverId);
  const send = async (e) => {
    e.preventDefault();
    let currentTimestamp = new Date();

    const dateDetails = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    }).format(currentTimestamp);

    let time = dateDetails.split(" ");

    time.push(days[currentTimestamp.getDay()]);
    time.push(months[currentTimestamp.getMonth()]);
    const data = new FormData();

    data.append("file", file);
    data.append("sender", senderId);
    data.append("receiver", receiverId);

    const result = await upload(data);

    console.log(result);
  };
  const onEmojiClick = (event, emojiObject) => {
    setText(emojiObject.emoji);
  };

  return (
    <div className="completeInput flex-column adjust">
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
          <button onClick={send}>Send</button>
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
