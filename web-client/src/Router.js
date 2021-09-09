import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as routes from 'constants/routes';

import Home from 'components/home/Home';
import { Login } from 'components/common/login';
import { Login as LoginScreen, ForgotPassword, ResetPassword, ChangePassword } from 'components/auth';

/**
 * App Router.
 */
const AppRouter = ({ isLocalAuthEnabled, isMicrosoftAuthEnabled }) => {
  return (
    <Switch>
      <Redirect strict from="//" to="/" />
      <Route path={routes.AUTH} component={Login} />
      <Route
        path={routes.LOGIN}
        render={props => (
          <LoginScreen
            {...props}
            isLocalAuthEnabled={isLocalAuthEnabled}
            isMicrosoftAuthEnabled={isMicrosoftAuthEnabled}
          />
        )}
      />
      <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={routes.RESET_PASSWORD} component={ResetPassword} />
      <Route path={routes.CHANGE_PASSWORD} component={ChangePassword} />
      <Route
        path={routes.HOME}
        render={props => (
          <Home {...props} isLocalAuthEnabled={isLocalAuthEnabled} isMicrosoftAuthEnabled={isMicrosoftAuthEnabled} />
        )}
      />
      <Route component={() => <h2 className="flex align-items-center justify-content-center">Not Found</h2>} />
    </Switch>
  );
};

export default AppRouter;
