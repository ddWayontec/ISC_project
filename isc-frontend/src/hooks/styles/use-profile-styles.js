import { makeStyles } from "@material-ui/core";

export const useProfileStyles = makeStyles(({ spacing }) => ({
  section: {
    marginTop: spacing(5)
  },
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  button: {
    marginBottom: spacing(1)
  }
}));
