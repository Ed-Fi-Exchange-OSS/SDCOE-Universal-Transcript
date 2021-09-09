import jwtDecode from 'jwt-decode';

/**
 * This function takes a jwd token and returns whether its expired or not
 * @param {String} token
 * @returns {boolean}
 */
export function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < now) {
    return true;
  }

  return false;
}
