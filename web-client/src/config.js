/**
 * Application wide configuration.
 */
const config = {
  basename: process.env.REACT_APP_BASE_NAME,
  baseURI: process.env.REACT_APP_API_BASE_URI,
  verificationApi: process.env.REACT_APP_VERIFICATION_API_URI,
  loginWithMicrosoftURL: process.env.REACT_APP_MICROSOFT_LOGIN_URI,
  redirectURI: process.env.REACT_APP_REDIRECT_URI,
};

export default config;
