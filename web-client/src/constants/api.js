// api end points
import config from 'config';

const authConfigs = {
  config: 'config',
  basicAuth: 'basic',
  forgotPassword: '/forget-password',
  resetPassword: '/reset-password',
  microsoft: 'callback/microsoft',
};

export const endpoints = {
  orders: '/orders',
  download: '/transcript',
  districts: '/districts',
  ropCourse: '/rop-courses',
  verify: `${config.verificationApi}/verify/`,
  auth: `/auth/${authConfigs.microsoft}`,
  config: `/config`,
  basicAuth: `/auth/${authConfigs.basicAuth}`,
  changePassword: `/users/change-password`,
  resetPassword: `/auth/${authConfigs.resetPassword}`,
  forgotPassword: `/auth/${authConfigs.forgotPassword}`,
  // Azure AD OAuth 2.0 Token endpoint (Logout)
  logout: `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${config.redirectURI}`,
};
