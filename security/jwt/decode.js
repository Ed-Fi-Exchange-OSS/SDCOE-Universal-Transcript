const base64 = require('../utils/base64');

/**
 * Validate the a given jwt using public key stored in blockchain
 * @param {string} jwt jwt signature
 * @returns {Object} { header, payload, signature }
 */
const decode = async (jwt) => {
  const [headerBase64, payloadBase64, signature] = jwt.split('.');

  // Decode JWT to get header and payload
  const header = base64.base64Decoder(headerBase64);
  const payload = base64.base64Decoder(payloadBase64);

  return { header, payload, signature };
};

module.exports = {
  decode,
};
