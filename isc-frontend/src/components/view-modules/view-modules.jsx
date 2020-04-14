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
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useBasicImmigrantInfoWithState } from "../../hooks/use-basic-immigrant-info-with-state";
import { ContentWrapper } from "../content-wrapper";
import { Header } from "../header";
import { LoadingIcon } from "../loading-icon";

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
  },
  loading: { marginTop: "25%" }
}));

export const ViewModules = ({ history }) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  const { pathname, state } = useLocation();

  const { email } = useParams();

  // state is undefined when navigating to route directly
  const userData = useBasicImmigrantInfoWithState({ state, email, setLoading });

  return (
    <ContentWrapper>
      <Header title="View Modules" />
      {isLoading ? (
        <div className={classes.loading}>
          <LoadingIcon />
        </div>
      ) : (
        <Paper className={classes.paper} elevation={2}>
          <ViewModule className={classes.icon} />
          <Typography variant="h6" gutterBottom className={classes.section}>
            {`${userData.firstName} ${userData.lastName}'s Modules`}
          </Typography>
          <Card className={classes.card}>
            <CardActionArea
              onClick={() =>
                history.push(`${pathname}/english`, {
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  prNo: userData.prNo
                })
              }
            >
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
      )}
    </ContentWrapper>
  );
};
