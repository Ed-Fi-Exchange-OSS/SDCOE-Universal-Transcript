const NodeRSA = require('node-rsa');
const fileOp = require('../utils/fileOperations');
const BIT_LENGTH = 2048;  // 2048 bits RSA provides security upto few years

let securedFolder;
const initialize = (path) => {
  securedFolder = path;
}

/**
 * Encrypt a message using RSA private key
 * @param {string} message message to be encrypted
 * @param {string} privateKey RSA private key to be used to encrypt the message
 * @returns {string} encrypted message
 */
const encrypt = (message, privateKey) => {
  const rsaPublicKey = new NodeRSA(privateKey);
  const encryptedString = rsaPublicKey.encryptPrivate(message, 'base64');

  return encryptedString;
};

/**
 * Decrypt a message using RSA private key
 * @param {string} code encrypted code to be decrypted
 * @param {string} privateKey RSA public key to be used to decrypt the message
 * @returns {string} decrypted message
 */
const decrypt = (code, publicKey) => {
  const rsaPublicKey = new NodeRSA(publicKey);
  const decryptedString = rsaPublicKey.decryptPublic(code, 'utf-8');

  return decryptedString;
};

/**
 * Generate a new RSA public-private key key pair.
 * @param bitLength
 * @returns {{private: *, public: *}} RSA public and private keys: {public, private}
 */
const generateRsaKeyPair = (bitLength=BIT_LENGTH) => {
  const key = new NodeRSA({ b: bitLength });

  return {
    public: key.exportKey('public'),
    private: key.exportKey('private'),
  };
};


/**
 * Create a new RSA public-private key key pair and stores in file.
 * @param {string} label a unique file identifier in naming file 
 * @returns {string} message 
 */
const createRsaKeyPair = (label) => {
  const keys = generateRsaKeyPair();

  // Writing RSA private and public key in secured folder
  const privateKey = fileOp.writeFile(`${securedFolder}/${Date.now()}_${label}_private-key.pem`, keys.private);
  const publicKey = fileOp.writeFile(`${securedFolder}/${Date.now()}_${label}_public-key.pem`, keys.public);
 
  if(!privateKey && !publicKey) {
    return false;
  }

  return true;
}

/**
 * Traverse all the files in directory and list all the files
 * @returns {Array} list of all labels 
 */
const listAllLabels = () => {
  const files = fileOp.listAllfiles(securedFolder);

  const labels = files.map(file => {
    return fileOp.getLabel(file);
  });

  return labels;
}

/**
 * Return the key pair(private and public RSA key) of the particular file
 * @param {string} label a unique file identifier 
 * @returns {object} RSA public and private keys: {public, private}
 */
const getRsaKeyPair = (label) => {
  let keys; 
  const files = fileOp.listAllfiles(securedFolder);

  files.forEach(file => {
    if(fileOp.getLabel(file) === label) {
      keys = fileOp.readFile(`${securedFolder}/${file}`);
    }
  });

  keys = JSON.parse(keys);

  return {
    public: keys.public,
    private: keys.private
  }
}

module.exports = {
  encrypt,
  decrypt,
  initialize,
  getRsaKeyPair,
  listAllLabels,
  createRsaKeyPair,
  generateRsaKeyPair,
};

