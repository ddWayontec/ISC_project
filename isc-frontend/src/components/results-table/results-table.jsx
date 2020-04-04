import {
  Button,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import noop from "lodash/noop";
import React from "react";

const useStyles = makeStyles(({ spacing }) => ({
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    float: "right"
  }
}));

export const ResultsTable = ({
  enableEditing,
  disabled,
  setDisabled,
  handleSave
}) => {
  const classes = useStyles();

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Benchmark</TableCell>
            <TableCell>Result Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Listening</TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speaking</TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reading</TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Writing</TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
            <TableCell>
              <TextField defaultValue="X" size="small" disabled={disabled} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {enableEditing ? (
        <div className={classes.buttonWrapper}>
          {disabled ? (
            <Button variant="contained" onClick={() => setDisabled(false)}>
              Edit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      ) : (
        noop
      )}
    </>
  );
};
