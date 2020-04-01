import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";

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

export const useSidebarList = userRole => {
  return sidebarItems[userRole] ? sidebarItems[userRole] : [];
};
