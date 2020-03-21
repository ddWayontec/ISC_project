import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/actions/auth/auth";
import { usePrevious } from "./use-previous";

import { useLocation } from "react-router-dom";

export const useSession = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const route = useLocation().pathname;
  const lastRoute = usePrevious(route);

  useEffect(() => {
    if (route !== lastRoute) {
      dispatch(setAuthenticated({ user: { ...user } }));
    }
  });
};
