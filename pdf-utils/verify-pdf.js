const { verify } = require('sdcoe-blockchain/jwt/verify');

const { readMetaData } = require('./read-metadata');
const { verifyFileHash } = require('./utilities/hashing');

/**
 * @param {String} pdfPath
 * @param {String} ethereumNodeURL
 * @param {String} didRegistryAddress
 * @param {String} didKey
 * @returns {Promise<object>}
 */

async function verifyPdf(pdfPath, ethereumNodeURL, didRegistryAddress, didKey) {
  const proofMetaData = await readMetaData(pdfPath, 'proof-metadata');

  if (!proofMetaData) return false;

  const { isValid, header, payload } = await verify(proofMetaData, ethereumNodeURL, didRegistryAddress, didKey);

  let isHashValid = false;
  if (isValid) {
    const parsedPayloadJson = JSON.parse(payload);
    isHashValid = await verifyFileHash(pdfPath, parsedPayloadJson.pdf_hash);
  }

  return isHashValid;
}

module.exports = { verifyPdf };
