import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";

const sidebarItems = {
  isc_employee: [
    {
      text: "List all immigrants",
      icon: <PeopleIcon />,
      route: "/isc/list-all-immigrants",
      key: "listAllImmigrants"
    },
    { text: "Add immigrant", icon: <AddIcon />, route: "/add-immigrant" },
    {
      text: "Add service provider",
      icon: <AddIcon />,
      route: "/isc/add-service-provider",
      key: "addServiceProvider"
    },
    {
      text: "Add ISC employee",
      icon: <AddIcon />,
      route: "/isc/add-isc-employee",
      key: "addIscEmployee"
    }
  ],
  immigrant: [
    {
      text: "My Modules",
      icon: <ViewModuleIcon />,
      route: "/immigrant/view-modules",
      key: "viewModules"
    }
  ]
};

export const useSidebarList = userRole => {
  return sidebarItems[userRole] ? sidebarItems[userRole] : [];
};
