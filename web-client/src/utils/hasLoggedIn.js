import jwtDecode from 'jwt-decode';
/**
 * This function takes input token and returns whether the user has loggedint to the system for the first time or not
 * @param {String}
 * @returns {boolean}
 */
export function hasLoggedInBefore(token) {
  const { hasLoggedIn } = jwtDecode(token);

  return hasLoggedIn ? true : false;
}
