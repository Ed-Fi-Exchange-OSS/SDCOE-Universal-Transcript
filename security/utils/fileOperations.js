const fs = require('fs');

/**
 * List all files in directory
 * @param {string} directory attribute key
 */
const listAllfiles = (directory) => {
  const files = fs.readdirSync(directory);

  return files;
}

/**
 * Extract label from the filename template
 * @param {string} label 
 */
const getLabel = (filename) => {
  return (filename.split('_')[1]).split('.')[0]; //extracting label by removing timestamp and extension
}

/**
 * Read the content of the file
 * @param {string} content 
 */
const readFile = (path) => {
  const content = fs.readFileSync(path, 'utf8');

  return content;
}

/**
 * Write in the file
 * @param {boolean}  
 */
const writeFile = (path, content) => {
  fs.writeFileSync(path, content);
  
  return true;
}

module.exports = {
  listAllfiles,
  getLabel,
  readFile,
  writeFile
}
