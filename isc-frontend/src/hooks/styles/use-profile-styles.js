import { makeStyles } from "@material-ui/core";

export const useProfileStyles = makeStyles(({ spacing }) => ({
  section: {
    marginTop: spacing(5)
  },
  actionArea: {
    // marginTop: spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  buttonWrapper: {
    marginTop: spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    float: "right"
  },
  button: {
    marginBottom: spacing(1)
  },
  cancelButton: {
    marginBottom: spacing(1),
    marginRight: spacing(0.5)
  }
}));
