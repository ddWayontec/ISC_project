import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Link,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Login = ({ redirectPath }) => {
  const classes = useStyles();
  const { handleAuthentication } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = e => {
    //do email validation?
    setEmail(e.target.value);
  };
  console.log(`redirect path: ${redirectPath}`);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAuthentication}
          >
            Sign In
          </Button>
          <Link href="mailto:info@immigrantservicescalgary.ca" variant="body2">
            Forgot password or don't have an account?
          </Link>
        </form>
      </div>
    </Container>
  );
};
