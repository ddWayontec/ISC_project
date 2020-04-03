import { makeStyles } from "@material-ui/core";
import { Edit, ViewModule } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

import { ContentWrapper, Header } from "../../../components";
import { useTableIcons } from "../../../hooks/styles/use-table-icons";

// for mocking
const createData = (firstName, lastName, prNo) => {
  return { firstName, lastName, prNo };
};

// for mocking
const rows = [
  createData("Joe", "Smith", "123456"),
  createData("Andrew", "Sheer", "5696869"),
  createData("Stephen", "Harper", "126325123"),
  createData("Justin", "Trudeau", "12312238456"),
  createData("Rachel", "Notley", "19234834"),
  createData("Donald", "Trump", "2asdfas")
];

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: spacing(4),
    padding: spacing(3),
    paddingBottom: spacing(5)
  }
}));

const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Last Name", field: "lastName" },
  { title: "PR No.", field: "prNo" }
];

export const ListAllImmigrants = ({ history }) => {
  const classes = useStyles();
  const tableIcons = useTableIcons();

  const actions = [
    rowData => ({
      icon: () => <Edit />,
      tooltip: `Edit ${rowData.firstName} ${rowData.lastName}'s profile`,
      onClick: () => history.push(`/isc/immigrants/${rowData.prNo}/profile`)
    }),
    rowData => ({
      icon: () => <ViewModule />,
      tooltip: `View ${rowData.firstName} ${rowData.lastName}'s modules`,
      onClick: () => history.push(`/isc/immigrants/${rowData.prNo}/modules`)
    })
  ];

  const [data, setData] = useState([]);

  // mocking
  useEffect(() => {
    // do a fetch in here
    setData(rows);
  }, []);

  return (
    <ContentWrapper>
      <Header title="List All Immigrants" />
      <div className={classes.paper}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data}
          actions={actions}
          options={{ actionsColumnIndex: -1 }}
          title="Immigrants"
        />
      </div>
    </ContentWrapper>
  );
};
