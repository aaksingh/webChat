import "./MyButton.scss";
import { memo } from "react";
const MyButton = ({ title, id, handleClick }) => {
  return (
    <div
      className={`myButton ${id === "1" ? " oneButton" : " twoButton"}`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default memo(MyButton);
