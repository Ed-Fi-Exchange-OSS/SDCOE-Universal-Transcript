import axios from 'axios';

import { endpoints } from '../constants/api';

/**
 * @param {BinaryType} file
 * @returns {Promise<Object}
 *
 * The function takes in a file and sends request to verification API
 */

async function verifyPdf(file) {
  const formData = new FormData();
  formData.append('transcript-pdf', file);

  const transcriptValidity = await axios.post(endpoints.verify, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return transcriptValidity.data;
}

export default verifyPdf;
