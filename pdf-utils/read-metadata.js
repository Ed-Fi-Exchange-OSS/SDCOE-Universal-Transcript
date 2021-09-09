const fs = require('fs').promises;
const { PDFDocument, PDFName } = require('pdf-lib');

const metaData = require('./constants/customMetaData');

/**
 * This function takes the PDF file path argument
 * and returns PDF object
 *
 * @param { String } filePath
 * @returns { Object }
 */
async function preparePdfDoc(filePath) {
  const existingPdfBytes = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes, {
    updateMetadata: false,
  });

  return pdfDoc;
}

/**
 * This function takes the PDF file path and key as an argument
 * and returns the value of metadata associated with it
 *
 * @param { String } filePath
 * @param { String } key
 * @returns { Promise }
 */

async function readMetaData(filePath, key) {
  const pdfDoc = await preparePdfDoc(filePath);

  if (pdfDoc && Object.values(metaData).includes(key)) {
    const metadataKey = PDFName.of(key);
    return pdfDoc?.getInfoDict()?.lookup(metadataKey)?.decodeText();
  }

  throw new Error('Invalid key passed as an arguement');
}

/**
 * This function takes the PDF file path an argument
 * and returns the object of available metadata 
 *
 * @param { String } filePath
 * @returns { Object }
 */

async function readCustomMetaData(filePath) {
  const data = {};
  const pdfDoc = await preparePdfDoc(filePath);

  for (key in metaData) {
    let metadataKey = PDFName.of(metaData[key]);
    data[metaData[key]] = pdfDoc?.getInfoDict()?.lookup(metadataKey)?.decodeText();
  }

  data[metaData.mrTranscript] = JSON.parse(data[metaData.mrTranscript])

  return JSON.stringify(data);
}

module.exports = { readMetaData, readCustomMetaData };

