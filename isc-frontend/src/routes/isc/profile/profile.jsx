import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useContext, useState } from "react";

import { ContentWrapper, Header } from "../../../components";
import { AuthContext } from "../../../contexts/auth";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    display: "flex"
  },
  paper: {
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: spacing(4),
    padding: spacing(3),
    paddingBottom: spacing(5)
  },
  text: {
    fontSize: "15px",
    textAlign: "center"
  },
  section: {
    marginTop: spacing(5)
  },
  icon: {
    height: 40,
    width: 40,
    float: "right"
  },
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  button: {
    marginBottom: spacing(1)
  }
}));

export const Profile = () => {
  const classes = useStyles();
  const [formDisabled, setFormDisabled] = useState(true);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <ContentWrapper>
      <Header title="My Profile" />
      <Paper className={classes.paper} elevation={2}>
        <AccountCircle className={classes.icon} />
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
                defaultValue="Joe"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
                defaultValue="Smith"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                defaultValue="joe.smith@gmail.com"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="prNo"
                name="prNo"
                label="Permanent Residence Number"
                fullWidth
                autoComplete="prNo"
                disabled={formDisabled}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="address-level2"
                defaultValue="Calgary"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="prov"
                name="prov"
                label="Province"
                fullWidth
                defaultValue="Alberta"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="postal"
                name="postal"
                label="Postal code"
                fullWidth
                autoComplete="postal-code"
                disabled={formDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="country"
                defaultValue="Canada"
                disabled={formDisabled}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={formDisabled}
            className={classes.button}
          >
            Save
          </Button>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sorry, editing profile information is not supported at this time.
          </Typography>
        </div>
      </Paper>
    </ContentWrapper>
  );
};
