import { useState } from "react";
import "./Input.scss";
// import MicRoundedIcon from "@material-ui/icons/MicRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
// import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import CButton from "../Button/CButton";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { upload } from "../../api/api";

const Input = ({ text, setText, handleCreate, variant }) => {
  // variant = Message or Group
  const [show] = useState(false);
  const [file, setFile] = useState("");
  const send = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    await upload(data);
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
