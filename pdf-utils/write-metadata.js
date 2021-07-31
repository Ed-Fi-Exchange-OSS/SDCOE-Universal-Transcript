const fs = require('fs').promises;
const { PDFDocument, PDFName, PDFHexString } = require('pdf-lib');

/**
 * This function takes the PDF file path and
 * the key and value for custom metadata and writes the data in the PDF itself.
 *
 * @param {String} filePath
 * @param {String} key
 * @param {String} value
 * @returns { Promise }
 */

async function writeMetaData(filePath, key, value) {
  const data = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(data);

  if (pdfDoc) {
    const keyName = PDFName.of(key);
    pdfDoc.getInfoDict()?.set(keyName, PDFHexString.fromText(value));

    const pdfBytes = await pdfDoc?.save();
    if (pdfBytes) {
      await fs.writeFile(filePath, pdfBytes);
      return { message: 'File written successfully', filePath, key };
    }
  }
}

module.exports = { writeMetaData };
