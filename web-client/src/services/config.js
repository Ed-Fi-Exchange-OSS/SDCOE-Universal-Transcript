import http from 'utils/http';
import { endpoints } from 'constants/api';

/**
 * get all the configurations for auth
 * @return {Object}
 */
export const getAuthConfig = async () => {
  const url = endpoints.config;
  const res = await http.get(url);

  return res;
};
