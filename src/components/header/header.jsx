import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export const Header = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
