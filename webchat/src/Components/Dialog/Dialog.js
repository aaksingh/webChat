import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import "./Dialog.scss";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  dialog: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  profileDialog: {
    position: "relative",
    height: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const WDialog = ({ show, children, maxWidth, minWidth, height }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          minWidth: maxWidth ?? "34%",
          maxWidth: minWidth ?? "36%",
          height: height ?? "30%",
        },
      }}
      // BackdropProps={{
      //   style: {
      //     backgroundColor: "rgba(27, 27, 27, 0.95)",
      //   },
      // }}
    >
      {children}
    </Dialog>
  );
};

export default WDialog;
