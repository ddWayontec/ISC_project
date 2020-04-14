import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

export const Logout = () => {
  const { logout } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    // log out and redirecting to homepage soon
    logout();
    setTimeout(() => setRedirect(true), 5000);
  }, []);

  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <div>
      Logged Out. You will be redirected to the login page in 5 seconds.
    </div>
  );
};
