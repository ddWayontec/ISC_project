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
import InputMask from "react-input-mask";
import { v4 as uuidv4 } from "uuid";

import { FormPage, LoadingIcon } from "../../../components";
import { useProfileStyles } from "../../../hooks/styles/use-profile-styles";
import { CREATE_ISC_EMPLOYEE_DATA } from "../../../utils/constants";
import { request } from "../../../utils/request";
import { statusIsTrue } from "../../../utils/status-is-true";

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

export const AddIscEmployee = ({ history }) => {
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
          ...CREATE_ISC_EMPLOYEE_DATA.addAndMapUser,
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

    if (statusIsTrue(responseData)) {
      const sendMessageResponse = await request(
        "/kc/api/ledgerChainCode/sendMessage",
        {
          method: "post",
          data: {
            ...CREATE_ISC_EMPLOYEE_DATA.sendMessage,
            Receiver: {
              ID: formData.email,
              MSPID: "Org1MSP"
            },
            Payload: {
              Email: formData.email,
              EmployeeID: formData.id,
              FirstLanguage: formData.firstLanguage,
              FirstNameEmp: formData.firstName,
              LastNameEmp: formData.lastName,
              Password: formData.password,
              TelephoneNo: formData.phone
            }
          }
        }
      );

      if (statusIsTrue(sendMessageResponse)) {
        setLoading(false);
        return setSuccessSnackbarOpen(true);
      }
    }
    setLoading(false);
    return setErrorSnackbarOpen(true);
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
              <InputMask
                mask="(999) 999-9999"
                maskChar=" "
                disabled={formDisabled}
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
