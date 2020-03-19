import { SET_AUTHENTICATED } from "./types";

export const setAuthenticated = authenticationResults => {
  if (!authenticationResults)
    return {
      type: SET_AUTHENTICATED,
      payload: { authenticationResults: {} }
    };

  const { user } = authenticationResults;

  return {
    type: SET_AUTHENTICATED,
    payload: {
      user
    }
  };
};
