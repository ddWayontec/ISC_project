import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/auth";

export const Logout = () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => logout(), []);

  return <div>Logged Out</div>;
};
