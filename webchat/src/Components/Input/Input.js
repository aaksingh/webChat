import { useState } from "react";
import "./Input.scss";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import CButton from "../Button/CButton";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const Input = ({ text, setText, handleCreate, variant }) => {
  // variant = Message or Group
  const [show, setShow] = useState(false);

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
      </div>
      <div
        className="flex-row adspbtw"
        style={{
          width: "98%",
          background: "white",
        }}
      >
        <div
          style={{
            width: "20%",
          }}
          className="flex-row adspbtw"
        >
          {variant === "Message" ? <MicRoundedIcon /> : null}

          <EmojiEmotionsRoundedIcon
            onClick={() => setShow(!show)}
            style={{ cursor: "pointer" }}
          />
          {variant === "Message" ? <AttachFileRoundedIcon /> : null}
        </div>
        {variant === "Message" ? (
          <CButton
            title="Send"
            disabled={false}
            onClick={(e) => handleCreate(e)}
          />
        ) : (
          <CButton title="Create" disabled={true} onClick={null} />
        )}
      </div>
    </div>
  );
};

export default Input;
