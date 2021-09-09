#!/usr/bin/env node
/**
 * did-factory CLI
 */
const cliProgram = require('commander');
const dotenv = require('dotenv');
dotenv.config();

const DIDFactory = require('../blockchain/did');

const ETHR_DID_PREFIX = 'did:ethr:';

const didFactory = new DIDFactory(process.env.ETHEREUM_NODE_URL, process.env.DID_REGISTRY_ADDRESS);

didFactory.createDID(process.env.ETHEREUM_ACCOUNT_ADDRESS, process.env.ETHEREUM_PRIVATE_KEY);

cliProgram.version('1.0.0').name('did-factory').description('SDCOE Blockchain DID CLI');

/**
 * did-factory create-did
 */
cliProgram
  .command('get-did <ethereumAddress>')
  .description('Get an DID from ethereum account address', { ethereumAddress: 'Ethereum Account Address' })
  .action((ethereumAddress) => {
    const ethrDid = `${ETHR_DID_PREFIX}${ethereumAddress}`;

    console.log(ethrDid);
  });

/**
 * did-factory resolve-did
 */
cliProgram
  .command('resolve-did [did]')
  .description('Resolve DID to get DID document', { did: 'DID to be resolved' })
  .action((did) => {
    const ethrDid = did || ETHR_DID_PREFIX + process.env.ETHEREUM_ACCOUNT_ADDRESS;
    didFactory
      .resolveDID(ethrDid)
      .then((didDocument) => console.log(JSON.stringify(didDocument)))
      .catch((error) => {
        console.log(error);
      });
  });

/**
 * did-factory set-attribute
 */
cliProgram
  .command('set-attribute <attributeName> <attributeValue> [expiresIn]')
  .description('Set a new attribute for DID', {
    attributeName: 'did attribute name/key e.g. did/pub/RSA/veriKey/base64',
    attributeValue: 'did attribute value (public key)',
    expiresIn: 'no. of days the did attribute expires in (default: 365)',
  })
  .action((attributeName, attributeValue, expiresIn = 365) => {
    const secondsInADay = 86400;
    expiresIn = Number(expiresIn) * secondsInADay;

    didFactory
      .setAttribute(attributeName, attributeValue, expiresIn)
      .then((transaction) => console.log('Transaction:', transaction))
      .catch((error) => {
        console.log(error);
      });
  });

/**
 * did-factory revoke-attribute
 */
cliProgram
  .command('revoke-attribute <attributeName> <attributeValue>')
  .description('Revoke an attribute from DID', {
    attributeName: 'did attribute name/key e.g. did/pub/RSA/veriKey/base64',
    attributeValue: 'did attribute value (public key)',
  })
  .action((attributename, attributeValue) => {
    didFactory
      .revokeAttribute(attributename, attributeValue)
      .then((transaction) => console.log('Transaction:', transaction))
      .catch((error) => {
        console.log(error);
      });
  });

cliProgram.parse(process.argv);
