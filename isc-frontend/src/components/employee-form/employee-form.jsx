import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import get from "lodash/get";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { v4 as uuidv4 } from "uuid";

import { FormPage, LoadingIcon } from "../../components";
import { AuthContext } from "../../contexts/auth";
import { useProfileStyles } from "../../hooks/styles/use-profile-styles";
import { GET_ISC_EMPLOYEE_BY_EMAIL_DATA } from "../../utils/constants";
import { requestUserByEmail } from "../../utils/request-user-by-email";
import { statusIsTrue } from "../../utils/status-is-true";
import { submitCreateEmployee } from "./submit-create-employee";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  }
}));

export const EmployeeForm = ({
  history,
  headerTitle = "Add ISC Employee",
  formTitle = "New Employee",
  disabled = false,
  viewingOwnProfile = false
}) => {
  const classes = { ...useProfileStyles(), ...useStyles() };
  const [loading, setLoading] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(disabled);

  const { user } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const response = await requestUserByEmail(
        user.email,
        GET_ISC_EMPLOYEE_BY_EMAIL_DATA
      );

      if (statusIsTrue(response)) {
        const cleanedData = response.Extra.map(user => ({
          firstName: get(user, "mapsByNameAndFieldValue.FirstNameEmp.value"),
          lastName: get(user, "mapsByNameAndFieldValue.LastNameEmp.value"),
          id: get(user, "mapsByNameAndFieldValue.EmployeeID.value"),
          email: get(user, "mapsByNameAndFieldValue.Email.value"),
          password: get(user, "mapsByNameAndFieldValue.Password.value"),
          phone: get(user, "mapsByNameAndFieldValue.TelephoneNo.value"),
          firstLanguage: get(
            user,
            "mapsByNameAndFieldValue.FirstLanguage.value"
          )
        }))[0];

        setDefaultValues(cleanedData);
      }

      setLoading(false);
    };

    if (viewingOwnProfile) {
      fetchUserData();
    }
  }, []);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async formData =>
    await submitCreateEmployee({
      formData,
      setLoading,
      setSuccessSnackbarOpen,
      setErrorSnackbarOpen
    });

  return !loading ? (
    <FormPage headerTitle={headerTitle} accountIcon={viewingOwnProfile}>
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
                id="id"
                name="id"
                label="Unique ID"
                fullWidth
                autoComplete="id"
                disabled={formDisabled}
                defaultValue={viewingOwnProfile ? defaultValues.id : uuidv4()}
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
                defaultValue={
                  viewingOwnProfile ? defaultValues.firstLanguage : "English"
                }
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
          </Grid>
        </div>

        <div className={classes.actionArea}>
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
          {formDisabled && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Sorry, editing profile information is not supported at this time.
            </Typography>
          )}
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
