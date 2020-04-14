import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useLoadingStyles = makeStyles(theme => ({
  loading: {
    marginTop: "30%",
    marginRight: "auto",
    marginLeft: "auto"
  },

  loadingWrapper: {
    display: "flex",
    flexDirection: "column"
  }
}));

export const LoadingIcon = () => {
  const classes = useLoadingStyles();
  return (
    <div className={classes.loadingWrapper}>
      <CircularProgress className={classes.loading} />
    </div>
  );
};
