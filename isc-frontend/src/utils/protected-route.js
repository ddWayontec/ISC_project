import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { usePermissions } from "../hooks";
import { AuthContext } from "../contexts/auth";
import { NO_PERMISSIONS } from "./constants";

const ProtectedRoute = ({ permission = NO_PERMISSIONS, ...props }) => {
  const { authenticated, user } = useContext(AuthContext);

  const allowed = usePermissions(user.role, permission);

  return authenticated && allowed ? <Route {...props} /> : null;
};

export default ProtectedRoute;
