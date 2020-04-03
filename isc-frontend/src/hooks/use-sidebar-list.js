import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React, { useState } from "react";

import { ROLES } from "../utils/constants";

const sidebarItems = {
  isc_employee: [
    {
      text: "List all immigrants",
      icon: <PeopleIcon />,
      route: "/isc/immigrants",
      key: "listAllImmigrants"
    },
    { text: "Add immigrant", icon: <AddIcon />, route: "/isc/add-immigrant" },
    {
      text: "Add ISC employee",
      icon: <AddIcon />,
      route: "/isc/add-isc-employee",
      key: "addIscEmployee"
    },
    {
      text: "My Profile",
      icon: <Person />,
      route: "/isc/profile",
      key: "iscProfile"
    }
  ],
  immigrant: [
    {
      text: "My Modules",
      icon: <ViewModuleIcon />,
      route: "/immigrant/view-modules",
      key: "viewModules"
    },
    {
      text: "My Profile",
      icon: <Person />,
      route: "/immigrant/profile",
      key: "immigrantProfile"
    }
  ]
};

export const useSidebarList = (userRole, prNo = null) => {
  const [modified, setModified] = useState(false);

  if (!modified && userRole === ROLES.IMMIGRANT && prNo) {
    sidebarItems.immigrant[0].route = `${sidebarItems.immigrant[0].route}/${prNo}`;
    setModified(true);
  }
  return sidebarItems[userRole] ? sidebarItems[userRole] : [];
};
