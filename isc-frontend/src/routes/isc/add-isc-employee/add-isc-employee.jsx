import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { FormPage, LoadingIcon } from "../../../components";
import { useProfileStyles } from "../../../hooks/styles/use-profile-styles";
import { request } from "../../../utils/request";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  }
}));

const CREATE_ISC_EMP_DATA = {
  mspid: "Org1MSP",
  affiliation: "org2.department1",
  extra: {},
  sm: 2,
  program: "settlementcal",
  channelId: "orgchannel",
  chaincodeid: "ledger",
  sm_uid: "admin@iscemp.com",
  sm_pwd: "123456"
};

export const AddIscEmployee = () => {
  const classes = { ...useProfileStyles(), ...useStyles() };
  const [loading, setLoading] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async formData => {
    setLoading(true);

    const responseData = await request(
      "/kc/api/ledgerChainCode/addAndMapUser",
      {
        method: "post",
        data: {
          ...CREATE_ISC_EMP_DATA,
          id: formData.email,
          email: formData.email,
          EmployeeID: formData.id,
          mobile_no: formData.phone,
          first_name: formData.firstName,
          FirstLanguage: formData.firstLanguage,
          last_name: formData.lastName,
          password: formData.password,
          proposedUser: [
            {
              ID: formData.email,
              MSPID: "Org1MSP"
            }
          ]
        }
      }
    );

    setLoading(false);

    if (responseData.status === true || responseData.Status === true) {
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };
  return !loading ? (
    <FormPage headerTitle="Add ISC Employee">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            New Employee
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
                inputRef={register()}
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
                inputRef={register()}
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
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="id"
                name="id"
                label="Unique ID"
                fullWidth
                autoComplete="id"
                disabled={formDisabled}
                defaultValue={uuidv4()}
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="firstLanguage"
                name="firstLanguage"
                label="First Language"
                fullWidth
                autoComplete="firstLanguage"
                disabled={formDisabled}
                defaultValue="English"
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone Number"
                fullWidth
                autoComplete="phoneNumber"
                disabled={formDisabled}
                defaultValue=""
                inputRef={register()}
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
        open={successSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Successfully saved new employee profile.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          There was an error creating employee.
        </MuiAlert>
      </Snackbar>
    </FormPage>
  ) : (
    <LoadingIcon />
  );
};
