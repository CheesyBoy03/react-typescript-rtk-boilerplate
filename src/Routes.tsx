import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import { FilmsPage } from './pages/FilmsPage';

export const Routes = () => {
  // add template components and auth logic here
  // https://reactrouter.com/web/example/auth-workflow

  return (
    <Switch>
      <Route path="/films" component={FilmsPage} />
      <Route path="/" component={MainPage} />
    </Switch>
  );
};
