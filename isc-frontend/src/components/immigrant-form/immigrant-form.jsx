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
import get from "lodash/get";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import { useProfileStyles } from "../../hooks/styles/use-profile-styles";
import { GET_IMMIGRANT_BY_EMAIL_DATA } from "../../utils/constants";
import { requestUserByEmail } from "../../utils/request-user-by-email";
import { statusIsTrue } from "../../utils/status-is-true";
import { FormPage, LoadingIcon } from "../index";
import { submitCreateImmigrant } from "./submit-create-immigrant";

const useStyles = makeStyles(({ spacing }) => ({
  form: {
    width: "100%" // Fix IE 11 issue.
  }
}));

export const ImmigrantForm = ({
  history,
  headerTitle = "Add Immigrant",
  formTitle = "New Immigrant",
  disabled = false,
  viewingOwnProfile = false
}) => {
  const classes = { ...useProfileStyles(), ...useStyles() };
  const [loading, setLoading] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(disabled);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async formData =>
    await submitCreateImmigrant({
      formData,
      setLoading,
      setErrorSnackbarOpen,
      setSuccessSnackbarOpen
    });

  const { user } = useContext(AuthContext);
  const { email } = useParams();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    const fetchUserData = async email => {
      setLoading(true);
      const response = await requestUserByEmail(
        email,
        GET_IMMIGRANT_BY_EMAIL_DATA
      );

      if (statusIsTrue(response)) {
        const cleanedData = response.Extra.map(user => ({
          firstName: get(user, "mapsByNameAndFieldValue.FirstName.value"),
          lastName: get(user, "mapsByNameAndFieldValue.LastName.value"),
          prNo: get(user, "mapsByNameAndFieldValue.PRNo.value"),
          email: get(user, "mapsByNameAndFieldValue.Email.value"),
          password: get(user, "mapsByNameAndFieldValue.Password.value"),
          phone: get(user, "mapsByNameAndFieldValue.TelephoneNo.value"),
          dob: get(user, "mapsByNameAndFieldValue.DoB.value.value"),
          doa: get(user, "mapsByNameAndFieldValue.DoA.value.value")
        }))[0];

        setDefaultValues(cleanedData);
        setSelectedDOA(cleanedData.doa);
        setSelectedDOB(cleanedData.dob);
      }

      console.log(`user data/: ${JSON.stringify(response)}`);
      setLoading(false);
    };

    if (email) {
      fetchUserData(email);
    } else if (viewingOwnProfile) {
      fetchUserData(user.email);
    }
  }, []);

  // used for date pickers onChange handlers
  const [selectedDOB, setSelectedDOB] = useState(
    defaultValues.dob ? defaultValues.dob : null
  );
  const [selectedDOA, setSelectedDOA] = useState(
    defaultValues.doa ? defaultValues.doa : null
  );

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
                onChange={setSelectedDOB}
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
                onChange={setSelectedDOA}
                disabled={formDisabled}
                inputRef={register()}
              />
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
