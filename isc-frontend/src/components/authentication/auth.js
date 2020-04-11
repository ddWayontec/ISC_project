import get from "lodash/get";
import React, { useState } from "react";

import { AuthProvider } from "../../contexts";
import { LOGIN_DATA, ROLE_LOOKUP, ROLES } from "../../utils/constants";
import { getUserIdByEmail } from "../../utils/get-user-info-by-emai";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: ROLES.VISITOR });
  const [accessToken, setAccessToken] = useState("");

  const setSession = ({ accessToken, id, email, role, permissions }) => {
    const user = {
      id,
      email,
      role,
      permissions
    };

    sessionStorage.setItem("user", JSON.stringify(user));

    setAuthenticated(true);
    setAccessToken(accessToken);
    setUser(user);

    return { authenticated: true, user };
  };

  const handleAuthentication = ({
    accessToken = "",
    id,
    email,
    role,
    permissions
  }) => {
    return setSession({
      accessToken,
      id,
      email,
      role,
      permissions
    });
  };

  const initiateLogin = async (email, password) => {
    const response = await request("/kc/api/ledgerChainCode/performLogin", {
      method: "post",
      data: {
        ...LOGIN_DATA,
        sm_uid: email,
        sm_pwd: password
      }
    });

    console.log(`Response status: ${JSON.stringify(response)}`);

    //make a request to block chain
    const data = response;

    if (statusIsTrue(data)) {
      const userType = get(response, "Extra.actor");
      const role = get(ROLE_LOOKUP, userType, ROLES.VISITOR);
      const email = get(response, "Extra.identifier.ID");

      const id = await getUserIdByEmail(email, role);

      return handleAuthentication({
        id,
        email,
        role,
        permissions: get(response, "Extra.permissionTable")
      });
    }
    return {};
  };

  const logout = () => {
    const user = { role: ROLES.VISITOR };
    setAuthenticated(false);
    setUser(user);
    setAccessToken("");

    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const authProviderValue = {
    authenticated,
    user,
    accessToken,
    initiateLogin,
    logout,
    handleAuthentication,
    setSession
  };
  return <AuthProvider value={authProviderValue}>{children}</AuthProvider>;
};
