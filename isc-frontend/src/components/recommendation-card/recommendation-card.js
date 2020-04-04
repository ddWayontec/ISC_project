import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    marginTop: spacing(3),
    width: 300
  }
}));

export const RecommendationCard = ({
  school,
  program,
  registered,
  enableEditing,
  option
}) => {
  const classes = useStyles();
  return (
    <Card elevation={4} className={classes.root}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Option {option}
        </Typography>
        <Typography variant="h5">{school}</Typography>
        <Typography variant="h6">{program}</Typography>
      </CardContent>
      <CardActions>
        {enableEditing ? (
          <Button size="small">Edit</Button>
        ) : (
          <Button size="small">Register</Button>
        )}
      </CardActions>
    </Card>
  );
};
