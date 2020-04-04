import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { ViewModule } from "@material-ui/icons";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { ContentWrapper } from "../content-wrapper";
import { Header } from "../header";

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
  },
  icon: {
    height: 40,
    width: 40,
    float: "right"
  }
}));

export const ViewModules = ({ history }) => {
  const classes = useStyles();

  const { pathname } = useLocation();

  const { id } = useParams();
  const userInfo = id ? mockData[id] : {};

  return (
    <ContentWrapper>
      <Header title="View Modules" />
      <Paper className={classes.paper} elevation={2}>
        <ViewModule className={classes.icon} />
        <Typography variant="h6" gutterBottom className={classes.section}>
          {`${userInfo.firstName} ${userInfo.lastName}'s Modules`}
        </Typography>
        <Card className={classes.card}>
          <CardActionArea onClick={() => history.push(`${pathname}/english`)}>
            <CardMedia
              component="img"
              alt="dictionary"
              height="140"
              image={process.env.PUBLIC_URL + "/dictionary.jpg"}
              title="Dictionary"
            />
            <CardContent>
              <Typography variant="h5">English</Typography>
              <Typography variant="body2">Language Module Results</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </ContentWrapper>
  );
};
