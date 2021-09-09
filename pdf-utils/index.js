const { readMetaData, readCustomMetaData } = require('./read-metadata');
const { writeMetaData } = require('./write-metadata');
const { stringToBase64, base64ToString } = require('./base64-utils');
const { verifyPdf } = require('./verify-pdf');
const { securePdf, SecurePdfBuilder } = require('./secure-pdf');

module.exports = {
  stringToBase64,
  base64ToString,
  writeMetaData,
  readMetaData,
  securePdf,
  verifyPdf,
  readCustomMetaData,
  SecurePdfBuilder
};

