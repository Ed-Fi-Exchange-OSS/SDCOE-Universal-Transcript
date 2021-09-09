import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

import { getKey, getAccessToken } from 'utils/getKey';

import { endpoints } from 'constants/api';
import { ALLOWED_ROUTES, PUBLIC } from 'constants/routes';

import { Header, Nav } from 'components/common/layout';
import { NotFoundPage } from 'components/common';

const Home = ({ isLocalAuthEnabled, isMicrosoftAuthEnabled }) => {
  const [userRole, setUserRole] = useState(PUBLIC);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!!token) {
      const decodedToken = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < now) {
        setIsExpired(true);
      }
    }

    if (isExpired) {
      // Only clear the localstorage
      localStorage.clear();
      window.location.href = '/';
    }
  }, [isExpired]);

  useEffect(() => {
    if (!!getAccessToken()) {
      const role = getKey('role', getAccessToken());
      setUserRole(role);
    }
  }, [userRole]);

  const routes = ALLOWED_ROUTES[userRole];
  const validRoutes = ['/'];
  for (const val of routes) {
    validRoutes.push(val.to);
  }

  const logOut = () => {
    const token = getAccessToken();
    const { type } = jwtDecode(token);
    const isLocalLogin = type === 'BASIC' ? true : false;
    localStorage.clear();
    if (isLocalLogin) {
      window.location.href = '/';
    } else {
      const url = endpoints.logout;
      window.open(url, '_top');
    }
  };

  return (
    <>
      <Header logOut={logOut} isLocalAuthEnabled={isLocalAuthEnabled} isMicrosoftAuthEnabled={isMicrosoftAuthEnabled} />
      {validRoutes.includes(window.location.pathname) && <Nav />}
      <Switch>
        <Route exact path="/" component={routes[0].component} />
        {routes.map((route, index) => {
          return <Route exact path={route.to} component={route.component} key={index} />;
        })}
        <Route component={() => <NotFoundPage />} />
      </Switch>
    </>
  );
};

export default Home;
