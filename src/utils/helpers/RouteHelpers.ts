import { Location } from 'history';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { DefinedRoute } from '../../types';

export const getLinkPath = (language: string, location: Location, path: string, relative?: boolean) => {
  const pathname = location.pathname;
  if (relative) {
    return `/${pathname}/${path}`;
  } else {
    return `/${language}/${path}`;
  }
};

export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname;

export const getCurrentUrl = (location: Location) => location.pathname.split(/[?#]/)[0];

export const checkIsActive = (location: Location, url: string) => {
  const current = getCurrentUrl(location);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  return current.indexOf(url) > -1;
};

export const createFromDefinedRoute = (definedRoute: DefinedRoute, key?: number): React.ReactElement<RouteProps> => {
  switch (definedRoute.type) {
    case 'Route':
      return React.createElement(
        Route,
        { key: key, path: definedRoute.path, exact: definedRoute.exact },
        React.createElement(definedRoute.children!, definedRoute.childrenProps)
      );
    case 'Redirect':
      return React.createElement(Redirect, { key: key, exact: definedRoute.exact, from: definedRoute.from, to: definedRoute.path! });
    case 'Builder':
      return definedRoute.children;
  }
};

export const createFromDefinedRoutes = (definedRoutes: readonly DefinedRoute[]): React.ReactElement<RouteProps>[] => {
  return definedRoutes.map((item, index) => {
    return createFromDefinedRoute(item, index);
  });
};
