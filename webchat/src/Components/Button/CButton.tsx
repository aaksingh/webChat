import React, { FC } from "react";
import { Button } from "@material-ui/core";

import "./CButton.scss";

type CbuttonProps = {
  title: string;
  disabled: boolean;
  onClick: () => void;
};
var fontWeight: number = 700;
const CButton: FC<CbuttonProps> = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      style={{
        fontWeight: fontWeight,
        borderRadius: "4px",
        fontSize: "18px",
        backgroundColor: "#007a5a",
        color: "white",
        margin: "0 2px",
      }}
      disabled={props.disabled}
    >
      {props.title}
    </Button>
  );
};

export default CButton;
