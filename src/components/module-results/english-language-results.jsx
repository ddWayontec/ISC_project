import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DatePicker } from "@material-ui/pickers";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

import { useBasicImmigrantInfoWithState } from "../../hooks/use-basic-immigrant-info-with-state";
import { GET_IMMIGRANT_RESULTS_BY_PR_DATA, URLS } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";
import { BlockchainVerified } from "../blockchain-verified";
import { ContentWrapper } from "../content-wrapper";
import { Header } from "../header";
import { LoadingIcon } from "../loading-icon";
import { RecommendationCard } from "../recommendation-card";
import { ResultsTable } from "../results-table";
import { submitCreateResults } from "./submit-create-results";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    width: 200
  },
  paper: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: spacing(4),
    padding: spacing(3),
    paddingBottom: spacing(5)
  },
  section: {
    marginTop: spacing(3),
    marginBottom: spacing(2)
  },
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    float: "right"
  },
  button: {
    marginRight: spacing(0.5)
  },
  date: {
    float: "right"
  },
  loading: {
    marginTop: "-10%"
  },
  education: {
    display: "flex",
    marginTop: spacing(2),
    alignItems: "baseline"
  },
  years: {
    width: 35,
    marginRight: spacing(0.5)
  },
  fullTimeDD: {
    marginRight: spacing(0.5),
    marginLeft: spacing(0.5)
  }
}));

