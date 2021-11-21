import React, { useState } from "react";
import "./Toggle.scss";
const Toggle = ({ toggle, setToggle, handleToggle }) => {
  return (
    <div class={"toggle " + (!toggle ? "active" : null)} onClick={handleToggle}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Toggle;
