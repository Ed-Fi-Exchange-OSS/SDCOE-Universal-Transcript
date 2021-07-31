import http from 'utils/http';
import { endpoints } from 'constants/api';

import { getAccessToken, getKey } from 'utils/getKey';

//fetch all the disticts name from api
/**
 * @return  {promise} => list of the distircts
 *
 */
export const getDistricts = async () => {
  const url = endpoints.districts;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  if (role) {
    const res = await http.get(url, { headers });
    return res;
  }

  return await http.get(url);
};
