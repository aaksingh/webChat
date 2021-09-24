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
const WDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={props.show}
      TransitionComponent={Transition}
      className={classes.dialog}
    >
      <div style={{ height: "3rem", background: "black" }}></div>
      {props.children}
    </Dialog>
  );
};

export default WDialog;
