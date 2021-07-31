const { sign } = require('sdcoe-blockchain/jwt/sign');
const { decode } = require('sdcoe-blockchain/jwt/decode');
const { verify, getPublicKeyDID } = require('sdcoe-blockchain/jwt/verify');

const { PDF_EXPIRY_DAYS, JWT_ALGORITHM } = require('./constants/pdfconstants');

const { generateFileHash, verifyFileHash } = require('./utilities/hashing');
const { writeMetaData } = require('./write-metadata');
const { readMetaData } = require('./read-metadata');
const { base64Decoder } = require('sdcoe-blockchain/utils/base64');
const { readFile } = require('sdcoe-blockchain/utils/fileOperations');

function preparePayload(issuer, jwtIdentifier, pdfHash) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiryDate = currentTimestamp + PDF_EXPIRY_DAYS * 86400;

  return {
    jti: jwtIdentifier, // jwt unique identifier
    iss: issuer, // issuer
    nbf: currentTimestamp, // not valid before
    iat: currentTimestamp, // issued at
    exp: expiryDate, // jwt expiry date
    pdf_hash: pdfHash // pdf hash
  };
}

/**
 *
 * @param pdfPath
 * @param DIDKey
 * @param transcriptRequestId
 * @param privateKey
 * @returns {Promise<*>}
 */
async function securePdf(pdfPath, DIDKey, transcriptRequestId, privateKey) {
  // Generate SHA256 hash of the pdf
  const pdfHash = await generateFileHash(pdfPath);

  if (pdfHash) {
    // Prepare jwt payload
    const issuer = DIDKey.split('#')[0];
    const payload = preparePayload(issuer, transcriptRequestId, pdfHash);

    // Sign the payload
    const signature = sign(JWT_ALGORITHM, DIDKey, payload, privateKey);

    if (signature) {
      // Append jwt signature to the pdf
      await writeMetaData(pdfPath, 'proof-metadata', signature);

      return pdfPath;
    }
  }
}


const getFileContentFromURN = (urn) => {
  const keyLocation = urn.substring(urn.lastIndexOf(':') + 1, urn.lastIndexOf('#'));
  const path = base64Decoder(keyLocation);
  let content = null;
  try {
    content = readFile(path);
  } catch (e) {
    console.error('error: Could not read from urn:', urn);
    content = null;
  }
  return content;
};

class SecurePdfBuilder {
  constructor(pdfPath) {
    this.pdfPath = pdfPath;
    this.PROOF_METADATA_KEY = 'proof-metadata';
  }

  async getVerifyingKey() {
    if (!this.verifyingKey) {
      const verifyingKeyId = await this.getVerifyingKeyId();
      if (!verifyingKeyId)
        return null;

      let publicKey = null;

      // Scheme: File based
      if (verifyingKeyId.startsWith('urn:sdcoe-keypair')) {
        publicKey = getFileContentFromURN(verifyingKeyId);
        publicKey = base64Decoder(publicKey);
        publicKey = publicKey.split('\\n').join('');

      } else if (verifyingKeyId.startsWith('did:ethr')) {
        const { ethereumNodeURL, didRegistryAddress, did } = this.supportingArgs;
        try {
          publicKey = await getPublicKeyDID(ethereumNodeURL, didRegistryAddress, did);
        } catch (e) {
          throw e;
        }
      } else {
        throw Error('Unrecognized verification Key Id');
      }

      this.verifyingKey = publicKey;
    }

    return this.verifyingKey;
  }

  getSigningKey() {
    if (!this.signingKey) {
      if (this.signingKeyId.startsWith('urn:sdcoe-keypair')) {
        this.signingKey = getFileContentFromURN(this.signingKeyId);
      } else {
        throw Error('Unrecognized signing Key Id');
      }
    }

    return this.signingKey;
  }

  async getProofMetadataString() {
    if (!this.proofMetaDataString) {
      this.proofMetaDataString = await readMetaData(this.pdfPath, this.PROOF_METADATA_KEY);
    }

    return this.proofMetaDataString;
  }

  async getProofMetadata() {
    if (!this.proofMetaData) {
      this.proofMetaData = {};

      const metadata = await this.getProofMetadataString();

      if (metadata) {
        // 2. Decode JWT { header, payload, signature }
        const decoded = await decode(metadata);
        const { header, payload, signature } = decoded;

        // 3. PDF hash and verification key
        const parseHeader = JSON.parse(header);
        const parsedPayloadJson = JSON.parse(payload);

        this.proofMetaData = {
          'header': parseHeader,
          'payload': parsedPayloadJson,
          'signature': signature
        };
      }
    }

    return this.proofMetaData;
  }

  async getVerifyingKeyId() {
    if (!this.verifyingKeyId) {
      this.verifyingKeyId = (await this.getProofMetadata())?.header?.kid;
    }

    return this.verifyingKeyId;
  }

  async getVerifyingPdfHash() {
    if (!this.verifyingPdfHash) {
      this.verifyingPdfHash = (await this.getProofMetadata())?.payload?.pdf_hash;
    }

    return this.verifyingPdfHash;
  }

  async getPdfHash() {
    if (!this.pdfHash) {
      this.pdfHash = await generateFileHash(this.pdfPath);
    }

    return this.pdfHash;
  }

  setSupportingArgs(args) {
    this.supportingArgs = args;
    return this;
  }

  setJwtIdentifier(jwtIdentifier) {
    this.jwtIdentifier = jwtIdentifier;
    return this;
  }

  setIssuerId(issuerId) {
    this.issuerId = issuerId;
    return this;
  }

  setSigningKeyId(signingKeyId) {
    this.signingKeyId = signingKeyId;
    return this;
  }

  setVerifyingKeyId(verifyingKeyId) {
    this.verifyingKeyId = verifyingKeyId;
    return this;
  }


  async build() {
    // Generate SHA256 hash of the pdf
    const pdfHash = await this.getPdfHash();
    if (pdfHash) {
      // Prepare jwt payload
      const issuer = this.issuerId;
      const payload = preparePayload(issuer, this.jwtIdentifier, pdfHash);

      const signingKey = await this.getSigningKey();
      const verificationKeyId = await this.getVerifyingKeyId();

      // Sign the payload
      const signature = sign(JWT_ALGORITHM, verificationKeyId, payload, signingKey);

      if (signature) {
        // Append jwt signature to the pdf
        await writeMetaData(this.pdfPath, this.PROOF_METADATA_KEY, signature);

        return this.pdfPath;
      }
    }
  }

  async verify() {
    let status = true;

    const metadata = await this.getProofMetadataString()

    status = status && !(!(metadata));
    console.debug('Was proof-metadata present?', status);

    if (!status) return false;

    // 1. Get Public Key
    const publicKey = await this.getVerifyingKey();
    status = status && !(!publicKey);
    console.debug('Was public key found?', status);

    if (!status) return false;

    // 2. Verify the JWT using public key
    const { isValid } = await verify(metadata, publicKey);
    status = status && isValid;
    console.debug('Was signature valid?', status);


    if (!status) return false;

    // 3. Validate the PDF hash
    const hash = await this.getVerifyingPdfHash();
    status = status && !(!hash);
    console.debug('Was Hash found?', status);

    if (!status) return false;

    const isHashValid = await verifyFileHash(this.pdfPath, hash);
    status = status && isHashValid;
    console.log('Was Hash valid?', status);

    return status;

  }
}

module.exports = { securePdf, SecurePdfBuilder };