export const EnglishLanguageResults = ({ history, enableEditing = false }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const [transactionId, setTransactionId] = useState("");

  const { email } = useParams();
  const { state } = useLocation();

  // state is undefined when navigating to route directly
  const userData = useBasicImmigrantInfoWithState({ state, email, setLoading });

  const { register, handleSubmit, setValue, errors } = useForm();

  // register dropdowns
  useEffect(() => {
    register({ name: "test" });
    register({ name: "listeningBenchmark" });
    register({ name: "speakingBenchmark" });
    register({ name: "readingBenchmark" });
    register({ name: "writingBenchmark" });
    register({ name: "fullTimeEducation" });
    register({ name: "assessmentTool" });
  }, [register]);

  const [defaultValues, setDefaultValues] = useState({});
  const [dateOfAssessment, setDateOfAssessment] = useState(
    defaultValues ? defaultValues.dateOfAssessment : new Date()
  );

  const [fullTimeEducation, setFullTimeEducation] = useState(
    defaultValues ? defaultValues.fullTimeEducation : false
  );
  setValue("fullTimeEducation", fullTimeEducation);

  const [assessmentTool, setAssessmentTool] = useState(
    defaultValues ? defaultValues.assessmentTool : false
  );
  setValue("assessmentTool", assessmentTool);

  const onSubmit = async formData => {
    setDefaultValues({ ...formData });
    await submitCreateResults({
      formData,
      email,
      userData,
      setLoading,
      setErrorSnackbarOpen,
      setSuccessSnackbarOpen,
      setTransactionId
    });

    setDisabled(true);
  };

  // fetch results if exist
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const response = await request(URLS.requestReport, {
        method: "post",
        data: {
          ...GET_IMMIGRANT_RESULTS_BY_PR_DATA,
          Payload: {
            PRNo: userData.prNo
          }
        }
      });

      if (statusIsTrue(response)) {
        const sortedResults = orderBy(
          response.Extra,
          result => {
            return new Date(
              get(result, "mapsByNameAndFieldValue.timeAssessed.value", null)
            );
          },
          ["desc"]
        );

        const result = sortedResults[0];
        const cleanedData = {
          assessmentDate: get(
            result,
            "mapsByNameAndFieldValue.AssessmentDate.value.value"
          ),
          assessmentTool: get(result, "mapsByNameAndFieldValue.testType.value"),
          yearsOfEducation: get(result, "mapsByNameAndFieldValue.EdYrs.value"),
          fullTimeEducation: get(
            result,
            "mapsByNameAndFieldValue.FullTime.value"
          ),
          listeningBenchmark: get(
            result,
            "mapsByNameAndFieldValue.ListeningBM.value"
          ),
          speakingBenchmark: get(
            result,
            "mapsByNameAndFieldValue.SpeakingBM.value"
          ),
          readingBenchmark: get(
            result,
            "mapsByNameAndFieldValue.ReadingBM.value"
          ),
          writingBenchmark: get(
            result,
            "mapsByNameAndFieldValue.WritingBM.value"
          ),
          schoolRecommendationA: get(
            result,
            "mapsByNameAndFieldValue.Rec1Inst.value"
          ),
          programRecommendationA: get(
            result,
            "mapsByNameAndFieldValue.Rec1Program.value"
          ),
          schoolRecommendationB: get(
            result,
            "mapsByNameAndFieldValue.Rec2Inst.value"
          ),
          programRecommendationB: get(
            result,
            "mapsByNameAndFieldValue.Rec2Program.value"
          )
        };

        setDefaultValues(cleanedData);
        setDateOfAssessment(cleanedData.assessmentDate);
        setFullTimeEducation(cleanedData.fullTimeEducation);
        setAssessmentTool(cleanedData.assessmentTool);
        setTransactionId(get(result, "UUID"));
      }

      setLoading(false);
    };
    if (userData.prNo) {
      fetchResults();
    }
  }, []);

  return !isLoading ? (
    <ContentWrapper>
      <Header title="English Language Module Results" />
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={10}>
            <Grid item xs={7}>
              <Typography variant="h5" className={classes.section}>
                Assessment Results
              </Typography>
              <Typography variant="h6">
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography>PR #: {userData.prNo}</Typography>
              <div className={classes.education}>
                <Typography>Assessment Tool</Typography>
                <Select
                  value={assessmentTool}
                  disabled={disabled}
                  className={classes.fullTimeDD}
                  onChange={e => setAssessmentTool(e.target.value)}
                >
                  <MenuItem key="CLBPT" value="CLBPT">
                    CLBPT
                  </MenuItem>
                  <MenuItem key="CLBA" value="CLBA">
                    CLBA
                  </MenuItem>
                  <MenuItem key="CLB-LPT" value="CLB-LPT">
                    CLB-LPT
                  </MenuItem>
                  <MenuItem key="CLB-LL" value="CLB-LL">
                    CLB-LL
                  </MenuItem>
                  <MenuItem key="ELTPA" value="ELTPA">
                    ELTPA
                  </MenuItem>
                </Select>
              </div>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.section}>
                    BM Results from ILVARC
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    className={classes.date}
                    id="dateOfAssessment"
                    name="dateOfAssessment"
                    label="Date of Assessment"
                    format="DD-MM-YYYY"
                    value={dateOfAssessment}
                    onChange={setDateOfAssessment}
                    disabled={disabled}
                    inputRef={register()}
                  />
                </Grid>
              </Grid>
              <ResultsTable
                disabled={disabled}
                register={register}
                setValue={setValue}
                defaultValues={defaultValues}
              />
              <div className={classes.education}>
                <TextField
                  name="yearsOfEducation"
                  id="yearsOfEducation"
                  inputRef={register()}
                  className={classes.years}
                  defaultValue={defaultValues.yearsOfEducation}
                  disabled={disabled}
                />
                <Typography> years of </Typography>
                <Select
                  value={fullTimeEducation}
                  disabled={disabled}
                  className={classes.fullTimeDD}
                  onChange={e => setFullTimeEducation(e.target.value)}
                >
                  <MenuItem key="partTime" value={false}>
                    part-time
                  </MenuItem>
                  <MenuItem key="fullTime" value={true}>
                    full-time
                  </MenuItem>
                </Select>
                <Typography> education</Typography>
              </div>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5" className={classes.section}>
                Recommendations
              </Typography>
              <RecommendationCard
                enableEditing={enableEditing}
                option="A"
                school={defaultValues.schoolRecommendationA}
                program={defaultValues.programRecommendationA}
                register={register}
                disabled={disabled}
              />
              <RecommendationCard
                enableEditing={enableEditing}
                option="B"
                school={defaultValues.schoolRecommendationB}
                program={defaultValues.programRecommendationB}
                register={register}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <>
                {disabled && transactionId ? (
                  <BlockchainVerified hash={transactionId} />
                ) : null}
                {enableEditing ? (
                  <div className={classes.buttonWrapper}>
                    <Button
                      className={classes.button}
                      onClick={() => history.goBack()}
                    >
                      Back
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      disabled={!disabled}
                      onClick={() => setDisabled(false)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={disabled}
                    >
                      Save
                    </Button>
                  </div>
                ) : null}
              </>
            </Grid>
          </Grid>
        </form>
      </Paper>
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
    </ContentWrapper>
  ) : (
    <LoadingIcon />
  );
};
