import http from 'utils/http';
import { endpoints } from 'constants/api';

/**
 * @param {string} accessToken => value of accessToken
 * @param  {string} accessToken => id of the field
 * @return {Object} =>  response
 */

export const getJWTtoken = async (accessToken, idToken) => {
  const url = endpoints.auth;

  const res = await http.get(url, {
    headers: {
      'access-token': accessToken,
      'id-token': idToken,
    },
  });
  return res;
};

/**
 * @param {string} email => email_address
 * @param  {string} password => password
 * @return {Object} =>  response
 */

export const basicAuth = async (email, password) => {
  const url = endpoints.basicAuth;

  return await http.post(url, { body: { email_address: email, password: password } });
};

/**
 * @param {string} token => accessToken
 * @param  {string} id => id of the user
 * @return {Object} =>  response
 */

export const changeUserPassword = async (token, currentPassword, newPassword, confirmPassword) => {
  const url = endpoints.changePassword;
  const res = await http.post(url, {
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: { current_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword },
  });

  return res;
};

/**
 * @param {string} email => email_address
 * @return {Object} =>  response
 */

export const forgotPassword = async email => {
  const url = endpoints.forgotPassword;

  return await http.post(url, { body: { email_address: email } });
};

/**
 * @param {string} token => jwttoken
 * @param  {string} newPassword => requested new password
 * @param {string} confirmPassword => confirm password
 * @return {Object} =>  response
 */

export const resetUserPassword = async (token, newPassword, confirmPassword) => {
  const url = endpoints.resetPassword;
  const res = await http.post(url, {
    body: { token, new_password: newPassword, confirm_password: confirmPassword },
  });

  return res;
};
