import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import noop from "lodash/noop";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
  "genericimm6@gmail.com": createData(
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
  }
}));

export const EnglishLanguageResults = ({ enableEditing = false }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);

  const { id } = useParams();
  const userInfo = id ? mockData[id] : {};

  const hash = "some-mock-hash";

  return (
    <ContentWrapper>
      <Header title="English Language Module Results" />
      <Paper className={classes.paper}>
        <Grid container spacing={10}>
          <Grid item xs={7}>
            <Typography variant="h5" className={classes.section}>
              Assessment Results
            </Typography>
            <Typography variant="h6">
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography>PR #: {id}</Typography>
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
              registered={true}
            />
            <RecommendationCard
              enableEditing={enableEditing}
              option="B"
              school="University of Lethbridge"
              program="English"
              registered={false}
            />
          </Grid>
        </Grid>
        {disabled && hash ? <BlockchainVerified hash={hash} /> : noop}
      </Paper>
    </ContentWrapper>
  );
};
