#!/usr/bin/env node

/**
 * PDF Utils CLI
 */
const dotenv = require('dotenv');
const cliProgram = require('commander');

const { securePdf, SecurePdfBuilder } = require('../secure-pdf');
const { verifyPdf } = require('../verify-pdf');
const { readMetaData, readCustomMetaData } = require('../read-metadata');
const { writeMetaData } = require('../write-metadata');
const { generateFileHash, verifyFileHash } = require('../utilities/hashing');

dotenv.config();

const keyId = process.env.KEY_ID;

cliProgram.version('1.0.0').name('pdf-utils').description('SDCOE PDF functionalities');

cliProgram
  .command('secure-pdf [pdfPath] [mrTranscript] [DIDKey] [transcriptId] [privateKey]')
  .description('generate hash and jwt signature of a pdf, appends a proof metadata to the pdf')
  .action(async (pdfPath, mrTranscript, DIDKey, transcriptId, privateKey) => {
    try {
      await writeMetaData(pdfPath, 'mr-transcript', mrTranscript);
      const status = await securePdf(pdfPath, DIDKey, transcriptId, privateKey);
      console.log(status);
    } catch (error) {
      console.error(error);
    }
  });

cliProgram
  .command('verify-pdf-did [pdfPath] [ethNodeURL] [didRegistryAddress] [didKey]')
  .description('verify the pdf proofdata with the given public key stored in blockchain and returns a status')
  .action(async (pdfPath, ethNodeURL, didRegistryAddress, didKey) => {
    try {
      const isValid = await verifyPdf(pdfPath, ethNodeURL, didRegistryAddress, didKey);
      console.log(isValid);
    } catch (error) {
      console.error(error);
    }
  });

cliProgram
  .command('verify-pdf [pdfPath]')
  .description('verify the pdf proofdata with the given public key stored in blockchain and returns a status')
  .action(async (pdfPath) => {
    try {
      const { ETHEREUM_NODE_URL, DID_REGISTRY_ADDRESS, BLOCKCHAIN_KEY_ID } = process.env;
      const supportingArgs = {
        ethereumNodeURL: ETHEREUM_NODE_URL,
        didRegistryAddress: DID_REGISTRY_ADDRESS,
        did: BLOCKCHAIN_KEY_ID,
      };

      const isValid = await new SecurePdfBuilder(pdfPath, 'mode').setSupportingArgs(supportingArgs).verify();
      console.log(isValid);
    } catch (error) {
      console.error(error);
    }
  });

cliProgram
  .command('read-metadata <pdfPath>')
  .option('-k,--key <name>', 'returns the metadata information of the provided key from the pdf')
  .description('Read the metadata with given key from pdf path passed as argument')
  .action(async (pdfPath, args) => {
    try {
      const key = args.key;
      const data = key ? await readMetaData(pdfPath, key) : await readCustomMetaData(pdfPath);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

cliProgram
  .command('write-metadata [pdfPath] [key] [value]')
  .description('Write metadata on PDF with given key and a corresponding value')
  .action(async (pdfPath, key, value) => {
    try {
      const data = await writeMetaData(pdfPath, key, value);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

cliProgram
  .command('generate-hash [pdfPath]')
  .description('Generate SHA256 hash of a pdf file')
  .action(async (pdfPath) => {
    try {
      const hash = await generateFileHash(pdfPath);
      console.log(hash);
    } catch (error) {
      throw error;
    }
  });

cliProgram
  .command('verify-hash [pdfPath] [pdfHash]')
  .description('Verify SHA256 hash of a pdf file')
  .action(async (pdfPath, pdfHash) => {
    try {
      const isCorrect = await verifyFileHash(pdfPath, pdfHash);
      console.log(isCorrect);
    } catch (error) {
      throw error;
    }
  });

cliProgram.parse(process.argv);
