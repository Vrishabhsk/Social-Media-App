import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const Theme = withStyles({
  root: {
    paddingTop: "10px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: "1rem",
    fontFamily: "'Baloo Tammudu 2', cursive",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "5px 0px 10px 20px",
    backgroundColor: "red",
  },
  "&:hover": {
    backgroundColor: "brown",
  },
}));

export default function StyledButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Theme
        onClick={props.onClick}
        variant="contained"
        color="primary"
        className={classes.margin}
      >
        {props.content}
      </Theme>
    </div>
  );
}
