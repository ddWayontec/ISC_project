import React, { useState } from "react";

import { ROLES } from "../../utils/constants";
import { AuthProvider } from "../../contexts";

export const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: ROLES.VISITOR });
  const [accessToken, setAccessToken] = useState("");

  const initiateLogin = () => {};

  const logout = () => {
    setAuthenticated(false);
    setUser({ role: ROLES.VISITOR });
    setAccessToken("");
  };

  const handleAuthentication = () => {};

  const setSession = data => {
    const user = {
      id: data.sub,
      email: data.email,
      role: "immigrant"
    };

    setAuthenticated(true);
    setAccessToken(data.accessToken);
    setUser(user);
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
