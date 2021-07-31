import http from 'utils/http';
import { endpoints } from 'constants/api';

import { getAccessToken, getKey } from 'utils/getKey';

export const getRopCoursesByRequestId = async (requestId) => {
  const url = `${endpoints.ropCourse}/requestId/${requestId}`;
  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let data;

  if (role) {
    try {
      data = await http.get(url, { headers });
      return data.messages;
    } catch (e) {
      console.log('fetching rop courses error', e);
    }
  }

  return data.error;
};


export const requestROPTranscript = async (data) => {
  const url = endpoints.ropCourse;
  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let res;

  if (role) {
    try {
      res = await http.post(url, { body: data, headers });
      return res;
    } catch (e) {
      console.log('fetching rop courses error', e);
    }
  }

  return data.error;
}


export const updateROPTranscript = async (data, id) => {
  const url = `${endpoints.ropCourse}/${id}`;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let res;

  if (role) {
    res = await http.put(url, { body: data, headers });

    return res.messages;
  }

  return res.error;
};
