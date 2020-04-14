import React, { useContext, useState } from "react";

import { EmployeeForm } from "../../../components";
import { AuthContext } from "../../../contexts/auth";
import { useProfileStyles } from "../../../hooks/styles/use-profile-styles";

export const Profile = ({ history }) => {
  const { user } = useContext(AuthContext);

  return (
    <EmployeeForm
      history={history}
      headerTitle="My Profile"
      formTitle="Personal Information"
      disabled={true}
      viewingOwnProfile={true}
    />
  );
};
