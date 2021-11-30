import "./MyButton.scss";
import { memo } from "react";
const MyButton = ({ title, id, handleClick }) => {
  return (
    <button
      className={`myButton ${id === "1" ? " oneButton" : " twoButton"}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default memo(MyButton);
