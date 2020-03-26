import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { ContentWrapper } from "../../../components/content-wrapper";
import { Header } from "../../../components/header";
import { AuthContext } from "../../../contexts/auth";

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

export const Profile = () => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <ContentWrapper>
      <Header title="My Profile" />
      <div className={classes.wrapper}>
        <p className={classes.text}>Profile</p>
        <p>Email: {user.email}</p>
        <p>More information will be added as it becomes available</p>
      </div>
    </ContentWrapper>
  );
};
