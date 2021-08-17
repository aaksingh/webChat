import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import "./Dialog.scss";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  dialog: {
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
    <div>
      <Dialog
        maxWidth="lg"
        open={false}
        TransitionComponent={Transition}
        className={classes.dialog}
      >
        {props.children}
      </Dialog>
    </div>
  );
};

export default WDialog;