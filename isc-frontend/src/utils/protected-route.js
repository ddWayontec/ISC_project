import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth";
import { usePermissions, useSession } from "../hooks";
import { Login } from "../routes";
import { NO_PERMISSIONS } from "./constants";

const ProtectedRoute = ({ permission = NO_PERMISSIONS, ...props }) => {
  useSession();

  const { authenticated, user } = useContext(AuthContext);

  const allowed = usePermissions(user.role, permission);
  const location = useLocation().pathname;

  return authenticated && allowed ? (
    <Route {...props} />
  ) : (
    <Login redirectPath={location} />
  );
};

export default ProtectedRoute;
