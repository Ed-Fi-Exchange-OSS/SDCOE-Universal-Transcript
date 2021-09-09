/**
 * Generate and verify hash of files using SHA256
 */
const crypto = require('crypto');
const fileSystem = require('fs');

const { readMetaData } = require('../read-metadata');
const { writeMetaData } = require('../write-metadata');

/**
 * Replace the ModifiedDate metadata with the CreationDate value
 * @param {String} filename
 * @returns {string} New Modified Date
 */
const replaceModifiedDate = async (filename) => {
  try {
    // Read "Creation Date" of the file
    const creationDate = await readMetaData(filename, 'CreationDate');
    // Replace the value of "Modified Date" with the "Creation Date"
    await writeMetaData(filename, 'ModDate', creationDate);

    // Return modified "Modified Date"
    return await readMetaData(filename, 'ModDate');
  } catch (error) {
    throw error;
  }
};

/**
 * Reset the proof metadata of the file
 * @param {String} filename
 */
const resetProofMetadata = async (filename) => {
  // Replace the value of proof-metadata with empty value
  await writeMetaData(filename, 'proof-metadata', '');

  await replaceModifiedDate(filename);
};

/**
 * Calculate SHA256 hash of the file
 * @param {String} filename
 * @returns {String} SHA256 hash of the file
 */
const calculateHash = (filename) => {
  const hash = crypto.createHash('sha256');

  try {
    const file_buffer = fileSystem.readFileSync(filename, { flag: 'r' });
    hash.update(file_buffer);

    return hash.digest('hex');
  } catch (error) {
    throw error;
  }
};

/**
 * Generate hash of a file
 * @param {String} filename File of which hash needs to be generated
 * @returns {String} hash of the file
 */
const generateFileHash = async (filename) => {
  try {
    await resetProofMetadata(filename);

    const calculatedHash = await calculateHash(filename);

    return calculatedHash;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify hash of a file
 * @param {String} filename File to be verified
 * @param {String} pdfHash claimed hash of the file
 * @returns {Boolean} whether the file hash is verified or not
 */
const verifyFileHash = async (filename, pdfHash) => {
  try {
    const proofMetadata = await readMetaData(filename, 'proof-metadata');
    await resetProofMetadata(filename);

    const calculatedHash = await calculateHash(filename);

    // Replace the original proof metadata
    await writeMetaData(filename, 'proof-metadata', proofMetadata);

    return calculatedHash === pdfHash;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateFileHash,
  verifyFileHash,
};
