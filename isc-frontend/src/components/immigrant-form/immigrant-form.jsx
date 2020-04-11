import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";

import { useProfileStyles } from "../../hooks/styles/use-profile-styles";
import { CREATE_IMMIGRANT } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";
import { FormPage, LoadingIcon } from "../index";

// for mocking get requests which dont work yet
const createData = (
  firstName,
  lastName,
  prNo,
  email,
  password,
  dob,
  doa,
  phone
) => {
  return { firstName, lastName, prNo, email, password, dob, doa, phone };
};

// for mocking
const mockData = {
  "123456": createData(
    "Joe",
    "Smith",
    "123456",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03",
    "4034034034"
  ),
  "5696869": createData(
    "Andrew",
    "Sheer",
    "5696869",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03"
  ),
  "126325123": createData(
    "Stephen",
    "Harper",
    "126325123",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03"
  ),
  "12312238456": createData(
    "Justin",
    "Trudeau",
    "12312238456",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03"
  ),
  "19234834": createData(
    "Rachel",
    "Notley",
    "19234834",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03"
  ),
  "2asdfas": createData(
    "Donald",
    "Trump",
    "2asdfas",
    "fake@gmail.com",
    "******",
    "2000-01-01",
    "2010-02-03"
  )
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

    console.log(`form data: ${JSON.stringify(formData)}`);

    const responseData = await request(
      "/kc/api/ledgerChainCode/addAndMapUser",
      {
        method: "post",
        data: {
          ...CREATE_IMMIGRANT.addAndMapUser,
          id: formData.email,
          DoA: { format: "02-01-2006", value: formData.doa.toString() },
          DoB: { format: "02-01-2006", value: formData.dob.toString() },
          email: formData.email,
          mobile_no: formData.phone,
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

    console.log(`Response data: ${JSON.stringify(responseData)}`);
    if (statusIsTrue(responseData)) {
      const sendMessageResponse = await request(
        "/kc/api/ledgerChainCode/sendMessage",
        {
          method: "post",
          data: {
            ...CREATE_IMMIGRANT.sendMessage,
            Receiver: { ID: formData.email, MSPID: "Org1MSP" },
            Payload: {
              DoA: { format: "02-01-2006", value: formData.doa.toString() },
              DoB: { format: "02-01-2006", value: formData.dob.toString() },
              Email: formData.email,
              FirstName: formData.firstName,
              LastName: formData.lastName,
              PRNo: formData.prNo,
              Password: formData.password,
              TelephoneNo: formData.phone
            }
          }
        }
      );

      console.log(
        `send message response data: ${JSON.stringify(sendMessageResponse)}`
      );

      if (statusIsTrue(sendMessageResponse)) {
        setLoading(false);
        return setSuccessSnackbarOpen(true);
      }
    }

    setLoading(false);
    setErrorSnackbarOpen(true);
  };

  const { id } = useParams();
  const defaultValues = id ? mockData[id] : {};
  console.log(`id: ${id} ${JSON.stringify(defaultValues)}`);

  const [selectedDOB, handleDOBChange] = useState(
    defaultValues.dob ? defaultValues.dob : null
  );
  const [selectedDOA, handleDOAChange] = useState(
    defaultValues.doa ? defaultValues.doa : null
  );

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
                error={errors.email}
                helperText={errors.email && "This field must be a valid email."}
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
            <Grid item xs={6}>
              <InputMask
                mask="(999) 999-9999"
                maskChar=" "
                disabled={formDisabled}
                defaultValue={defaultValues.phone}
                error={errors.phone}
                helperText={
                  errors.phone && "This field must be a valid phone number."
                }
              >
                {() => (
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    autoComplete="phone"
                    disabled={formDisabled}
                    defaultValue={defaultValues.phone}
                    error={errors.phone}
                    helperText={
                      errors.phone && "This field must be a valid phone number."
                    }
                    inputRef={register({
                      required: true,
                      pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
                    })}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                id="dob"
                name="dob"
                label="Date of Birth"
                format="DD-MM-YYYY"
                value={selectedDOB}
                onChange={handleDOBChange}
                disabled={formDisabled}
                fullWidth
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="prNo"
                name="prNo"
                label="Permanent Residence Number"
                fullWidth
                autoComplete="prNo"
                disabled={formDisabled}
                defaultValue={defaultValues.prNo}
                error={errors.prNo}
                helperText={
                  errors.prNo &&
                  "PR Numbers must start with 2 characters followed by either 7 or 10 digits."
                }
                inputRef={register({
                  required: true,
                  pattern: /^[A-z]{2}([0-9]{7}|[0-9]{10})$/
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                id="doa"
                name="doa"
                label="Date of Arrival"
                format="DD-MM-YYYY"
                fullWidth
                value={selectedDOA}
                onChange={handleDOAChange}
                disabled={formDisabled}
                inputRef={register()}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.buttonWrapper}>
          <Button
            className={classes.cancelButton}
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
