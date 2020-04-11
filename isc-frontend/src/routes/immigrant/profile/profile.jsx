import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";

import { FormPage } from "../../../components";
import { AuthContext } from "../../../contexts/auth";
import { useProfileStyles } from "../../../hooks/styles/use-profile-styles";

export const Profile = () => {
  const classes = useProfileStyles();
  const [formDisabled, setFormDisabled] = useState(true);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <FormPage headerTitle="My Profile">
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
    </FormPage>
  );
};