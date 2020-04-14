import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth";
import { usePermissions, useSession } from "../hooks";
import { Login } from "../routes";
import { NO_PERMISSIONS } from "./constants";

const ProtectedRoute = ({ permission = NO_PERMISSIONS, ...props }) => {
  useSession();

  const { authenticated, user } = useContext(AuthContext);

  const splitUrl = useLocation().pathname.split("/");
  const resourceId = splitUrl[1] === "immigrant" ? splitUrl[3] : undefined;

  const allowed = usePermissions({ user, action: permission, resourceId });
  const location = useLocation().pathname;

  console.log(`Authenticated: ${authenticated} allowed: ${allowed}`);

  return authenticated && allowed ? (
    <Route {...props} />
  ) : (
    <Login redirectPath={location} />
  );
};

export default ProtectedRoute;
