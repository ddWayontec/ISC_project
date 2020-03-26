import { makeStyles } from "@material-ui/core";
import React from "react";

import { ContentWrapper } from "../../../components";

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
    <ContentWrapper>
      <div className={classes.wrapper}>
        <p className={classes.text}>ISC home</p>
      </div>
    </ContentWrapper>
  );
};
