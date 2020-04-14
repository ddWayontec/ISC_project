import { makeStyles } from "@material-ui/core";
import { Edit, ViewModule } from "@material-ui/icons";
import get from "lodash/get";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

import { ContentWrapper, Header, LoadingIcon } from "../../../components";
import { useTableIcons } from "../../../hooks/styles/use-table-icons";
import { LIST_IMMIGRANTS_DATA, URLS } from "../../../utils/constants";
import { request } from "../../../utils/request";
import { statusIsTrue } from "../../../utils/status-is-true";

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

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      const response = await request(URLS.requestReport, {
        method: "post",
        data: {
          ...LIST_IMMIGRANTS_DATA,
          Payload: {}
        }
      });

      if (statusIsTrue(response)) {
        const cleanedData = response.Extra.map(user => ({
          firstName: get(user, "mapsByNameAndFieldValue.FirstName.value"),
          lastName: get(user, "mapsByNameAndFieldValue.LastName.value"),
          prNo: get(user, "mapsByNameAndFieldValue.PRNo.value"),
          email: get(user, "mapsByNameAndFieldValue.Email.value")
        }));

        setData(cleanedData);
      }

      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const actions = [
    rowData => ({
      icon: () => <Edit />,
      tooltip: `Edit ${rowData.firstName} ${rowData.lastName}'s profile`,
      onClick: () => history.push(`/isc/immigrants/${rowData.email}/profile`)
    }),
    rowData => ({
      icon: () => <ViewModule />,
      tooltip: `View ${rowData.firstName} ${rowData.lastName}'s modules`,
      onClick: () =>
        history.push(`/isc/immigrants/${rowData.email}/modules`, {
          firstName: rowData.firstName,
          lastName: rowData.lastName,
          prNo: rowData.prNo
        })
    })
  ];

  return (
    <ContentWrapper>
      <Header title="List All Immigrants" />
      <div className={classes.paper}>
        <MaterialTable
          isLoading={isLoading}
          icons={tableIcons}
          columns={columns}
          data={data}
          actions={actions}
          options={{ actionsColumnIndex: -1, pageSize: 10 }}
          title="Immigrants"
        />
      </div>
    </ContentWrapper>
  );
};
