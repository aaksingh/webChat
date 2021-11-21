import React from "react";
import WDialog from "../Dialog/Dialog";
import "./PhotoViewer.scss";
const PhotoViewer = ({ file, setFile, handleCreate }) => {
  return (
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
          onClick={(e) => {
            setFile("");
          }}
        >
          <span className={"spanOne"}></span>
          <span className={"spanTwo"}></span>
        </div>

        <img
          src={file && URL.createObjectURL(file)}
          alt="img"
          style={{
            height: "80%",
            width: "80%",
          }}
        />

        <button onClick={handleCreate}>Send</button>
      </div>
    </WDialog>
  );
};

export default PhotoViewer;
