import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(({ spacing }) => ({
  contentWrapper: {
    display: "flex",
    flexDirection: "column"
  }
}));

export const ContentWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.contentWrapper}>{children}</div>;
};
