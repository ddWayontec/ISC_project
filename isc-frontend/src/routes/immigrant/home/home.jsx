import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  wrapper: {
    height: "200px",
    width: "100%",
    backgroundColor: "red"
  },
  text: {
    fontSize: "15px",
    textAlign: "center"
  }
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>immigrant home</p>
    </div>
  );
};
