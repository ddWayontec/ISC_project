import React from 'react';

import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  iscLogo: {
    width: '98%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.status.danger,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        anchor={'left'}
        open={true}
        variant={'permanent'}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <img
            alt="ISC Logo"
            className={classes.iscLogo}
            src={process.env.PUBLIC_URL + '/ISC-Logo-simple-transparent.png'}
          />
        </div>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
