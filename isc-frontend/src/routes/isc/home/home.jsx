import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  wrapper: {
    height: "200px",
    width: "100%",
    backgroundColor: "gray"
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
      <p className={classes.text}>ISC home</p>
    </div>
  );
};
