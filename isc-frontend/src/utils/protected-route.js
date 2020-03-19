import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import { usePermissions } from "../hooks";
import { NO_PERMISSIONS, ROLES } from "./constants";
import { ForbiddenAccessCity } from "../components";
import { ForbiddenAccessGandalf } from "../components/forbidden-access";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ permission = NO_PERMISSIONS, ...props }) => {
  const [forbiddenPage, setForbiddenPage] = useState(null);

  const auth = useSelector(state => state.auth);

  // Temp testing
  const authenticated = auth.user.authenticated;
  const user = {
    role: ROLES.IMMIGRANT
  };

  const allowed = usePermissions(user.role, permission);

  useEffect(() => {
    setForbiddenPage(
      // show a random 403 error page if they try and access a route they aren't supposed to
      Math.floor(Math.random() * 2) === 1 ? (
        <ForbiddenAccessCity />
      ) : (
        <ForbiddenAccessGandalf />
      )
    );
  }, []);

  return authenticated && allowed ? <Route {...props} /> : forbiddenPage;
};

export default ProtectedRoute;
