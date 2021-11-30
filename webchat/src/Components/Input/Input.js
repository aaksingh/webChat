import { useState } from "react";
import "./Input.scss";
import { memo } from "react";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import MyButton from "../InputComponents/MyButton";
const Input = ({
  text,
  setText,
  handleCreate,
  variant,
  sender,
  receiver,
  setFile,
  handleSchduled,
}) => {
  const [show] = useState(false);
  const [senderId] = useState(sender);
  const [receiverId] = useState(receiver);

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
        <div className="flex-row adspbtw">
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
        <MyButton title="Send" id="2" handleClick={handleCreate} />
        <MyButton
          title="Schedule 10 mins"
          id="2"
          handleClick={handleSchduled}
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

export default memo(Input);
