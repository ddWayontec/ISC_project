import {
  Button,
  formatMs,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import noop from "lodash/noop";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

import { useBasicImmigrantInfoWithState } from "../../hooks/use-basic-immigrant-info-with-state";
import { BlockchainVerified } from "../blockchain-verified";
import { ContentWrapper } from "../content-wrapper";
import { Header } from "../header";
import { RecommendationCard } from "../recommendation-card";
import { ResultsTable } from "../results-table";
// for mocking
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
  ),
  "4000007": createData(
    "Real",
    "User",
    "genericimm6@gmail.com",
    "genericimm6@gmail.com",
    "******"
  )
};

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
  }
}));

export const EnglishLanguageResults = ({ history, enableEditing = false }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { email } = useParams();

  const { state } = useLocation();

  // state is undefined when navigating to route directly
  const userData = useBasicImmigrantInfoWithState({ state, email, setLoading });

  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = formData => {
    console.log(`Form Data: ${JSON.stringify(formData)}`);
    setDisabled(true);
  };

  // mocking
  const hash = "some-mock-hash";

  useEffect(() => {
    register({ name: "test" });
    register({ name: "listeningBenchmark" });
    register({ name: "listeningResult" });
    register({ name: "speakingBenchmark" });
    register({ name: "speakingResult" });
    register({ name: "readingBenchmark" });
    register({ name: "readingResult" });
    register({ name: "writingBenchmark" });
    register({ name: "writingResult" });
  }, [register]);

  return (
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
              <Typography className={classes.section}>
                BM Results from ILVARC
              </Typography>
              <ResultsTable
                enableEditing={enableEditing}
                disabled={disabled}
                setDisabled={setDisabled}
                handleSave={() => {
                  console.log("save");
                  setDisabled(false);
                }}
                register={register}
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5" className={classes.section}>
                Recommendations
              </Typography>
              <RecommendationCard
                enableEditing={enableEditing}
                option="A"
                school="SAIT"
                program="ELA 101"
                register={register}
                disabled={disabled}
              />
              <RecommendationCard
                enableEditing={enableEditing}
                option="B"
                school="University of Lethbridge"
                program="English"
                register={register}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <>
                {disabled && hash ? <BlockchainVerified hash={hash} /> : null}
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
                      // onClick={() => setDisabled(true)}
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
    </ContentWrapper>
  );
};
