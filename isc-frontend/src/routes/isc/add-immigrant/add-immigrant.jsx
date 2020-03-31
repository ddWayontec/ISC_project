import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { FormPage, LoadingIcon } from "../../../components";
import { useProfileStyles } from "../../../hooks/styles/use-profile-styles";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  }
}));

export const AddImmigrant = () => {
  const classes = { ...useProfileStyles(), ...useStyles() };
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbarOpen(true);
    }, 500);
  };
  return !loading ? (
    <FormPage headerTitle="Add Immigrant">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                disabled={formDisabled}
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
              />
              {errors.email && (
                <Typography>This field must be a valid email.</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="password"
                type="password"
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
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        positio
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Successfully saved new immigrant profile.
        </MuiAlert>
      </Snackbar>
    </FormPage>
  ) : (
    <LoadingIcon />
  );
};
