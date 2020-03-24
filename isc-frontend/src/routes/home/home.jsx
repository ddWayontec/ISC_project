import { makeStyles } from "@material-ui/core";
import React from "react";

import { AppContainer } from "../../components";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "3em",
    textAlign: "center"
  },
  root: {
    width: "100%",
    backgroundColor: "yellow"
  }
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <AppContainer>
      <div className={classes.root}>
        <p className={classes.text}>HOME</p>
      </div>
    </AppContainer>
  );
};
