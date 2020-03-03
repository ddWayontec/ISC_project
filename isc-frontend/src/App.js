import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import { AppContainer } from './components/app-container';
import { Login } from './routes/login';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <AppContainer>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </AppContainer>
      </Switch>
    </>
  );
}

export default App;
