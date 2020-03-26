import React, { SFC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import NewIncident from './pages/NewIncident';
import Profile from './pages/Profile';
import Register from './pages/Register';

const Routes: SFC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Logon} exact path="/" />
        <Route component={NewIncident} path="/incident/new" />
        <Route component={Profile} path="/profile" />
        <Route component={Register} path="/register" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
