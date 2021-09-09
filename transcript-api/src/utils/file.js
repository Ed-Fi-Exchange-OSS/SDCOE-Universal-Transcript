const fs = require('fs');

/**
 * Stolen from https://stackoverflow.com/a/65680904/1643061.
 *
 * @returns {string}
 */
function getRandomFileName() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const random = ('' + Math.random()).substring(2, 8);

  return timestamp + random;
}

/**
 *
 * @param fileName {string}
 * @returns {string}
 */
function getFileContent(fileName)  {
  return fs.readFileSync(fileName, 'utf8')
}

module.exports = {getRandomFileName, getFileContent}
