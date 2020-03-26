import { makeStyles } from "@material-ui/core";
import React from "react";
import { ContentWrapper } from "../../../components/content-wrapper";
import { Header } from "../../../components/header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  wrapper: {
    height: "200px",
    width: "100%",
    backgroundColor: "blue"
  },
  text: {
    fontSize: "15px",
    textAlign: "center"
  }
}));

export const ViewModules = () => {
  const classes = useStyles();
  return (
    <ContentWrapper>
      <Header title={"Module Results"} />
      <div className={classes.wrapper}>
        <p className={classes.text}>view modules</p>
      </div>
    </ContentWrapper>
  );
};
