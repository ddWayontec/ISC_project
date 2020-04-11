import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  EnglishLanguageResults,
  ImmigrantForm,
  ViewModules
} from "../../../components";
import { ListAllImmigrants } from "./list-all-immigrants";

export const Immigrants = ({ history }) => {
  return (
    <Switch>
      <Route exact path="/isc/immigrants" component={ListAllImmigrants} />
      <Route exact path="/isc/immigrants/:email/profile">
        <ImmigrantForm
          history={history}
          headerTitle="Edit Immigrant"
          formTitle="Information"
          disabled={true}
        />
      </Route>
      <Route exact path="/isc/immigrants/:id/modules">
        <ViewModules history={history} />
      </Route>
      <Route exact path="/isc/immigrants/:id/modules/english">
        <EnglishLanguageResults enableEditing={true} />
      </Route>
    </Switch>
  );
};
