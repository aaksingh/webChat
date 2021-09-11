import { LinearProgress } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Wait.scss";
const Wait = () => {
  const useStyles = makeStyles({
    root: {
      width: "50%",
    },
  });
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="wait flex-column">
      <span className="font-h3" style={{ color: "white" }}>
        Loading...
      </span>
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
};

export default Wait;
