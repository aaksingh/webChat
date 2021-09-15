import React from "react";
import "./Buttons.scss";
const Buttons = ({ title, variant, onClick }) => {
  return (
    <>
      {variant === "1" && (
        <button className="authButtons transparent" onClick={onClick}>
          {title}
        </button>
      )}
      {variant === "2" && (
        <button className="authButtons opaque" onClick={onClick}>
          {title}
        </button>
      )}
    </>
  );
};

export default Buttons;
