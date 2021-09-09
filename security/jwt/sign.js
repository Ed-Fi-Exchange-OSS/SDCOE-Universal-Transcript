const NodeRSA = require("node-rsa");
const base64url = require("base64url");

const TYPE = "JWT";

/**
 * Generate and return a header for jwt
 * @param {string} algorithm algorithm to be used
 * @param {string} keyId did key id 
 * @returns {object} jwt header
 */
const getHeader = (algorithm, keyId) => {
  return {
    alg: algorithm,
    type: TYPE,
    kid: keyId
  };
};

/**
 * Generate a jwt
 * @param {object} payload payload to be signed
 * @param {string} privateKey RSA private key to be used to encrypt the payload
 * @returns {string} jwt string
 */
const sign = (algorithm, keyId, payload, privateKey) => {
  const header = getHeader(algorithm, keyId);

  const headerString = JSON.stringify(header);
  headerB64 = base64url.encode(headerString);

  let payloadString = JSON.stringify(payload);
  payloadBase64 = base64url.encode(payloadString);

  const rsaKey = new NodeRSA(privateKey);
  const signature = rsaKey.sign(headerB64 + "." + payloadBase64);

  const jwt =
    headerB64 + "." + payloadBase64 + "." + base64url.encode(signature);

  return jwt;
};

/**
 * Generate a given jwt using public key
 * @param {string} jwt jwt signature
 * @param {string} publicKey RSA public key to be used to decrypt the payload
 * @returns {boolean} true or false on basis of jwt signature
 */
const verify = (jwt, publicKey) => {
  const headerBase64 = jwt.split(".")[0];
  const payloadBase64 = jwt.split(".")[1];
  let signature = jwt.split(".")[2];
  signature = base64url.toBuffer(signature);

  const rsa = new NodeRSA(publicKey);
  const isValid = rsa.verify(headerBase64 + "." + payloadBase64, signature);

  return isValid;
};

module.exports = {
  sign,
  verify,
};
