import React, { useState } from "react";

import { AuthProvider } from "../../contexts";
import { ROLES } from "../../utils/constants";

export const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: ROLES.VISITOR });
  const [accessToken, setAccessToken] = useState("");

  const initiateLogin = () => {};

  const logout = () => {
    const user = { role: ROLES.VISITOR };
    setAuthenticated(false);
    setUser(user);
    setAccessToken("");

    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const handleAuthentication = () => {
    console.log(`Handle Authentication`);
    setSession({
      id: "testId",
      email: "testEmail",
      role: ROLES.IMMIGRANT
    });
  };

  const setSession = data => {
    const user = {
      id: data.id,
      email: data.email,
      role: data.role
    };

    sessionStorage.setItem("user", JSON.stringify(user));

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
