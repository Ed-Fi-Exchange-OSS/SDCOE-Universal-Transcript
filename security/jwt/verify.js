const signature = require('./sign');
const DIDFactory = require('../blockchain/did');

const base64 = require('../utils/base64');
const { readFile } = require('../utils/fileOperations');

/**
 * Decode the public key from the DID
 * @param {string} ethereumNodeURL Ethereum Node URL
 * @param {string} didRegistryAddress DID Registry Address
 * @param {string} did DID
 * @returns {string} decoded public key
 */
const getPublicKeyDID = async (ethereumNodeURL, didRegistryAddress, did) => {
  const didFactory = new DIDFactory(ethereumNodeURL, didRegistryAddress);

  // Read DID document
  const ethrDID = did.split('#')[0];
  const resolvedDID = await didFactory.resolveDID(ethrDID);

  // Filter the public key used to sign the document
  const myPublicKey = resolvedDID.publicKey.filter((key) => key.id === did.toLowerCase());
  // Decode the public key in base64 encoded format, remove unnecessary character
  decodedPublicKey = base64.base64Decoder(myPublicKey[0].publicKeyBase64);
  decodedPublicKey = decodedPublicKey.split('\\n').join('');
  
  return decodedPublicKey;
};

/**
 * Decode the public key from the File
 * @param {string} verificationKey Verification Key Id
 * @returns {string} decoded public key
 */
const getPublicKeyFile = (verificationKeyId) => {
  const publicKeyLocation = verificationKeyId.substring(verificationKeyId.lastIndexOf(':') + 1, verificationKeyId.lastIndexOf('#'));
  const path = base64.base64Decoder(publicKeyLocation);

  const publicKey = readFile(path);
  decodedPublicKey = base64.base64Decoder(publicKey);
  decodedPublicKey = decodedPublicKey.split('\\n').join('');

  return decodedPublicKey;
};

/**
 * Validate the a given jwt using public key stored in blockchain
 * @param {string} jwt jwt signature
 * @param {string} publicKey public key
 * @returns {Object} { isValid, header, payload }
 */
const verify = async (jwt, publicKey) => {
  const [headerBase64, payloadBase64] = jwt.split('.');

  // Decode JWT to get header and payload
  const header = base64.base64Decoder(headerBase64);
  const payload = base64.base64Decoder(payloadBase64);
  
  const isValid = signature.verify(jwt, publicKey);

  return { isValid, header, payload };
};

module.exports = {
  verify,
  getPublicKeyDID,
  getPublicKeyFile,
};
