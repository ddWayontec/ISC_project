import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth";
import { usePrevious } from "./use-previous";

export const useSession = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const route = useLocation().pathname;
  const lastRoute = usePrevious(route);

  const { handleAuthentication } = useContext(AuthContext);

  useEffect(() => {
    if (route !== lastRoute) {
      if (isNil(user) || isEmpty(user)) {
        // send to login
        return;
      }

      handleAuthentication();
    }
  });
};
