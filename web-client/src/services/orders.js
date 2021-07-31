import http from 'utils/http';
import { endpoints } from 'constants/api';

import { getAccessToken, getKey } from 'utils/getKey';

/**
 * request a transcript by student
 * @param  {object} data => form data
 * @returns {promise} => transcript order response
 */

export const requestTranscript = async data => {
  const url = endpoints.orders;

  return await http.post(url, { body: data });
};

/**
 * get all the requested transcript list
 * @return {string} response message
 */
export const getRequestedOrders = async () => {
  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  const url = endpoints.orders;
  let data;
  if (role) {
    data = await http.get(url, { headers });

    return data.messages;
  }

  data = await http.get(url);

  return data.messages;
};
/**
 * @param  {status} status => value of the status field
 * @param  {id} id  => id of the field
 * @return {string} =>  response message
 */
export const approveStatus = async (status, id) => {
  const url = `${endpoints.orders}/${id}`;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let data = {
    status: `${status}`,
  };
  if (role) {
    const res = await http.put(url, { body: data, headers });

    return res.messages;
  }
  const res = await http.put(url, { body: data });

  return res.messages;
};

/**
 * @param {status} status => value of the status field
 * @param  {id} id => id of the field
 * @return {string} => Request deny response
 */
export const denyRequest = async (status, id) => {
  const url = `${endpoints.orders}/${id}`;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let data = {
    status: `${status}`,
  };

  if (role) {
    const res = await http.put(url, { body: data, headers });

    return res.messages;
  }

  const res = await http.put(url, { body: data });

  return res.messages;
};

/**
 * @param {status} status => value of the status field
 * @param  {id} id => id of the field
 * @return {string} => Request deny response
 */
export const resendTranscript = async (status, id) => {
  const url = `${endpoints.orders}/${id}`;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let data = {
    status: `${status}`,
  };

  if (role) {
    const res = await http.put(url, { body: data, headers });

    return res.messages;
  }

  const res = await http.put(url, { body: data });

  return res.messages;
};

/**
 * @param {status} status => value of the status field
 * @param  {id} id => id of the field
 * @return {string} => status update response
 */

export const updateStatus = async (status, id) => {
  const url = `${endpoints.orders}/${id}`;

  const accessToken = getAccessToken();
  const role = getKey('role', accessToken);
  const headers = { authorization: 'Bearer ' + accessToken };

  let data = {
    status: `${status}`,
  };

  if (role) {
    const res = await http.put(url, { body: data, headers });

    return res.messages;
  }

  const res = await http.put(url, { body: data });

  return res.messages;
}

