import React, { useState } from "react";

import { AuthProvider } from "../../contexts";

export const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: "immigrant" });
  const [accessToken, setAccessToken] = useState("");

  const initiateLogin = () => {};

  const logout = () => {
    setAuthenticated(false);
    setUser({ role: "immigrant" });
    setAccessToken("");
  };

  const handleAuthentication = () => {};

  const setSession = data => {
    const user = {
      id: data.sub,
      email: data.email,
      role: "visitor"
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
