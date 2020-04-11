import React from "react";

import { ImmigrantForm } from "../../../components";

export const Profile = ({ history }) => {
  return (
    <ImmigrantForm
      history={history}
      headerTitle="My Profile"
      formTitle="Personal Information"
      disabled={true}
      viewingOwnProfile={true}
    />
  );
};
