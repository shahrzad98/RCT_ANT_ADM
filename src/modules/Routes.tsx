import React from 'react';
import { Switch } from 'react-router-dom';

import { useAppSelector } from '../features/hooks';
import { DefinedRoute } from '../types';
import { createFromDefinedRoutes } from '../utils/helpers';
import { AuthRoutes, LogoutPage } from './authentication';

const Routes = React.memo(() => {
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  let mainRoutes: DefinedRoute[] | undefined ;

  if (isAuthenticated) {
    mainRoutes = [
      { type: 'Route', path: '/auth/logout', children: LogoutPage, exact: true },
      { type: 'Redirect', exact: true, from: '/', path: '/home' },
      { type: 'Redirect', path: '/notfound' },
    ];
  }

  return mainRoutes ? (
      <Switch>{createFromDefinedRoutes(mainRoutes)}</Switch>
  ) : (
    <Switch>{createFromDefinedRoutes(AuthRoutes)}</Switch>
  );
});

export default Routes;
