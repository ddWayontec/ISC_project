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
import isEmpty from "lodash/isEmpty";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { LoadingIcon } from "../../components/loading-icon";
import { AuthContext } from "../../contexts/auth";
import { ROLES } from "../../utils/constants";

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
  },
  loading: {
    marginTop: "30%"
  }
}));

const userRedirectMap = {
  [ROLES.IMMIGRANT]: "/immigrant",
  [ROLES.ISC_EMPLOYEE]: "/isc",
  [ROLES.VISITOR]: "/login"
};

export const Login = ({ redirectPath }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { initiateLogin, user } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    const { email, password } = data;

    const loginResult = await initiateLogin(email, password);

    if (loginResult && !isEmpty(loginResult)) {
      if (!loginResult.authenticated) {
        setLoading(false);
        return;
      }

      setRedirect(true);
    }

    setLoading(false);
  };

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
        {!loading ? (
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
            {errors.email && (
              <Typography>This field must be a valid email.</Typography>
            )}
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
              inputRef={register}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={handleAuthentication}
            >
              Sign In
            </Button>
            <Link
              href="mailto:info@immigrantservicescalgary.ca"
              variant="body2"
            >
              Forgot password or don't have an account?
            </Link>
          </form>
        ) : (
          <div className={classes.loading}>
            <LoadingIcon />
          </div>
        )}
      </div>
      {redirect ? (
        <Redirect
          to={redirectPath ? redirectPath : userRedirectMap[user.role]}
        />
      ) : null}
    </Container>
  );
};
