import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  iscLogo: {
    width: "98%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.status.danger
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export const Sidebar = ({ history, items }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        anchor={"left"}
        open={true}
        variant={"permanent"}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div>
          <img
            alt="ISC Logo"
            className={classes.iscLogo}
            src={process.env.PUBLIC_URL + "/ISC-Logo-simple-transparent.png"}
          />
        </div>
        <List>
          {items.map(item => (
            <ListItem button onClick={() => history.push(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={() => history.push("/login")}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
