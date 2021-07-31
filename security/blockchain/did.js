/**
 * @module DID
 * SDCOE blockchain DID module
 */
const EthrDID = require('ethr-did');
const Web3 = require('web3');
const registerResolver = require('ethr-did-resolver').default;
const { stringToBytes32 } = require('ethr-did-resolver');
const resolve = require('did-resolver').default;

const attributeToHex = require('../utils/attributeToHex');

/**
 * Resolve "web3.currentProvider.sendAsync is undefined" issue.
 * Issue reference: https://github.com/ethereum/web3.js/issues/1119
 */
Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send;

/**
 * Class for setting up web3 context, creating new DID for ethereum address,
 * signing and verifying data using the DID.
 *
 * @param {string} url URL of the ethereum node
 * @param {string} registryAddress address of the deployed ethr-did-registry
 * @constructor
 */
class DIDFactory {
  constructor(url, registryAddress) {
    this.provider = new Web3.providers.HttpProvider(url);

    this.registry = registryAddress;

    // Register ethr did to the resolver
    registerResolver({
      provider: this.provider,
      registry: this.registry,
    });
  }

  /**
   * Creates a new DID using ethereum address
   *
   * @param {string} ethereumAddress Ethereum account public key(address)
   * @param {string} privateKey Ethereum account private key
   * @returns {object} created DID object: {did, address}
   */
  createDID(ethereumAddress, privateKey) {
    const ethrDID = new EthrDID({
      provider: this.provider,
      address: ethereumAddress,
      privateKey: privateKey,
      registry: this.registry,
    });

    this.ethrDID = ethrDID;

    return {
      did: ethrDID.did,
      address: ethrDID.address,
    };
  }

  /**
   * Generate a new public-private keypair
   *
   * @returns {object} public private keypair object: {address, privateKey}
   */
  generateKeypair() {
    const keypair = EthrDID.createKeyPair();
    // Todo: Store keypair somewhere

    return keypair;
  }

  /**
   * Sign data using the DID
   *
   * @param {any} jsonData json Data
   * @returns {string} signed jwt
   */
  signJWT(jsonData) {
    const jwt = this.ethrDID.signJWT(jsonData);
    return jwt;
  }

  /**
   * Verify jwt using the DID
   *
   * @param {string} jwt signed jwt
   * @returns {object} verified payload: {payload, issuer}
   */
  verifyJWT(jwt) {
    const result = this.ethrDID.verifyJWT(jwt);
    return result;
  }

  /**
   * Sets a new attribute to the DID
   *
   * @param {string} key attribute key
   * @param {string} value attribute value
   * @param {number} expiresIn expiry interval in seconds
   * @returns {string} transaction address
   */
  setAttribute(key, value, expiresIn = 86400) {
    const transaction = this.ethrDID.setAttribute(key, value, expiresIn);

    return transaction;
  }

  /**
   * Revokes an attribute from the DID
   * @param {string} key attribute key
   * @param {string} value attribute value to be revoked
   * @returns {string} transaction address
   */
  async revokeAttribute(key, value) {
    const owner = await this.ethrDID.lookupOwner();
    return this.ethrDID.registry.revokeAttribute(
      this.ethrDID.address,
      stringToBytes32(key),
      attributeToHex(key, value),
      {
        from: owner,
      }
    );
  }

  /**
   * Resolves did using registered provider and registry
   *
   * @param {string} did ethr did
   * @returns {object} did document
   */
  resolveDID(did) {
    if (did.length > 0) {
      return resolve(did.toLowerCase());
    }
  }
}

module.exports = DIDFactory;
