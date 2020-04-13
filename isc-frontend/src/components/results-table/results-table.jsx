import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(({ spacing }) => ({
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    float: "right"
  }
}));

const scoreOptions = [
  "Pre-B",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "NA",
  "IE"
];

const ScoreDropdown = ({ id, name, value, disabled, setValue }) => {
  const [val, setVal] = useState(value);
  setValue(name, val);

  useEffect(() => setVal(value), [value]);
  return (
    <Select
      value={val}
      id={id}
      disabled={disabled}
      onChange={e => {
        setVal(e.target.value);
      }}
    >
      {scoreOptions.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export const ResultsTable = ({
  disabled,
  register,
  setValue,
  defaultValues
}) => {
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
            <TableCell name="cell1">
              <ScoreDropdown
                id="listeningBenchmark"
                name="listeningBenchmark"
                value={defaultValues.listeningBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
            <TableCell>
              <ScoreDropdown
                id="listeningResult"
                name="listeningResult"
                value={defaultValues.listeningResult}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speaking</TableCell>
            <TableCell>
              <ScoreDropdown
                id="speakingBenchmark"
                name="speakingBenchmark"
                value={defaultValues.speakingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
            <TableCell>
              <ScoreDropdown
                id="speakingResult"
                name="speakingResult"
                value={defaultValues.speakingResult}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reading</TableCell>
            <TableCell>
              <ScoreDropdown
                id="readingBenchmark"
                name="readingBenchmark"
                value={defaultValues.readingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
            <TableCell>
              <ScoreDropdown
                id="readingResult"
                name="readingResult"
                value={defaultValues.readingResult}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Writing</TableCell>
            <TableCell>
              <ScoreDropdown
                id="writingBenchmark"
                name="writingBenchmark"
                value={defaultValues.writingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
            <TableCell>
              <ScoreDropdown
                id="writingResult"
                name="writingResult"
                value={defaultValues.writingResult}
                disabled={disabled}
                register={register}
                setValue={setValue}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
