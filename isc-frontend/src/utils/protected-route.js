import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { usePermissions } from "../hooks";
import { AuthContext } from "../contexts/auth";
import { NO_PERMISSIONS } from "./constants";
import { ForbiddenAccessCity } from "../components";
import { ForbiddenAccessGandalf } from "../components/forbidden-access";

const ProtectedRoute = ({ permission = NO_PERMISSIONS, ...props }) => {
  const { authenticated, user } = useContext(AuthContext);

  const allowed = usePermissions(user.role, permission);

  // show a random 403 error page if they try and access a route they aren't supposed to
  const forbiddenPage =
    Math.floor(Math.random() * 2) === 1 ? (
      <ForbiddenAccessCity />
    ) : (
      <ForbiddenAccessGandalf />
    );

  return authenticated && allowed ? <Route {...props} /> : forbiddenPage;
};

export default ProtectedRoute;
