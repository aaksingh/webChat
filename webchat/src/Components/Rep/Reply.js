import React from "react";
import reply from "../../Assets/reply.png";

const Reply = ({ handleReply }) => {
  return (
    <img
      src={reply}
      alt="reply"
      onClick={handleReply}
      style={{ width: "16px", height: "16px", cursor: "pointer" }}
    />
  );
};

export default Reply;
