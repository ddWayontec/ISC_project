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
import { useParams } from "react-router-dom";

import { useProfileStyles } from "../../hooks/styles/use-profile-styles";
import { request } from "../../utils/request";
import { FormPage, LoadingIcon } from "../index";

// for mocking get requests which dont work yet
const createData = (firstName, lastName, prNo, email, password) => {
  return { firstName, lastName, prNo, email, password };
};

// for mocking
const mockData = {
  "123456": createData("Joe", "Smith", "123456", "fake@gmail.com", "******"),
  "5696869": createData(
    "Andrew",
    "Sheer",
    "5696869",
    "fake@gmail.com",
    "******"
  ),
  "126325123": createData(
    "Stephen",
    "Harper",
    "126325123",
    "fake@gmail.com",
    "******"
  ),
  "12312238456": createData(
    "Justin",
    "Trudeau",
    "12312238456",
    "fake@gmail.com",
    "******"
  ),
  "19234834": createData(
    "Rachel",
    "Notley",
    "19234834",
    "fake@gmail.com",
    "******"
  ),
  "2asdfas": createData(
    "Donald",
    "Trump",
    "2asdfas",
    "fake@gmail.com",
    "******"
  )
};

const CREATE_IMG_DATA = {
  mspid: "Org1MSP",
  affiliation: "org2.department1",
  extra: {},
  sm: 2,
  program: "settlementcal",
  channelId: "orgchannel",
  chaincodeid: "ledger",
  sm_uid: "admin@immigrant.com",
  sm_pwd: "123456"
};

const useStyles = makeStyles(({ spacing }) => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    float: "right"
  }
}));

export const ImmigrantForm = ({
  history,
  headerTitle = "Add Immigrant",
  formTitle = "New Immigrant"
}) => {
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
          ...CREATE_IMG_DATA,
          id: formData.email,
          DoA: { format: "02-01-2006", value: "02-01-2007" }, // TODO: add to form
          DoB: { format: "02-01-2006", value: "02-01-1995" }, // TODO: add to form
          email: formData.email,
          mobile_no: "1234567890", // TODO: add to form
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          PRNo: formData.prNo,
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

    if (responseData.Status === true || responseData.status === true) {
      setSuccessSnackbarOpen(true);
    } else {
      console.log(responseData);
      setErrorSnackbarOpen(true);
    }
  };

  const { id } = useParams();
  const defaultValues = id ? mockData[id] : {};
  console.log(`id: ${id}`);

  return !loading ? (
    <FormPage headerTitle={headerTitle}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            {formTitle}
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
                defaultValue={defaultValues.firstName}
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
                defaultValue={defaultValues.lastName}
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
                defaultValue={defaultValues.email}
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
                defaultValue={defaultValues.password}
                inputRef={register()}
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
                defaultValue={defaultValues.prNo}
                inputRef={register()}
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
                inputRef={register()}
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
                inputRef={register()}
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
                inputRef={register()}
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
                inputRef={register()}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            onClick={() => history.push("/isc/immigrants")}
          >
            Cancel
          </Button>
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
        positio
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Successfully saved new immigrant profile.
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
