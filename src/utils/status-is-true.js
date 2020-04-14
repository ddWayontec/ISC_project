import get from "lodash/get";

export const statusIsTrue = response =>
  get(response, "status", false) === true ||
  get(response, "Status", false) === true;
