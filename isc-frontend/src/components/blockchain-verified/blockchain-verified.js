import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import React from "react";

const useStyles = makeStyles(({ spacing, palette }) => ({
  icon: {
    height: 40,
    width: 40,
    color: "green"
  },
  verifiedWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  blockchainCard: {
    marginTop: spacing(5),
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
    "& .MuiCardContent-root:last-child": {
      padding: 0
    },
    padding: spacing(2)
  },
  hashText: {
    color: palette.text.secondary
  }
}));

export const BlockchainVerified = ({ hash }) => {
  const classes = useStyles();
  return (
    <Card elevation={6} className={classes.blockchainCard}>
      <CardContent>
        <div className={classes.verifiedWrapper}>
          <CheckCircleOutlineIcon className={classes.icon} />
          <Typography variant="h6">
            <span style={{ color: "green" }}>Verified</span> with blockchain
            hash: <span className={classes.hashText}>{hash}</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
