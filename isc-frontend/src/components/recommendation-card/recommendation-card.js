import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    marginTop: spacing(3),
    width: 300
  },
  title: {
    float: "right"
  }
}));

export const RecommendationCard = ({
  school,
  program,
  option,
  register,
  disabled
}) => {
  const classes = useStyles();
  return (
    <Card elevation={4} className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          variant="body2"
          color="textSecondary"
          gutterBottom
        >
          Option {option}
        </Typography>
        <TextField
          fullWidth
          name="schoolRecommendation"
          label="School"
          disabled={disabled}
          defaultValue={school}
          inputRef={register()}
        />
        <TextField
          fullWidth
          name="programRecommendation"
          label="Program"
          disabled={disabled}
          defaultValue={program}
          inputRef={register()}
        />
      </CardContent>
    </Card>
  );
};
