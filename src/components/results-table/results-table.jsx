import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const listeningSpeakingOptions = [
  "Pre-B",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "0",
  "10+"
];

const writingReadingOptions = [
  "PFL",
  "FL",
  "L1",
  "L2",
  "L3",
  "L4",
  "Pre-B",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "0",
  "10+"
];

const ScoreDropdown = ({
  id,
  name,
  value,
  disabled,
  setValue,
  scoreOptions
}) => {
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
            <TableCell align="right">Benchmark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Listening</TableCell>
            <TableCell align="right" name="cell1">
              <ScoreDropdown
                id="listeningBenchmark"
                name="listeningBenchmark"
                value={defaultValues.listeningBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
                scoreOptions={listeningSpeakingOptions}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speaking</TableCell>
            <TableCell align="right">
              <ScoreDropdown
                id="speakingBenchmark"
                name="speakingBenchmark"
                value={defaultValues.speakingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
                scoreOptions={listeningSpeakingOptions}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reading</TableCell>
            <TableCell align="right">
              <ScoreDropdown
                id="readingBenchmark"
                name="readingBenchmark"
                value={defaultValues.readingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
                scoreOptions={writingReadingOptions}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Writing</TableCell>
            <TableCell align="right">
              <ScoreDropdown
                id="writingBenchmark"
                name="writingBenchmark"
                value={defaultValues.writingBenchmark}
                disabled={disabled}
                register={register}
                setValue={setValue}
                scoreOptions={writingReadingOptions}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
