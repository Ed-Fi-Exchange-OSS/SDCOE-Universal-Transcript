import http from 'utils/http';
import { endpoints } from 'constants/api';

/**
 * @param  {id} id  => id of the field
 * @return {string} =>  response object
 */

export const downloadTranscript = async (id, type) => {
  const url = `${endpoints.download}?requestId=${id}&type=${type}`;
  const res = await http.get(url, {
    responseType: 'blob',
  });

  return res;
};
