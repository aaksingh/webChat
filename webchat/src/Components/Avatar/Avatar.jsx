import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./Avatar.scss";

export default function UserAvatar({ id }) {
  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {id === "1" && (
        <StyledBadge overlap="circular" variant="dot">
          <Avatar
            alt="Aakash Singh"
            src="https://thumbs.dreamstime.com/b/portrait-lion-black-detail-face-lion-hight-quality-portrait-lion-portrait-animal-portrait-lion-black-detail-145612151.jpg"
          />
        </StyledBadge>
      )}
      {id === "2" && (
        <Avatar
          alt="Aakash Singh"
          src="https://thumbs.dreamstime.com/b/portrait-lion-black-detail-face-lion-hight-quality-portrait-lion-portrait-animal-portrait-lion-black-detail-145612151.jpg"
        />
      )}
    </div>
  );
}
