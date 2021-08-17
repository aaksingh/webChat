import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import WDialog from "../Dialog/Dialog";
import { Avatar } from "@material-ui/core";
import "./AudioCall.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <WDialog>
      <DialogContent dividers>
        <div className="userdetails flex-column">
          <Avatar
            style={{ width: "20rem", height: "20rem", borderRadius: "2rem" }}
          />
          <span className="font-h2">Aakash Singh</span>
        </div>
        <Details spanOne="Username" value="Aakash Singh" />
        <Details spanOne="Status" value="----------" />
        <Details spanOne="Email" value="aakashggsipu@gmail.com" />
        <Details spanOne="Password" value="*********" />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Back
        </Button>
        <Button autoFocus onClick={handleClose} color="primary">
          Edit Profile
        </Button>
      </DialogActions>
    </WDialog>
  );
}

function Details({ spanOne, value }) {
  return (
    <div className="editable flex-column">
      <span className="font-h4">{spanOne}</span>
      <span className="font-h3">{value}</span>
    </div>
  );
}
