import jwtDecode from 'jwt-decode';

import { ACCESS_TOKEN } from 'constants/storage';

export const getKey = (key, token) => {
  if (!token) {
    return null;
  }

  const { email, role, cdsCode, name } = jwtDecode(token);
  switch (key) {
    case 'email':
      return email;

    case 'cdsCode':
      return cdsCode;

    case 'role':
      return role;

    case 'name':
      return name;

    default:
      return null;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};
