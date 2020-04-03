import React from "react";
import { Route, Switch } from "react-router-dom";

import { ImmigrantForm } from "../../../components/immigrant-form";
import { ListAllImmigrants } from "./list-all-immigrants";

export const Immigrants = ({ history }) => {
  return (
    <Switch>
      <Route exact path="/isc/immigrants" component={ListAllImmigrants} />
      <Route exact path="/isc/immigrants/:id/profile">
        <ImmigrantForm
          history={history}
          headerTitle="Edit Immigrant"
          formTitle="Information"
        />
      </Route>
    </Switch>
  );
};
