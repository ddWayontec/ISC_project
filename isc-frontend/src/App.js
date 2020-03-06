import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import { Home, Login } from './routes';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route component={Home} />
      </Switch>
    </>
  );
}

export default App;
